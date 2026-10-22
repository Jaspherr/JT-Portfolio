import Lenis from "lenis";
import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion";
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      anchors: true,
      autoRaf: true,
    });

    let resizeFrame = 0;
    let disposed = false;

    const scheduleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        if (!disposed) lenis.resize();
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        lenis.stop();
        return;
      }

      lenis.start();
      scheduleResize();
    };

    const handlePageShow = () => {
      lenis.start();
      scheduleResize();
    };

    if (document.visibilityState === "hidden") lenis.stop();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("load", scheduleResize);

    scheduleResize();
    void document.fonts?.ready.then(scheduleResize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(resizeFrame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("load", scheduleResize);
      lenis.destroy();
    };
  }, []);

  return null;
}