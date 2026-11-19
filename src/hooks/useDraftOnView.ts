import { useLayoutEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion";

/* One observer for every entrance on the page.

   Elements marked `data-draft` get `data-drafted` the first time they come
   into view; src/styles/draft.css turns that into the site's "drawn, then
   built" moves (set, frame, ink).

   The hidden "before" states only apply once `motion-draft` is on <html>,
   which happens here — so prerendered pages without JavaScript, and visitors
   who prefer reduced motion, always see the finished page. */

const SELECTOR = "[data-draft]";

function finish(element: HTMLElement) {
  // Frames report their real size in the spec label while drafting.
  if (element.dataset.draft === "frame") {
    const label = element.querySelector(".draft-spec b");
    const { width, height } = element.getBoundingClientRect();
    if (label) label.textContent = `${Math.round(width)} × ${Math.round(height)}`;
  }

  element.dataset.drafted = "";
}

export function useDraftOnView() {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    if (!elements.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      elements.forEach(finish);
      return;
    }

    const root = document.documentElement;
    root.classList.add("motion-draft");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          finish(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      // Start a little before the element is fully in, so the move is under
      // way as it arrives rather than after.
      { rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-draft");
    };
  }, []);
}
