"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let refreshFrame = 0;
    let disposed = false;

    const scheduleRefresh = () => {
      window.cancelAnimationFrame(refreshFrame);

      refreshFrame = window.requestAnimationFrame(() => {
        if (disposed) return;

        lenis.resize();
        ScrollTrigger.refresh();
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        lenis.stop();
        return;
      }

      lenis.start();
      scheduleRefresh();
    };

    const handlePageShow = () => {
      lenis.start();
      scheduleRefresh();
    };

    if (document.visibilityState === "hidden") {
      lenis.stop();
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("load", scheduleRefresh);

    scheduleRefresh();

    if (document.fonts) {
      void document.fonts.ready.then(() => {
        if (!disposed) {
          scheduleRefresh();
        }
      });
    }

    return () => {
      disposed = true;

      window.cancelAnimationFrame(refreshFrame);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("load", scheduleRefresh);

      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}