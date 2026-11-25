import { flushSync } from "react-dom";

import { prefersReducedMotion } from "@/lib/motion";
import { getTheme, setTheme, type Theme } from "@/lib/theme";

// Keeps the circle past the corners where a phone's browser bars overlap the
// page while the reveal runs.
const OVERSCAN = 64;

let circle: CSSStyleSheet | null = null;
let latest = 0;
let pending: Theme | null = null;
let running: ViewTransition | null = null;

/* The incoming page is live, so colour transitions would still be fading
   inside the circle. Those the switch starts are cancelled, rather than
   turned off in CSS, which would restyle the whole page twice more. A parent's
   cancelled colour can start a child's, hence the few passes. */
function swapTheme(theme: Theme) {
  const before = new Set(document.getAnimations());

  flushSync(() => setTheme(theme));

  for (let pass = 0; pass < 4; pass += 1) {
    const started = document
      .getAnimations()
      .filter((item) => item instanceof CSSTransition && !before.has(item));

    if (!started.length) return;

    started.forEach((item) => item.cancel());
  }
}

/* Hands the circle to theme-toggle.css. Its variables are set on the reveal's
   own layer: on <html> they would be inherited, restyling every element. */
function setCircle(x: number, y: number, radius: number) {
  if (!circle) {
    circle = new CSSStyleSheet();
    document.adoptedStyleSheets.push(circle);
  }

  circle.replaceSync(
    `::view-transition-new(root) { --reveal-x: ${x}px; --reveal-y: ${y}px; --reveal-radius: ${radius}px; }`,
  );
}

/* Browsers send every click to <html> while a view transition runs. Finish the
   reveal and hand the click to the control under the pointer. */
function passClickThrough(event: MouseEvent) {
  if (event.target !== document.documentElement) return;

  running?.skipTransition();
  document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest<HTMLElement>("a, button")
    ?.click();
}

/* Switches theme, revealing the new one in a circle that grows from `origin`
   (animated in theme-toggle.css). Without view transitions, or when reduced
   motion is preferred, the theme simply switches. */
export function toggleTheme(origin: Element) {
  // A swap still waiting for its frame counts, so quick clicks alternate.
  const next: Theme = (pending ?? getTheme()) === "dark" ? "light" : "dark";
  const id = ++latest;
  const root = document.documentElement;

  if (
    typeof document.startViewTransition !== "function" ||
    prefersReducedMotion()
  ) {
    pending = null;
    setTheme(next);
    return;
  }

  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius =
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ) + OVERSCAN;

  running?.skipTransition();

  setCircle(x, y, radius);
  root.dataset.themeReveal = "";
  window.addEventListener("click", passClickThrough);
  pending = next;

  const transition = document.startViewTransition(() => {
    swapTheme(next);

    if (id === latest) pending = null;
  });

  running = transition;

  // Skipped by a newer click, a resize or a hidden tab; the theme still changes.
  transition.ready.catch(() => {});

  void transition.finished.finally(() => {
    if (id !== latest) return;

    running = null;
    window.removeEventListener("click", passClickThrough);
    delete root.dataset.themeReveal;
  });
}
