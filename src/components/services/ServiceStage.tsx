import { Pause, Play } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { createPlayer, type Director } from "@/lib/scene";

const DESIGN_WIDTH = 320;

type ServiceStageProps = {
  n: string;
  title: string;
  summary: string;
  direct: () => Director;
  children: ReactNode;
};

export default function ServiceStage({
  n,
  title,
  summary,
  direct,
  children,
}: ServiceStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const heldRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});
  const [held, setHeld] = useState(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const fit = () => {
      stage.style.setProperty(
        "--sv-scale",
        String(stage.clientWidth / DESIGN_WIDTH),
      );
    };

    fit();

    const observer = new ResizeObserver(fit);

    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage || !canvas || prefersReducedMotion()) return;

    const player = createPlayer(canvas, direct());
    let started = false;
    let inView = false;
    let timer = 0;

    // Runs only while the stage is on screen, the tab is visible and the
    // visitor has not paused it.
    const sync = () => {
      const live =
        started &&
        inView &&
        !heldRef.current &&
        document.visibilityState === "visible";

      if (live) player.play();
      else player.pause();

      stage.dataset.scene = !started
        ? "ready"
        : heldRef.current
          ? "held"
          : live
            ? "playing"
            : "paused";
    };

    syncRef.current = sync;
    sync();

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;

        if (!started && entry.intersectionRatio >= 0.5) {
          timer ||= window.setTimeout(() => {
            started = true;
            sync();
          }, 350);
        }

        sync();
      },
      { threshold: [0, 0.5] },
    );

    observer.observe(stage);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.clearTimeout(timer);
      player.destroy();
      syncRef.current = () => {};
      delete stage.dataset.scene;
    };
  }, [direct]);

  const toggle = () => {
    heldRef.current = !heldRef.current;
    setHeld(heldRef.current);
    syncRef.current();
  };

  return (
    <div className={`sv-stage sv-stage-${n}`} ref={stageRef}>
      <div className="sv-canvas" ref={canvasRef} aria-hidden="true">
        {children}
      </div>

      <p className="sr-only">{summary}</p>

      <button
        type="button"
        className="sv-toggle"
        aria-label={`Pause animation: ${title}`}
        aria-pressed={held}
        title={held ? "Play" : "Pause"}
        onClick={toggle}
      >
        {held ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}
