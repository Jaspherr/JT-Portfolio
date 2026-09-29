import { useEffect } from "react";

export function usePageEffects() {
  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (!reveals.length) return;

    const show = (element: HTMLElement) => {
      element.classList.add("is-visible");
    };

    const showVisibleReveals = () => {
      const viewportBottom = window.innerHeight + 60;

      reveals.forEach((element) => {
        if (element.classList.contains("is-visible")) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportBottom && rect.bottom >= -60) {
          show(element);
        }
      });
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      reveals.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px",
      },
    );

    reveals.forEach((element) => observer.observe(element));

    let frame = 0;

    const scheduleVisibleCheck = () => {
      window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        showVisibleReveals();
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleVisibleCheck();
      }
    };

    window.addEventListener("pageshow", scheduleVisibleCheck);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    // Covers elements already inside the viewport when hydration finishes.
    scheduleVisibleCheck();

    // Small safety check for delayed layout/font changes.
    const safetyTimer = window.setTimeout(
      scheduleVisibleCheck,
      1200,
    );

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(safetyTimer);
      observer.disconnect();
      window.removeEventListener("pageshow", scheduleVisibleCheck);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);
}