import { useEffect, type RefObject } from "react";

import { prefersReducedMotion } from "@/lib/motion";

// Loupe radius as a share of the name's font size, and how quickly the loupe
// catches up with the pointer (per frame).
const LENS_SIZE = 0.38;
const FOLLOW = 0.2;
// The ink has fully drained back into the drawing after this share of a
// screen of scrolling.
const DRAIN_DISTANCE = 0.6;

/* Drives the hero's "drawn, then built" wordmark:
   - measures the real cap height, baseline and letter widths so the
     blueprint's guides and labels are true to the type;
   - eases a loupe after the pointer that peels the ink back to the drawing;
   - drains the ink back into the drawing as the hero scrolls away.
   Everything is written to CSS variables on the heading; React never
   re-renders. */
export function useHeroBlueprint(nameRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const name = nameRef.current;
    const built = name?.querySelector<HTMLElement>(".hero-name-letters");
    const blueprint = name?.querySelector<HTMLElement>(".hero-blueprint");

    if (!name || !built || !blueprint) return;

    const reduced = prefersReducedMotion();
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const context = document.createElement("canvas").getContext("2d");
    const set = (key: string, value: string) => name.style.setProperty(key, value);

    // --- Measurements -----------------------------------------------------

    const measure = () => {
      const first = built.firstElementChild as HTMLElement | null;
      if (!context || !first) return;

      const style = getComputedStyle(first);
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

      const metrics = context.measureText("H");
      const lineHeight = first.getBoundingClientRect().height;
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      // The font's ascent + descent sit centred in the line box.
      const baseline = (lineHeight - ascent - descent) / 2 + ascent;
      const capHeight = metrics.actualBoundingBoxAscent;

      set("--bp-base", `${baseline.toFixed(1)}px`);
      set("--bp-cap", `${(baseline - capHeight).toFixed(1)}px`);

      const capLabel = blueprint.querySelector(".hero-bp-cap em");
      const baseLabel = blueprint.querySelector(".hero-bp-base em");
      if (capLabel) capLabel.textContent = `Cap height · ${Math.round(capHeight)} px`;
      if (baseLabel) baseLabel.textContent = `Baseline · Anton ${Math.round(parseFloat(style.fontSize))} px`;

      const builtLetters = [...built.children] as HTMLElement[];
      blueprint.querySelectorAll<HTMLElement>(".hero-bp-letter").forEach((letter, index) => {
        const width = builtLetters[index]?.getBoundingClientRect().width ?? 0;
        letter.dataset.w = String(Math.round(width));
      });
    };

    // --- Loupe -------------------------------------------------------------

    const lens = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 };
    let lensFrame = 0;

    const drawLens = () => {
      set("--lx", `${lens.x.toFixed(1)}px`);
      set("--ly", `${lens.y.toFixed(1)}px`);
      set("--lr", `${Math.max(lens.r, 0).toFixed(1)}px`);
      set("--lo", Math.min(lens.r / 24, 1).toFixed(3));
    };

    const stepLens = () => {
      const ease = reduced ? 1 : FOLLOW;
      lens.x += (lens.tx - lens.x) * ease;
      lens.y += (lens.ty - lens.y) * ease;
      lens.r += (lens.tr - lens.r) * ease;
      drawLens();

      const settled =
        Math.abs(lens.tx - lens.x) < 0.2 &&
        Math.abs(lens.ty - lens.y) < 0.2 &&
        Math.abs(lens.tr - lens.r) < 0.2;

      lensFrame = settled ? 0 : window.requestAnimationFrame(stepLens);
    };

    const runLens = () => {
      if (!lensFrame) lensFrame = window.requestAnimationFrame(stepLens);
    };

    const onMove = (event: PointerEvent) => {
      const box = name.getBoundingClientRect();
      lens.tx = event.clientX - box.left;
      lens.ty = event.clientY - box.top;
      lens.tr = parseFloat(getComputedStyle(name).fontSize) * LENS_SIZE;

      // Open from where the pointer came in, not from the last spot.
      if (lens.r < 1) {
        lens.x = lens.tx;
        lens.y = lens.ty;
      }

      runLens();
    };

    const onLeave = () => {
      lens.tr = 0;
      runLens();
    };

    // --- Drain on scroll ---------------------------------------------------

    let drainFrame = 0;

    const drain = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * DRAIN_DISTANCE), 1);
      // Ease in, so the first few pixels of scroll barely touch the ink.
      const amount = progress * progress;
      const width = built.getBoundingClientRect().width;
      const bleed = (blueprint.getBoundingClientRect().width - width) / 2;

      set("--drain", amount.toFixed(4));
      // Where the drawing takes over from the ink, in the blueprint's own
      // coordinates; pushed far right when nothing has drained so the
      // guides' right-hand bleed stays hidden.
      set("--bp-stop", amount > 0 ? `${(bleed + width * (1 - amount)).toFixed(1)}px` : "99999px");
    };

    const onScroll = () => {
      if (drainFrame) return;

      drainFrame = window.requestAnimationFrame(() => {
        drainFrame = 0;
        drain();
      });
    };

    // --- Wiring ------------------------------------------------------------

    drawLens();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    if (canHover) {
      name.addEventListener("pointermove", onMove);
      name.addEventListener("pointerleave", onLeave);
    }

    if (!reduced) {
      drain();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.cancelAnimationFrame(lensFrame);
      window.cancelAnimationFrame(drainFrame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      name.removeEventListener("pointermove", onMove);
      name.removeEventListener("pointerleave", onLeave);
    };
  }, [nameRef]);
}
