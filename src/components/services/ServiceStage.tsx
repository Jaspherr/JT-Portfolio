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

// Every scene is drawn on this canvas. It is fitted to the stage by whichever
// side constrains it and centred, so a stage capped by the screen height
// shows the whole drawing.
const DESIGN_WIDTH = 320;
const DESIGN_HEIGHT = 200;

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
      const width = stage.clientWidth;
      const scale = Math.min(
        width / DESIGN_WIDTH,
        stage.clientHeight / DESIGN_HEIGHT,
      );

      stage.style.setProperty("--sv-scale", String(scale));
      stage.style.setProperty(
        "--sv-x",
        `${(width - DESIGN_WIDTH * scale) / 2}px`,
      );
      stage.style.setProperty(
        "--sv-y",
        `${(stage.clientHeight - DESIGN_HEIGHT * scale) / 2}px`,
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
        // Only animate while most of the stage can actually be seen.
        inView = entry.intersectionRatio >= 0.35;

        if (!started && entry.intersectionRatio >= 0.5) {
          timer ||= window.setTimeout(() => {
            started = true;
            sync();
          }, 350);
        }

        sync();
      },
      { threshold: [0, 0.35, 0.5] },
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
    <div className={`sv-stage sv-stage-${n}`} ref={stageRef} data-draft="frame">
      <span className="draft-spec" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b />
      </span>

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
