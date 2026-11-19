import SceneCursor from "@/components/services/SceneCursor";
import ServiceStage from "@/components/services/ServiceStage";
import {
  GLIDE,
  HIDDEN_TEXT,
  SHOWN_TEXT,
  createCrew,
  cursor,
  drawBox,
  eraseText,
  fade,
  flash,
  reveal,
  together,
  typeOn,
  type Director,
  type SceneKey,
  type SceneSpec,
} from "@/lib/scene";

const HEADING = "Clarity, by design.";
const HEADING_WIDTH = 117;
const WORKSPACE = "translate(58px, 20px) scale(.8)";
const LAYER = { opacity: 0, transform: "translateX(-4px)" };

const intro: SceneSpec = {
  duration: 7.7,
  // The finished hero is the first result; let it be seen.
  hold: 0.9,
  tracks: {
    ".sv-d-panel": [
      { at: 0, opacity: 1 },
      { at: 6.4, opacity: 1 },
      { at: 6.9, opacity: 0 },
    ],
    ".sv-d-work": [
      { at: 0, transform: WORKSPACE },
      { at: 6.4, transform: WORKSPACE, ease: GLIDE },
      { at: 7.3, transform: "none" },
    ],

    // Layout draws the artboard.
    ".sv-cur-layout": cursor([
      [0.3, -6, 40],
      [0.7, 14, 12],
      [0.8, 14, 12, 0.82],
      [1.6, 306, 188, 0.82],
      [1.7, 306, 188],
      [2.2, 250, 194],
      [2.9, 36, 114],
      [3.0, 36, 114, 0.82],
      [3.5, 96, 132, 0.82],
      [3.6, 96, 132],
      [4.0, 112, 146],
      [6.0, 112, 146],
      [6.4, 70, 214],
    ]),
    ".sv-d-size-board": flash(0.95, 1.6, 0.12),
    ".sv-d-size-btn": flash(3.1, 3.5, 0.12),
    ".sv-d-o1": drawBox(0.8, 0.8, 2),
    ".sv-d-board": reveal(1.65),
    ".sv-d-name": flash(1.7, 6.1),
    ".sv-d-r1": reveal(1.7, 0.3, LAYER),

    // Type sets the heading, then the supporting copy.
    ".sv-cur-type": cursor([
      [1.9, 330, 30],
      [2.5, 30, 76],
      [2.6, 30, 76, 0.82],
      [2.7, 30, 76],
      [3.9, 60, 86],
      [4.1, 33, 92],
      [4.15, 33, 92, 0.82],
      [4.5, 153, 92, 0.82],
      [4.55, 153, 92],
      [4.7, 31, 100],
      [4.72, 31, 100, 0.82],
      [5.0, 119, 100, 0.82],
      [5.1, 128, 108],
      [6.0, 128, 108],
      [6.4, 200, -20],
    ]),
    ".sv-d-caret": [
      { at: 2.6, opacity: 0 },
      { at: 2.6, opacity: 1 },
      { at: 2.7, transform: "translateX(0px)", ease: `steps(${HEADING.length}, end)` },
      { at: 3.9, transform: `translateX(${HEADING_WIDTH}px)` },
      { at: 4.05, transform: `translateX(${HEADING_WIDTH}px)` },
      { at: 4.05, opacity: 1 },
      { at: 4.05, opacity: 0 },
    ],
    ".sv-d-h": typeOn(2.7, 1.2, HEADING.length),
    ".sv-d-r2": reveal(2.7, 0.3, LAYER),
    ".sv-d-p1": [
      { at: 0, transform: "translateX(5px) scaleX(0)" },
      { at: 4.15, transform: "translateX(5px) scaleX(0)", ease: GLIDE },
      { at: 4.5, transform: "translateX(5px) scaleX(1)" },
      { at: 5.1, transform: "translateX(5px) scaleX(1)" },
      { at: 5.35, transform: "translateX(0px) scaleX(1)" },
    ],
    ".sv-d-p2": [
      { at: 0, transform: "translateX(3px) scaleX(0)" },
      { at: 4.72, transform: "translateX(3px) scaleX(0)", ease: GLIDE },
      { at: 5.0, transform: "translateX(3px) scaleX(1)" },
      { at: 5.14, transform: "translateX(3px) scaleX(1)" },
      { at: 5.39, transform: "translateX(0px) scaleX(1)" },
    ],
    ".sv-d-r5": reveal(4.2, 0.3, LAYER),

    // UI places the media block.
    ".sv-cur-ui": cursor([
      [2.0, 330, 120],
      [2.5, 190, 38],
      [2.6, 190, 38, 0.82],
      [3.3, 292, 158, 0.82],
      [3.4, 292, 158],
      [3.8, 300, 172],
      [6.0, 300, 172],
      [6.4, 340, 214],
    ]),
    ".sv-d-size-img": flash(2.75, 3.3, 0.12),
    ".sv-d-o2": drawBox(2.6, 0.7, 3.6),
    ".sv-d-img": [
      ...reveal(3.3, 0.35),
      { at: 0, borderRadius: "0px" },
      { at: 5.4, borderRadius: "0px" },
      { at: 5.8, borderRadius: "10px" },
    ],
    ".sv-d-ph": [
      { at: 0, opacity: 1 },
      { at: 5.4, opacity: 1 },
      { at: 5.9, opacity: 0 },
    ],
    ".sv-d-img > i, .sv-d-img > span": reveal(5.6),
    ".sv-d-r3": reveal(3.35, 0.3, LAYER),

    // The button lands off-grid, then snaps to the guide.
    ".sv-d-o3": drawBox(3.0, 0.5, 3.8),
    ".sv-d-btn": [
      ...reveal(3.5, 0.3),
      { at: 0, transform: "translateX(8px)", borderRadius: "3px" },
      { at: 5.18, transform: "translateX(8px)" },
      { at: 5.43, transform: "translateX(0px)" },
      { at: 5.5, borderRadius: "3px" },
      { at: 5.9, borderRadius: "9px" },
    ],
    ".sv-d-bl-0": reveal(3.8, 0.3),
    ".sv-d-r4": reveal(3.55, 0.3, LAYER),

    // Align drags a guide out of the ruler and tidies the spacing.
    ".sv-cur-align": cursor([
      [4.3, -10, 130],
      [4.7, 6, 94],
      [4.75, 6, 94, 0.82],
      [5.1, 28, 94, 0.82],
      [5.2, 28, 94],
      [5.6, 150, 124],
      [6.0, 150, 124],
      [6.4, -10, 150],
    ]),
    ".sv-d-guide": [
      { at: 4.75, opacity: 0, transform: "translateX(-22px)", ease: GLIDE },
      { at: 5.1, opacity: 1, transform: "translateX(0px)" },
      { at: 6.1, opacity: 1 },
      { at: 6.4, opacity: 0 },
    ],
    ".sv-d-gap": flash(5.5, 6.1),
    ".sv-d-nav": reveal(5.6, 0.45, { opacity: 0, transform: "translateY(-4px)" }),
  },
  prepare: (root) => {
    text(root, ".sv-d-h", HEADING);
    text(root, ".sv-d-gap-1 b", "8");
    delete root.querySelector<HTMLElement>(".sv-d-img")!.dataset.top;
  },
};

/* After the hero is built, the team keeps working on it: restyling,
   retyping, swapping media, duplicating, tidying spacing and trying the
   other layout. Every act starts from the design as it currently is. */

const TEXT_X = 28;
const BUTTON_Y = 114;
const HEADING_Y = 64;
// The media block's canvas top and height, and its selection box.
const IMAGE_Y = 38;
const IMAGE_H = 120;
const IMAGE_BOX = { y: IMAGE_Y - 1.5, h: IMAGE_H + 3 };
const IMAGE_X = 190;
const TEXT_SHIFT = 120;
const IMAGE_SHIFT = -162;
const COPY_OFFSET = 66;

const HEADINGS = [HEADING, "Design that explains.", "Simple, by intent."];
const BUTTON_STYLES = ["Fill · Brown", "Fill · Ink", "Style · Outline"];
const COVERED = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

const PLAN = [
  "button",
  "heading+image",
  "copy",
  "spacing",
  "layout",
  "review",
  "image",
  "heading+button",
  "copy",
  "layout",
  "spacing",
  "review",
];

type Box = [x: number, y: number, width: number, height: number];

const px = (value: number) => `${value}px`;

const rect = ([x, y, width, height]: Box) => ({
  left: px(x),
  top: px(y),
  width: px(width),
  height: px(height),
});

function text(root: HTMLElement, selector: string, value: string) {
  root.querySelector(selector)!.textContent = value;
}

function select(at: number, until: number, box: Box): SceneKey[] {
  return [
    { at: 0, opacity: 0, ...rect(box) },
    { at, opacity: 0 },
    { at: at + 0.12, opacity: 1 },
    { at: until, opacity: 1 },
    { at: until + 0.2, opacity: 0 },
  ];
}

// Cross-fades stacked style layers; layer 0 is the element's own fill.
function restyle(prefix: string, from: number, to: number, at: number, labels = false) {
  const tracks: SceneSpec["tracks"] = {};
  const settled = at + 0.35;

  if (labels) {
    tracks[`${prefix}-${from}`] = fade(at, 1, 0, 0.35);
    tracks[`${prefix}-${to}`] = fade(at, 0, 1, 0.35);
  } else if (to > from) {
    tracks[`${prefix}-${to}`] = fade(at, 0, 1, 0.35);
    if (from) tracks[`${prefix}-${from}`] = fade(settled, 1, 0, 0.01);
  } else {
    tracks[`${prefix}-${from}`] = fade(at, 1, 0, 0.35);
    if (to) tracks[`${prefix}-${to}`] = fade(at, 0, 1, 0.01);
  }

  return tracks;
}

function direct(): Director {
  const crew = createCrew({
    layout: [70, 214],
    type: [200, -20],
    ui: [340, 214],
    align: [-10, 150],
  });
  const state = {
    step: 0,
    swapped: false,
    tight: false,
    button: 0,
    image: 0,
    heading: 0,
    copy: false,
  };

  const textX = () => (state.swapped ? TEXT_SHIFT : 0);
  const textY = () => (state.tight ? -3 : 0);
  const imageX = () => IMAGE_X + (state.swapped ? IMAGE_SHIFT : 0);

  const placement = (x: number, y: number): Record<string, string> => ({
    ".sv-d-h": `translate(${x}px, 0px)`,
    ".sv-d-p": `translate(${x}px, ${y}px) scaleX(1)`,
    ".sv-d-btn": `translate(${x}px, ${y}px)`,
    ".sv-d-btn2": `translate(${x + COPY_OFFSET}px, ${y}px)`,
  });

  const moveText = (
    at: number,
    duration: number,
    from: [x: number, y: number],
    to: [x: number, y: number],
  ) => {
    const start = placement(...from);
    const end = placement(...to);

    return Object.fromEntries(
      Object.keys(start).map((selector) => [
        selector,
        [
          { at, transform: start[selector], ease: GLIDE },
          { at: at + duration, transform: end[selector] },
        ],
      ]),
    );
  };

  const button = (): SceneSpec => {
    const x = TEXT_X + textX();
    const y = BUTTON_Y + textY();
    const from = state.button;
    const to = (from + 1) % BUTTON_STYLES.length;

    state.button = to;

    return {
      duration: 3.6,
      tracks: {
        ".sv-cur-ui": crew.walk("ui", [
          [0.6, x + 46, y + 12],
          [0.68, x + 46, y + 12, 0.82],
          [0.78, x + 46, y + 12],
          [1.7, x + 54, y + 20],
          [2.4, x + 54, y + 20],
        ]),
        ".sv-d-sel-ui": select(0.7, 2.5, [x - 1.5, y - 1.5, 63, 21]),
        ".sv-d-tip-ui": flash(0.95, 2.3, 0.15),
        ...restyle(".sv-d-bs", from, to, 1.3),
        ...restyle(".sv-d-bl", from, to, 1.3, true),
      },
      prepare: (root) => text(root, ".sv-d-tip-ui", BUTTON_STYLES[to]),
    };
  };

  const heading = (root: HTMLElement): SceneSpec => {
    const element = root.querySelector<HTMLElement>(".sv-d-h")!;
    const before = element.textContent ?? "";
    const after = HEADINGS[(state.heading + 1) % HEADINGS.length];
    const shift = textX();
    const x = TEXT_X + shift;

    // Measure both versions once, so the caret lands on the last letter.
    const from = element.offsetWidth;
    element.textContent = after;
    const to = element.offsetWidth;
    element.textContent = before;

    state.heading = (state.heading + 1) % HEADINGS.length;

    const erase = 1;
    const erased = erase + before.length * 0.03;
    const type = erased + 0.15;
    const typed = type + after.length * 0.06;
    const caret = (width: number) => `translateX(${shift + width}px)`;

    return {
      duration: typed + 1.1,
      tracks: {
        ".sv-cur-type": crew.walk("type", [
          [0.6, x + from + 3, HEADING_Y + 12],
          [0.66, x + from + 3, HEADING_Y + 12, 0.82],
          [0.72, x + from + 3, HEADING_Y + 12],
          [0.78, x + from + 3, HEADING_Y + 12, 0.82],
          [0.84, x + from + 3, HEADING_Y + 12],
          [type, x + from / 2, HEADING_Y + 30],
          [typed + 0.3, x + to + 12, HEADING_Y + 26],
        ]),
        ".sv-d-sel-type": select(0.78, erase, [x - 2, HEADING_Y, from + 4, 20]),
        ".sv-d-caret": [
          { at: 0, opacity: 0, transform: caret(from) },
          { at: erase, opacity: 0 },
          { at: erase, opacity: 1, transform: caret(from), ease: `steps(${before.length}, start)` },
          { at: erased, transform: caret(0) },
          { at: type, transform: caret(0), ease: `steps(${after.length}, end)` },
          { at: typed, transform: caret(to) },
          { at: typed + 0.3, opacity: 1 },
          { at: typed + 0.3, opacity: 0 },
        ],
        ".sv-d-h": [
          ...eraseText(erase, erased - erase, before.length),
          { at: type, clipPath: HIDDEN_TEXT, ease: `steps(${after.length}, end)` },
          { at: typed, clipPath: SHOWN_TEXT },
        ],
      },
      cues: [[erased + 0.05, (scene) => text(scene, ".sv-d-h", after)]],
    };
  };

  const image = (): SceneSpec => {
    const x = imageX();
    const from = state.image;
    const to = (from + 1) % 3;

    state.image = to;

    return {
      duration: 3.4,
      tracks: {
        ".sv-cur-ui": crew.walk("ui", [
          [0.6, x + 108, 24],
          [0.66, x + 108, 24, 0.82],
          [1.2, x + 51, IMAGE_Y + 44, 0.82],
          [1.3, x + 51, IMAGE_Y + 44],
          [2.1, x + 60, IMAGE_Y + 68],
        ]),
        ".sv-d-size-img": flash(1.25, 1.9, 0.12),
        ".sv-d-sel-ui": select(1.25, 2.5, [x - 1.5, IMAGE_BOX.y, 105, IMAGE_BOX.h]),
        [`.sv-d-fill-${to}`]: [
          { at: 0, clipPath: COVERED },
          { at: 1.3, clipPath: COVERED, ease: GLIDE },
          { at: 2, clipPath: OPEN },
        ],
        [`.sv-d-fill-${from}`]: [
          { at: 2, clipPath: OPEN },
          { at: 2.02, clipPath: COVERED },
        ],
      },
      prepare: (root) => {
        root.querySelector<HTMLElement>(".sv-d-img")!.dataset.top = String(to);
      },
    };
  };

  const duplicate = (): SceneSpec => {
    const shift = textX();
    const lift = textY();
    const x = TEXT_X + shift;
    const y = BUTTON_Y + lift;
    const at = (offset: number) => `translate(${shift + offset}px, ${lift}px)`;

    state.copy = true;

    return {
      duration: 3.6,
      tracks: {
        ".sv-cur-layout": crew.walk("layout", [
          [0.6, x + 30, y + 11],
          [0.66, x + 30, y + 11, 0.82],
          [0.75, x + 30, y + 11],
          [0.9, x + 30, y + 11, 0.82],
          [1.7, x + 96, y + 11, 0.82],
          [1.8, x + 96, y + 11],
          [2.6, x + 104, y + 28],
        ]),
        ".sv-d-sel-layout": [
          { at: 0, opacity: 0, ...rect([x - 1.5, y - 1.5, 63, 21]) },
          { at: 0.68, opacity: 0 },
          { at: 0.8, opacity: 1 },
          { at: 0.9, left: px(x - 1.5), ease: GLIDE },
          { at: 1.7, left: px(x + COPY_OFFSET - 1.5) },
          { at: 2.7, opacity: 1 },
          { at: 2.9, opacity: 0 },
        ],
        ".sv-d-tip-layout": flash(0.9, 1.8, 0.15),
        ".sv-d-btn2": [
          { at: 0, opacity: 0, transform: at(0) },
          { at: 0.9, opacity: 0, transform: at(0), ease: GLIDE },
          { at: 0.95, opacity: 1 },
          { at: 1.7, transform: at(COPY_OFFSET) },
        ],
        ".sv-d-b2c, .sv-d-b2-b": [
          { at: 0, opacity: 1 },
          { at: 2.1, opacity: 1 },
          { at: 2.45, opacity: 0 },
        ],
        ".sv-d-gaph": [
          { at: 0, opacity: 0, transform: at(0) },
          ...flash(1.75, 2.6, 0.15),
        ],
      },
      prepare: (root) => text(root, ".sv-d-tip-layout", "⌥ Duplicate"),
    };
  };

  const remove = (): SceneSpec => {
    const shift = textX();
    const lift = textY();
    const x = TEXT_X + shift + COPY_OFFSET;
    const y = BUTTON_Y + lift;
    const at = `translate(${shift + COPY_OFFSET}px, ${lift}px)`;

    state.copy = false;

    return {
      duration: 2.9,
      tracks: {
        ".sv-cur-align": crew.walk("align", [
          [0.6, x + 30, y + 11],
          [0.66, x + 30, y + 11, 0.82],
          [0.75, x + 30, y + 11],
          [1.5, x + 44, y + 26],
        ]),
        ".sv-d-sel-align": select(0.68, 1.35, [x - 1.5, y - 1.5, 63, 21]),
        ".sv-d-tip-align": flash(0.9, 1.4, 0.15),
        ".sv-d-btn2": [
          { at: 1.35, opacity: 1, transform: `${at} scale(1)` },
          { at: 1.65, opacity: 0, transform: `${at} scale(.9)` },
        ],
      },
      prepare: (root) => text(root, ".sv-d-tip-align", "Delete"),
    };
  };

  const spacing = (): SceneSpec => {
    const x = textX();
    const from = textY();

    state.tight = !state.tight;

    const to = textY();
    const gap = (lift: number) => 8 + lift;
    const guide = (offset: number) => `translateX(${x + offset}px)`;
    const lower = (lift: number) => `translate(${x}px, ${lift}px)`;

    return {
      duration: 3.6,
      tracks: {
        ".sv-d-guide": [
          { at: 0, opacity: 0, transform: guide(-22) },
          { at: 0.5, opacity: 0, transform: guide(-22), ease: GLIDE },
          { at: 0.95, opacity: 1, transform: guide(0) },
          { at: 2.7, opacity: 1 },
          { at: 3, opacity: 0 },
        ],
        ".sv-cur-align": crew.walk("align", [
          [0.5, x + 4, 94],
          [0.56, x + 4, 94, 0.82],
          [0.95, x + 28, 94, 0.82],
          [1.05, x + 28, 94],
          [1.45, x + 92, 91 + from],
          [1.5, x + 92, 91 + from, 0.82],
          [1.95, x + 92, 91 + to, 0.82],
          [2.05, x + 92, 91 + to],
          [2.6, x + 100, 108],
        ]),
        ".sv-d-gap-1": [
          { at: 0, opacity: 0, transform: guide(0), height: px(gap(from)) },
          { at: 1.1, opacity: 0 },
          { at: 1.25, opacity: 1 },
          { at: 1.5, height: px(gap(from)), ease: GLIDE },
          { at: 1.95, height: px(gap(to)) },
          { at: 2.7, opacity: 1 },
          { at: 3, opacity: 0 },
        ],
        ".sv-d-gap-2": [
          { at: 0, opacity: 0, transform: lower(from) },
          { at: 1.1, opacity: 0 },
          { at: 1.25, opacity: 1 },
          { at: 1.5, transform: lower(from), ease: GLIDE },
          { at: 1.95, transform: lower(to) },
          { at: 2.7, opacity: 1 },
          { at: 3, opacity: 0 },
        ],
        ".sv-d-tip-align": flash(1.5, 2.3, 0.15),
        ...moveText(1.5, 0.45, [x, from], [x, to]),
      },
      prepare: (root) => {
        text(root, ".sv-d-gap-1 b", String(gap(from)));
        text(root, ".sv-d-tip-align", `Gap · ${gap(to)}`);
      },
      cues: [[1.95, (root) => text(root, ".sv-d-gap-1 b", String(gap(to)))]],
    };
  };

  const layout = (): SceneSpec => {
    const fromText = textX();
    const fromImage = imageX();
    const lift = textY();

    state.swapped = !state.swapped;

    const toText = textX();
    const toImage = imageX();
    const media = (x: number) => `translateX(${x - IMAGE_X}px)`;

    return {
      duration: 3.4,
      tracks: {
        ".sv-cur-layout": crew.walk("layout", [
          [0.6, fromImage + 51, IMAGE_Y + IMAGE_H / 2],
          [0.68, fromImage + 51, IMAGE_Y + IMAGE_H / 2, 0.82],
          [1.9, toImage + 51, IMAGE_Y + IMAGE_H / 2, 0.82],
          [2, toImage + 51, IMAGE_Y + IMAGE_H / 2],
          [2.6, toImage + 60, IMAGE_Y + IMAGE_H * 0.74],
        ]),
        ".sv-d-sel-layout": [
          { at: 0, opacity: 0, ...rect([fromImage - 1.5, IMAGE_BOX.y, 105, IMAGE_BOX.h]) },
          { at: 0.7, opacity: 0 },
          { at: 0.8, left: px(fromImage - 1.5), ease: GLIDE },
          { at: 0.82, opacity: 1 },
          { at: 1.9, left: px(toImage - 1.5) },
          { at: 2.5, opacity: 1 },
          { at: 2.7, opacity: 0 },
        ],
        ".sv-d-tip-layout": flash(0.85, 1.9, 0.15),
        ".sv-d-img": [
          { at: 0.8, transform: media(fromImage), ease: GLIDE },
          { at: 1.9, transform: media(toImage) },
        ],
        ...moveText(1, 1.05, [fromText, lift], [toText, lift]),
      },
      prepare: (root) => text(root, ".sv-d-tip-layout", "Swap sides"),
    };
  };

  const review = (root: HTMLElement): SceneSpec => {
    const x = TEXT_X + textX();
    const y = BUTTON_Y + textY();
    const width = root.querySelector<HTMLElement>(".sv-d-h")!.offsetWidth;
    const headingBox = rect([x - 2, HEADING_Y, width + 4, 20]);
    const imageBox = rect([imageX() - 1.5, IMAGE_BOX.y, 105, IMAGE_BOX.h]);
    const buttonBox = rect([x - 1.5, y - 1.5, 63, 21]);
    const row = (index: number) => `translateY(${index * 10}px)`;

    // While zoomed out, the layers panel sits at negative workspace
    // coordinates (canvas y = 20 + 0.8 × workspace y).
    return {
      duration: 5.4,
      tracks: {
        ".sv-d-work": [
          { at: 0, transform: "none", ease: GLIDE },
          { at: 0.9, transform: WORKSPACE },
          { at: 4, transform: WORKSPACE, ease: GLIDE },
          { at: 4.9, transform: "none" },
        ],
        ".sv-d-panel": [
          { at: 0.3, opacity: 0 },
          { at: 0.9, opacity: 1 },
          { at: 4, opacity: 1 },
          { at: 4.5, opacity: 0 },
        ],
        ".sv-d-name": flash(0.9, 4),
        ".sv-cur-type": crew.walk(
          "type",
          [
            [1.4, -41, 27],
            [1.48, -41, 27, 0.82],
            [1.56, -41, 27],
            [2.2, -41, 39],
            [2.28, -41, 39, 0.82],
            [2.36, -41, 39],
            [3, -41, 52],
            [3.08, -41, 52, 0.82],
            [3.16, -41, 52],
            [3.6, 6, 150],
          ],
          0.1,
        ),
        ".sv-d-hl": [
          { at: 0, opacity: 0, transform: row(1) },
          { at: 1.5, opacity: 0 },
          { at: 1.55, opacity: 1 },
          { at: 2.25, transform: row(1), ease: GLIDE },
          { at: 2.35, transform: row(2) },
          { at: 3.05, transform: row(2), ease: GLIDE },
          { at: 3.15, transform: row(3) },
          { at: 3.7, opacity: 1 },
          { at: 3.9, opacity: 0 },
        ],
        ".sv-d-sel-type": [
          { at: 0, opacity: 0, ...headingBox },
          { at: 1.55, opacity: 0 },
          { at: 1.65, opacity: 1 },
          { at: 2.3, ...headingBox, ease: GLIDE },
          { at: 2.45, ...imageBox },
          { at: 3.1, ...imageBox, ease: GLIDE },
          { at: 3.25, ...buttonBox },
          { at: 3.8, opacity: 1 },
          { at: 4, opacity: 0 },
        ],
      },
    };
  };

  const acts: Record<string, (root: HTMLElement) => SceneSpec> = {
    button,
    heading,
    image,
    copy: () => (state.copy ? remove() : duplicate()),
    spacing,
    layout,
    review,
  };

  return {
    intro,
    next: (root) => {
      const [first, second] = PLAN[state.step % PLAN.length].split("+");

      state.step += 1;

      const act = acts[first](root);

      return second ? together(act, acts[second](root), 0.35) : act;
    },
  };
}

export default function DesignScene({ title }: { title: string }) {
  return (
    <ServiceStage
      n="01"
      title={title}
      direct={direct}
      summary="Illustration: a design team keeps building and refining a landing page hero on a shared canvas — retyping the heading, restyling the button, swapping media and trying layouts."
    >
      <div className="sv-d-grid" />

      <div className="sv-d-panel">
        <span>Layers</span>
        <i className="sv-d-row sv-d-r1">Hero frame</i>
        <i className="sv-d-row sv-d-r2">Heading</i>
        <i className="sv-d-row sv-d-r3">Media</i>
        <i className="sv-d-row sv-d-r4">Button</i>
        <i className="sv-d-row sv-d-r5">Body copy</i>
        <s className="sv-d-hl" />
      </div>

      <div className="sv-d-work">
        <span className="sv-d-name">Hero — Desktop</span>

        <div className="sv-d-board">
          <div className="sv-d-nav">
            <i />
            <span />
            <span />
            <span />
          </div>

          <strong className="sv-d-h">{HEADING}</strong>
          <span className="sv-d-p sv-d-p1" />
          <span className="sv-d-p sv-d-p2" />

          <span className="sv-d-btn">
            <u className="sv-d-bs sv-d-bs-1" />
            <u className="sv-d-bs sv-d-bs-2" />
            <b className="sv-d-bl sv-d-bl-0">Get started</b>
            <b className="sv-d-bl sv-d-bl-1">Get started</b>
            <b className="sv-d-bl sv-d-bl-2">Get started</b>
          </span>

          <span className="sv-d-btn2">
            <b className="sv-d-b2-a">Learn more</b>
            <u className="sv-d-b2c" />
            <b className="sv-d-b2-b">Get started</b>
          </span>

          <div className="sv-d-img">
            <u className="sv-d-fill sv-d-fill-0" />
            <u className="sv-d-fill sv-d-fill-1" />
            <u className="sv-d-fill sv-d-fill-2" />
            <i />
            <span />
            <span />
            <s className="sv-d-ph" />
          </div>
        </div>

        <span className="sv-box sv-d-o1" />
        <span className="sv-box sv-d-o2" />
        <span className="sv-box sv-d-o3" />
        <span className="sv-d-caret" />
        <span className="sv-d-guide" />

        <span className="sv-d-gap sv-d-gap-1">
          <b>8</b>
        </span>
        <span className="sv-d-gap sv-d-gap-2">
          <b>13</b>
        </span>
        <span className="sv-d-gaph">
          <b>6</b>
        </span>

        <span className="sv-d-sel sv-d-sel-layout" />
        <span className="sv-d-sel sv-d-sel-type" />
        <span className="sv-d-sel sv-d-sel-ui" />
        <span className="sv-d-sel sv-d-sel-align" />

        <SceneCursor id="layout" tag="Layout">
          <em className="sv-badge sv-d-size-board">292 × 176</em>
          <em className="sv-badge sv-d-size-btn">60 × 18</em>
          <em className="sv-badge sv-d-tip-layout" />
        </SceneCursor>
        <SceneCursor id="type" tag="Type" />
        <SceneCursor id="ui" tag="UI">
          <em className="sv-badge sv-d-size-img">102 × 120</em>
          <em className="sv-badge sv-d-tip-ui" />
        </SceneCursor>
        <SceneCursor id="align" tag="Align">
          <em className="sv-badge sv-d-tip-align" />
        </SceneCursor>
      </div>
    </ServiceStage>
  );
}
