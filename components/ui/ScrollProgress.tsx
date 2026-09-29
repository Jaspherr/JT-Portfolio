"use client";

import { useEffect, useRef, useState } from "react";

const HIDDEN_BREAKPOINT = "(max-width: 800px)";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const draggingRef = useRef(false);

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(HIDDEN_BREAKPOINT);
    let listenersAttached = false;

    const paintProgress = () => {
      window.cancelAnimationFrame(frameRef.current);

      frameRef.current = window.requestAnimationFrame(() => {
        const bar = barRef.current;
        const fill = fillRef.current;
        const thumb = thumbRef.current;

        if (!bar || !fill || !thumb || mediaQuery.matches) {
          return;
        }

        const scrollHeight = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          0,
        );

        const nextProgress =
          scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

        const progress = Math.min(
          Math.max(nextProgress, 0),
          1,
        );

        const percent = Math.round(progress * 100);

        fill.style.transform = `scaleY(${progress})`;
        thumb.style.top = `${progress * 100}%`;

        bar.setAttribute("aria-valuenow", String(percent));
        bar.setAttribute("aria-valuetext", `${percent}% scrolled`);
      });
    };

    const attachListeners = () => {
      if (listenersAttached || mediaQuery.matches) {
        return;
      }

      listenersAttached = true;

      window.addEventListener("scroll", paintProgress, {
        passive: true,
      });
      window.addEventListener("resize", paintProgress);
      window.addEventListener("pageshow", paintProgress);

      paintProgress();
    };

    const detachListeners = () => {
      if (!listenersAttached) {
        return;
      }

      listenersAttached = false;

      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", paintProgress);
      window.removeEventListener("resize", paintProgress);
      window.removeEventListener("pageshow", paintProgress);
    };

    const syncBreakpoint = () => {
      if (mediaQuery.matches) {
        detachListeners();

        draggingRef.current = false;
        setDragging(false);

        return;
      }

      attachListeners();
    };

    mediaQuery.addEventListener("change", syncBreakpoint);
    syncBreakpoint();

    return () => {
      mediaQuery.removeEventListener("change", syncBreakpoint);
      detachListeners();
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const scrollFromPointer = (clientY: number) => {
    const bar = barRef.current;

    if (!bar) return;

    const rect = bar.getBoundingClientRect();

    const percentage =
      (clientY - rect.top) / rect.height;

    const clampedPercentage = Math.min(
      Math.max(percentage, 0),
      1,
    );

    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );

    window.scrollTo({
      top: clampedPercentage * maxScroll,
      behavior: "auto",
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );

    let nextScroll: number | null = null;

    switch (event.key) {
      case "Home":
        nextScroll = 0;
        break;
      case "End":
        nextScroll = maxScroll;
        break;
      case "ArrowUp":
      case "PageUp":
        nextScroll = window.scrollY - window.innerHeight * 0.8;
        break;
      case "ArrowDown":
      case "PageDown":
        nextScroll = window.scrollY + window.innerHeight * 0.8;
        break;
      default:
        return;
    }

    event.preventDefault();

    window.scrollTo({
      top: Math.min(Math.max(nextScroll, 0), maxScroll),
      behavior: "auto",
    });
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    draggingRef.current = true;
    setDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    scrollFromPointer(event.clientY);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingRef.current) return;

    scrollFromPointer(event.clientY);
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    draggingRef.current = false;
    setDragging(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }
  };

  const handleLostPointerCapture = () => {
    draggingRef.current = false;
    setDragging(false);
  };

  return (
    <div
      ref={barRef}
      className={`scroll-progress${
        dragging ? " is-dragging" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handleLostPointerCapture}
      onKeyDown={handleKeyDown}
      role="scrollbar"
      aria-controls="main-content"
      tabIndex={0}
      aria-label="Page scroll"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-valuetext="0% scrolled"
    >
      <div className="scroll-progress-track">
        <div
          ref={fillRef}
          className="scroll-progress-fill"
          style={{
            transform: "scaleY(0)",
          }}
        />
      </div>

      <div
        ref={thumbRef}
        className="scroll-progress-thumb"
        style={{
          top: "0%",
        }}
      />
    </div>
  );
}