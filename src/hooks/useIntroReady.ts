import { useEffect, type RefObject } from "react";

import { prefersReducedMotion } from "@/lib/motion";
export function useIntroReady(
  ref: RefObject<HTMLElement | null>,
  readyClass: string,
) {
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (prefersReducedMotion()) {
      element.classList.add(readyClass);
      return;
    }

    let frame = 0;

    const reveal = () => {
      if (element.classList.contains(readyClass)) return;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        element.classList.add(readyClass);
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") reveal();
    };

    reveal();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", reveal);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", reveal);
    };
  }, [ref, readyClass]);
}