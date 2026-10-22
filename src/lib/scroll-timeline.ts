export type Ease = "power3.out" | "power4.out";

export type TweenFrom = {
  opacity?: number;
  autoAlpha?: number;
  x?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  clipInset?: [top: number, bottom: number];
};

export type TweenSpec = {
  targets: string;
  from: TweenFrom;
  duration: number;
  ease: Ease;
  stagger?: number;
  at?: number | `-=${number}`;
  clearTransform?: boolean;
  flat?: boolean;
  originLeft?: boolean;
};

export type TimelineSpec = {
  scope: string;
  trigger?: string;
  start: number;
  tweens: TweenSpec[];
};

const EASES: Record<Ease, (t: number) => number> = {
  "power3.out": (t) => 1 - (1 - t) ** 4,
  "power4.out": (t) => 1 - (1 - t) ** 5,
};

const round = (value: number) => Math.round(value * 10000) / 10000;

const STYLE_PROPS = [
  "transform",
  "translate",
  "rotate",
  "scale",
  "transform-origin",
  "opacity",
  "visibility",
  "clip-path",
] as const;

type Values = {
  opacity: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  clipTop: number;
  clipBottom: number;
};

const REST: Values = {
  opacity: 1,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  clipTop: 0,
  clipBottom: 0,
};

type Target = {
  element: HTMLElement;
  start: number;
  tween: TweenSpec;
  from: Values;
  baseTransform: string;
  done: boolean;
};

function fromValues({ opacity, autoAlpha, x, y, scale, scaleX, clipInset }: TweenFrom): Values {
  return {
    opacity: autoAlpha ?? opacity ?? 1,
    x: x ?? 0,
    y: y ?? 0,
    scaleX: scaleX ?? scale ?? 1,
    scaleY: scale ?? 1,
    clipTop: clipInset?.[0] ?? 0,
    clipBottom: clipInset?.[1] ?? 0,
  };
}

const animatesTransform = ({ x, y, scale, scaleX }: TweenFrom) =>
  x !== undefined || y !== undefined || scale !== undefined || scaleX !== undefined;

function cssTranslation(element: HTMLElement, from: TweenFrom) {
  if (from.x !== undefined || from.y !== undefined) return "";

  const { m41, m42 } = new DOMMatrix(getComputedStyle(element).transform);

  return m41 || m42 ? `translate(${round(m41)}px, ${round(m42)}px) ` : "";
}

function transformString(target: Target, v: Values, use3D: boolean) {
  let transform = target.baseTransform;

  if (use3D) {
    transform += `translate3d(${round(v.x)}px, ${round(v.y)}px, 0px) `;
  } else if (v.x || v.y) {
    transform += `translate(${round(v.x)}px, ${round(v.y)}px) `;
  }

  if (v.scaleX !== 1 || v.scaleY !== 1) {
    transform += `scale(${round(v.scaleX)}, ${round(v.scaleY)})`;
  }

  return transform.trim() || "translate(0px, 0px)";
}

function render(target: Target, progress: number) {
  const { element, tween, from } = target;
  const style = element.style;
  const eased = EASES[tween.ease](progress);
  const v = {} as Values;

  for (const key of Object.keys(REST) as (keyof Values)[]) {
    v[key] = from[key] + (REST[key] - from[key]) * eased;
  }

  if (animatesTransform(tween.from)) {
    const use3D = !tween.flat && progress > 0 && progress < 1;

    style.translate = "none";
    style.rotate = "none";
    style.scale = "none";
    style.transform = transformString(target, v, use3D);
  }

  if (tween.from.opacity !== undefined || tween.from.autoAlpha !== undefined) {
    style.opacity = String(round(v.opacity));
  }

  if (tween.from.autoAlpha !== undefined) {
    style.visibility = v.opacity === 0 ? "hidden" : "inherit";
  }

  if (tween.from.clipInset) {
    style.clipPath = `inset(${round(v.clipTop)}% 0 ${round(v.clipBottom)}% 0)`;
  }

  if (progress === 1 && tween.clearTransform) {
    for (const prop of ["transform", "translate", "rotate", "scale"]) {
      style.removeProperty(prop);
    }
  }
}

function buildTimeline(scope: HTMLElement, spec: TimelineSpec) {
  const targets: Target[] = [];
  let end = 0;

  for (const tween of spec.tweens) {
    const elements =
      tween.targets === ":scope"
        ? [scope]
        : Array.from(scope.querySelectorAll<HTMLElement>(tween.targets));

    if (!elements.length) continue;

    const start =
      tween.at === undefined
        ? end
        : typeof tween.at === "number"
          ? tween.at
          : end - Number(tween.at.slice(2));
    const stagger = tween.stagger ?? 0;

    elements.forEach((element, index) => {
      if (tween.originLeft) element.style.transformOrigin = "0% 50%";

      targets.push({
        element,
        start: start + index * stagger,
        tween,
        from: fromValues(tween.from),
        baseTransform: cssTranslation(element, tween.from),
        done: false,
      });
    });

    end = Math.max(end, start + tween.duration + stagger * (elements.length - 1));
  }

  const trigger = spec.trigger
    ? scope.querySelector<HTMLElement>(spec.trigger)
    : scope;

  return { targets, trigger, start: spec.start, startedAt: 0 };
}

type Timeline = ReturnType<typeof buildTimeline>;

function triggerTop(timeline: Timeline) {
  const trigger = timeline.trigger!;
  const own = timeline.targets.find((target) => target.element === trigger);

  return trigger.getBoundingClientRect().top - (own?.from.y ?? 0);
}

export function playOnScroll(specs: TimelineSpec[], root: ParentNode = document) {
  const timelines = specs.flatMap((spec) =>
    Array.from(root.querySelectorAll<HTMLElement>(spec.scope)).map((scope) =>
      buildTimeline(scope, spec),
    ),
  ).filter((timeline) => timeline.trigger && timeline.targets.length);

  const saved = new Map<HTMLElement, string[]>();

  for (const timeline of timelines) {
    for (const target of timeline.targets) {
      if (!saved.has(target.element)) {
        saved.set(
          target.element,
          STYLE_PROPS.map((prop) => target.element.style.getPropertyValue(prop)),
        );
      }

      render(target, 0);
    }
  }

  let pending = [...timelines];
  let running: Timeline[] = [];
  let frame = 0;
  let initialCheck = 0;

  const tick = (now: number) => {
    running = running.filter((timeline) => {
      const elapsed = (now - timeline.startedAt) / 1000;

      for (const target of timeline.targets) {
        if (target.done) continue;

        const progress = (elapsed - target.start) / target.tween.duration;

        if (progress <= 0) continue;

        target.done = progress >= 1;
        render(target, Math.min(progress, 1));
      }

      return timeline.targets.some((target) => !target.done);
    });

    frame = running.length ? requestAnimationFrame(tick) : 0;
  };

  const check = () => {
    const viewport = window.innerHeight;
    const ready = pending.filter((t) => triggerTop(t) <= viewport * t.start);

    if (!ready.length) return;

    const now = Number(document.timeline.currentTime ?? performance.now());

    ready.forEach((timeline) => (timeline.startedAt = now));
    pending = pending.filter((timeline) => !ready.includes(timeline));
    running.push(...ready);

    if (!frame) frame = requestAnimationFrame(tick);
    if (!pending.length) removeListeners();
  };

  const removeListeners = () => {
    window.removeEventListener("scroll", check);
    window.removeEventListener("resize", check);
    window.removeEventListener("load", check);
  };

  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check);
  window.addEventListener("load", check);

  initialCheck = requestAnimationFrame(check);

  return () => {
    removeListeners();
    cancelAnimationFrame(frame);
    cancelAnimationFrame(initialCheck);

    saved.forEach((values, element) => {
      STYLE_PROPS.forEach((prop, index) => {
        element.style.setProperty(prop, values[index]);
      });
    });
  };
}