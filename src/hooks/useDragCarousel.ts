import { useEffect, useRef, useState, type PointerEvent } from "react";

const DRAG_THRESHOLD = 55;

/* Index state plus pointer dragging for a carousel frame. While dragging,
   the distance is written to `--drag-x` on the frame (and on any element
   inside it matching `slideSelector`) once per animation frame, so React
   only re-renders when a drag starts, ends or changes the slide. Dragging
   past either end is damped. */
export function useDragCarousel(count: number, slideSelector?: string) {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const pointerId = useRef<number | null>(null);
  const paintFrame = useRef(0);
  const pendingX = useRef(0);

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(paintFrame.current);
    };
  }, []);

  const previous = () => {
    setActive((current) => Math.max(current - 1, 0));
  };

  const next = () => {
    setActive((current) => Math.min(current + 1, count - 1));
  };

  const distanceTo = (clientX: number) => {
    let distance = clientX - startX.current;

    if ((active === 0 && distance > 0) || (active === count - 1 && distance < 0)) {
      distance *= 0.25;
    }

    return distance;
  };

  const paint = (distance: number) => {
    const frame = frameRef.current;

    if (!frame) return;

    const value = `${distance}px`;

    frame.style.setProperty("--drag-x", value);

    if (slideSelector) {
      frame.querySelectorAll<HTMLElement>(slideSelector).forEach((slide) => {
        slide.style.setProperty("--drag-x", value);
      });
    }
  };

  const schedulePaint = (distance: number) => {
    pendingX.current = distance;
    window.cancelAnimationFrame(paintFrame.current);
    paintFrame.current = window.requestAnimationFrame(() => {
      paint(pendingX.current);
    });
  };

  const reset = () => {
    window.cancelAnimationFrame(paintFrame.current);
    pendingX.current = 0;
    paint(0);
    setIsDragging(false);
    pointerId.current = null;
  };

  const release = (element: HTMLDivElement, id: number) => {
    if (element.hasPointerCapture(id)) {
      element.releasePointerCapture(id);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (count <= 1) return;

    pointerId.current = event.pointerId;
    startX.current = event.clientX;
    setIsDragging(true);

    window.cancelAnimationFrame(paintFrame.current);
    pendingX.current = 0;
    paint(0);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;

    schedulePaint(distanceTo(event.clientX));
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;

    const distance = distanceTo(event.clientX);

    if (distance <= -DRAG_THRESHOLD && active < count - 1) {
      setActive((current) => current + 1);
    } else if (distance >= DRAG_THRESHOLD && active > 0) {
      setActive((current) => current - 1);
    }

    release(event.currentTarget, event.pointerId);
    reset();
  };

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;

    release(event.currentTarget, event.pointerId);
    reset();
  };

  const onLostPointerCapture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current === event.pointerId) reset();
  };

  return {
    active,
    isDragging,
    frameRef,
    previous,
    next,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture,
    },
  };
}
