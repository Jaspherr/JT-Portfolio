export type SceneKey = {
  at: number;
  ease?: string;
  [property: string]: string | number | undefined;
};

type Props = Record<string, string | number>;

type Tracks = Record<string, SceneKey[]>;

export type Cue = [at: number, run: (root: HTMLElement) => void];

export type SceneSpec = {
  duration: number;
  tracks: Tracks;
  prepare?: (root: HTMLElement) => void;
  cues?: Cue[];
};

// Plays the intro once, then keeps asking for the next act. Acts are built
// from the scene's current state, so the canvas never resets.
export type Director = {
  intro: SceneSpec;
  next: (root: HTMLElement) => SceneSpec;
};

// Stillness between acts, in seconds. The rotation keeps the rhythm from
// feeling metronomic; a workspace that never pauses reads as a screensaver.
const RESTS = [2.2, 3.6, 1.6, 4.4, 2.8];

export type CursorPoint = [at: number, x: number, y: number, scale?: number];

const EASE = "cubic-bezier(.16, 1, .3, 1)";

export const GLIDE = "cubic-bezier(.65, 0, .35, 1)";

const REST: Props = {
  opacity: 1,
  transform: "none",
  clipPath: "inset(-20% 0% -20% 0)",
};

const settled = (from: Props) =>
  Object.fromEntries(Object.keys(from).map((key) => [key, REST[key]]));

export function reveal(
  at: number,
  duration = 0.4,
  from: Props = { opacity: 0 },
): SceneKey[] {
  return [
    { at: 0, ...from },
    { at, ...from },
    { at: at + duration, ...settled(from) },
  ];
}

export function flash(at: number, until: number, fade = 0.25): SceneKey[] {
  return [
    { at, opacity: 0 },
    { at: at + fade, opacity: 1 },
    { at: until, opacity: 1 },
    { at: until + fade, opacity: 0 },
  ];
}

export function typeOn(at: number, duration: number, chars: number): SceneKey[] {
  const hidden = "inset(-20% 100% -20% 0)";

  return [
    { at: 0, clipPath: hidden },
    { at, clipPath: hidden, ease: `steps(${chars}, end)` },
    { at: at + duration, clipPath: REST.clipPath },
  ];
}

export function drawBox(at: number, duration: number, until: number): SceneKey[] {
  return [
    { at, opacity: 0 },
    { at, opacity: 1 },
    { at, transform: "scale(0)", ease: GLIDE },
    { at: at + duration, transform: "scale(1)" },
    { at: until, opacity: 1 },
    { at: until + 0.25, opacity: 0 },
  ];
}

export function cursor(points: CursorPoint[]): SceneKey[] {
  const first = points[0][0];
  const last = points[points.length - 1][0];

  return [
    { at: first, opacity: 0 },
    { at: first + 0.25, opacity: 1 },
    ...points.map(([at, x, y, scale = 1]) => ({
      at,
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      ease: GLIDE,
    })),
    { at: last - 0.3, opacity: 1 },
    { at: last, opacity: 0 },
  ];
}

export const HIDDEN_TEXT = "inset(-20% 100% -20% 0)";

export const SHOWN_TEXT = REST.clipPath;

export function eraseText(at: number, duration: number, chars: number): SceneKey[] {
  return [
    { at, clipPath: SHOWN_TEXT, ease: `steps(${chars}, start)` },
    { at: at + duration, clipPath: HIDDEN_TEXT },
  ];
}

export function fade(at: number, from: number, to: number, duration = 0.3): SceneKey[] {
  return [
    { at, opacity: from },
    { at: at + duration, opacity: to },
  ];
}

export function add(tracks: Tracks, selector: string, keys: SceneKey[]) {
  tracks[selector] = [...(tracks[selector] ?? []), ...keys];
}

// Runs two acts side by side, the second starting `offset` seconds later.
export function together(a: SceneSpec, b: SceneSpec, offset = 0): SceneSpec {
  const tracks: Tracks = { ...a.tracks };

  for (const [selector, keys] of Object.entries(b.tracks)) {
    add(tracks, selector, keys.map((key) => ({ ...key, at: key.at + offset })));
  }

  return {
    duration: Math.max(a.duration, b.duration + offset),
    tracks,
    prepare: (root) => {
      a.prepare?.(root);
      b.prepare?.(root);
    },
    cues: [
      ...(a.cues ?? []),
      ...(b.cues ?? []).map(([at, run]): Cue => [at + offset, run]),
    ],
  };
}

// Remembers where each collaborator's cursor was last seen, so it reappears
// there and glides to its next task instead of jumping.
export function createCrew(start: Record<string, [x: number, y: number]>) {
  const crew = new Map(
    Object.entries(start).map(([id, [x, y]]) => [id, { x, y }]),
  );
  const place = (x: number, y: number, scale = 1) =>
    `translate(${x}px, ${y}px) scale(${scale})`;

  return {
    walk(id: string, points: CursorPoint[], linger = 0.6): SceneKey[] {
      const last = crew.get(id)!;
      const appear = Math.max(points[0][0] - 0.45, 0);
      const [end, x, y] = points[points.length - 1];

      crew.set(id, { x, y });

      return [
        { at: 0, opacity: 0, transform: place(last.x, last.y) },
        { at: appear, opacity: 0, transform: place(last.x, last.y), ease: GLIDE },
        { at: appear + 0.2, opacity: 1 },
        ...points.map(([at, px, py, scale = 1]) => ({
          at,
          transform: place(px, py, scale),
          ease: GLIDE,
        })),
        { at: end + linger, opacity: 1 },
        { at: end + linger + 0.3, opacity: 0 },
      ];
    },
  };
}

const kebab = (prop: string) =>
  prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

function compile(keys: SceneKey[], duration: number) {
  const held: Record<string, string | number | undefined> = {};
  const frames: Keyframe[] = [...keys]
    .sort((a, b) => a.at - b.at)
    .map(({ at, ease, ...props }) => {
      Object.assign(held, props);

      return { offset: Math.min(at / duration, 1), easing: ease ?? EASE, ...props };
    });

  // Hold every property at its last value instead of easing back.
  frames.push({ offset: 1, ...held });

  return { frames, props: Object.keys(held).map(kebab) };
}

export function createPlayer(root: HTMLElement, director: Director) {
  const touched = new Map<HTMLElement, Set<string>>();
  let effects: Animation[] = [];
  let timers: Animation[] = [];
  let running = false;
  let acts = 0;

  const all = () => [...effects, ...timers];

  // Bake the act's end state into inline styles, then release the animations.
  const settle = () => {
    for (const animation of effects) {
      try {
        animation.commitStyles();
      } catch {
        // The element is not rendered; there is nothing to keep.
      }

      animation.cancel();
    }

    timers.forEach((timer) => timer.cancel());
    effects = [];
    timers = [];
  };

  const stage = (act: SceneSpec) => {
    act.prepare?.(root);

    const duration = act.duration * 1000;

    for (const [selector, keys] of Object.entries(act.tracks)) {
      const { frames, props } = compile(keys, act.duration);

      for (const element of root.querySelectorAll<HTMLElement>(selector)) {
        effects.push(element.animate(frames, { duration, fill: "forwards" }));

        const seen = touched.get(element) ?? new Set();

        props.forEach((prop) => seen.add(prop));
        touched.set(element, seen);
      }
    }

    for (const [at, run] of act.cues ?? []) {
      const cue = root.animate(null, { duration: at * 1000 });

      cue.onfinish = () => run(root);
      timers.push(cue);
    }

    const rest = RESTS[acts % RESTS.length] * 1000;
    const clock = root.animate(null, { duration: duration + rest });

    acts += 1;
    clock.onfinish = () => {
      settle();
      stage(director.next(root));
    };
    timers.push(clock);

    if (!running) all().forEach((animation) => animation.pause());
  };

  stage(director.intro);

  return {
    play() {
      running = true;
      all().forEach((animation) => {
        if (animation.playState !== "finished") animation.play();
      });
    },
    pause() {
      running = false;
      all().forEach((animation) => {
        if (animation.playState !== "finished") animation.pause();
      });
    },
    destroy() {
      all().forEach((animation) => animation.cancel());
      effects = [];
      timers = [];
      touched.forEach((props, element) =>
        props.forEach((prop) => element.style.removeProperty(prop)),
      );
      touched.clear();
    },
  };
}
