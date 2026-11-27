import SceneCursor from "@/components/services/SceneCursor";
import ServiceStage from "@/components/services/ServiceStage";
import {
  GLIDE,
  HIDDEN_TEXT,
  SHOWN_TEXT,
  add,
  createCrew,
  cursor,
  eraseText,
  fade,
  flash,
  reveal,
  typeOn,
  type Director,
  type SceneKey,
  type SceneSpec,
} from "@/lib/scene";

type Token = [
  kind: "k" | "f" | "t" | "s" | "p" | "x",
  text: string,
  slot?: string,
];

type File = {
  name: string;
  lines: Token[][];
};

/* The session moves through real files. Each one changes something the
   preview can show: the component, its styles, a refactor, the props it is
   given, and the test that guards it. */
const FILES: File[] = [
  {
    name: "Card.tsx",
    lines: [
      [["k", "export function "], ["f", "Card"], ["p", "({ "], ["x", "title"], ["p", " }: "], ["t", "Props"], ["p", ") {"]],
      [["k", "  const "], ["p", "["], ["x", "saved, setSaved"], ["p", "] = "], ["f", "useState"], ["p", "("], ["k", "false"], ["p", ");"]],
      [["k", "  return "], ["p", "("]],
      [["p", "    <"], ["t", "article"], ["x", " className"], ["p", "="], ["s", '"card"'], ["p", ">"]],
      [["p", "      <"], ["t", "h3"], ["p", ">{"], ["x", "title"], ["p", "}</"], ["t", "h3"], ["p", ">"]],
      [["p", "      <"], ["t", "Button"], ["x", " onClick"], ["p", "={() => "], ["f", "setSaved"], ["p", "(!"], ["x", "saved"], ["p", ")}>"]],
      [["p", "        {"], ["x", "saved"], ["p", " ? "], ["s", '"Saved"'], ["p", " : "], ["s", '"Save"'], ["p", "}"]],
      [["p", "      </"], ["t", "Button"], ["p", ">"]],
      [["p", "    </"], ["t", "article"], ["p", ">"]],
      [["p", "  );"]],
      [["p", "}"]],
    ],
  },
  {
    name: "card.css",
    lines: [
      [["t", ".card"], ["p", " {"]],
      [["x", "  border-radius"], ["p", ": "], ["s", "14", "radius"], ["s", "px"], ["p", ";"]],
      [["x", "  padding"], ["p", ": "], ["s", "12px"], ["p", ";"]],
      [["x", "  box-shadow"], ["p", ": "], ["s", "0 8px 24px rgb(0 0 0 / .08)"], ["p", ";"]],
      [["p", "}"]],
    ],
  },
  {
    name: "useSaved.ts",
    lines: [
      [["k", "export function "], ["f", "useSaved"], ["p", "("], ["x", "initial"], ["p", " = "], ["k", "false"], ["p", ") {"]],
      [["k", "  const "], ["p", "["], ["x", "saved, setSaved"], ["p", "] = "], ["f", "useState"], ["p", "("], ["x", "initial"], ["p", ");"]],
      [["k", "  const "], ["x", "toggle"], ["p", " = () => "], ["f", "setSaved"], ["p", "(("], ["x", "s"], ["p", ") => !"], ["x", "s"], ["p", ");"]],
      [["k", "  return "], ["p", "{ "], ["x", "saved, toggle"], ["p", " };"]],
      [["p", "}"]],
    ],
  },
  {
    name: "Card.tsx",
    lines: [
      [["k", "export function "], ["f", "Card"], ["p", "({ "], ["x", "title, tag"], ["p", " }: "], ["t", "Props"], ["p", ") {"]],
      [["k", "  const "], ["p", "{ "], ["x", "saved, toggle"], ["p", " } = "], ["f", "useSaved"], ["p", "();"]],
      [["k", "  return "], ["p", "("]],
      [["p", "    <"], ["t", "article"], ["x", " className"], ["p", "="], ["s", '"card"'], ["x", " data-tag"], ["p", "={"], ["x", "tag"], ["p", "}>"]],
      [["p", "      <"], ["t", "h3"], ["p", ">{"], ["x", "title"], ["p", "}</"], ["t", "h3"], ["p", ">"]],
      [["p", "      <"], ["t", "Button"], ["x", " onClick"], ["p", "={"], ["x", "toggle"], ["p", "}>"]],
      [["p", "        {"], ["x", "saved"], ["p", " ? "], ["s", '"Saved ✓"'], ["p", " : "], ["s", '"Save"'], ["p", "}"]],
      [["p", "      </"], ["t", "Button"], ["p", ">"]],
      [["p", "    </"], ["t", "article"], ["p", ">"]],
      [["p", "  );"]],
      [["p", "}"]],
    ],
  },
  {
    name: "App.tsx",
    lines: [
      [["k", "import "], ["p", "{ "], ["x", "Card"], ["p", " } "], ["k", "from "], ["s", '"./Card"'], ["p", ";"]],
      [["k", "export default function "], ["f", "App"], ["p", "() {"]],
      [["k", "  return "], ["p", "<"], ["t", "Card"], ["x", " title"], ["p", "="], ["s", '"Q3 roadmap"', "title"], ["x", " tag"], ["p", "="], ["s", '"New"', "tag"], ["p", " />;"]],
      [["p", "}"]],
    ],
  },
  {
    name: "Card.test.tsx",
    lines: [
      [["f", "it"], ["p", "("], ["s", '"toggles the saved state"'], ["p", ", "], ["k", "async "], ["p", "() => {"]],
      [["f", "  render"], ["p", "(<"], ["t", "Card"], ["x", " title"], ["p", "="], ["s", '"Weekly report"'], ["p", " />);"]],
      [["k", "  await "], ["x", "user"], ["p", "."], ["f", "click"], ["p", "("], ["f", "getByRole"], ["p", "("], ["s", '"button"'], ["p", "));"]],
      [["f", "  expect"], ["p", "("], ["f", "getByText"], ["p", "("], ["s", '"Saved ✓"'], ["p", "))."], ["f", "toBeVisible"], ["p", "();"]],
      [["p", "});"]],
    ],
  },
];

const CSS = 1;
const HOOK = 2;
const CARD = 3;
const APP = 4;
const TEST = 5;
const PLAN = [CSS, HOOK, CARD, APP, TEST];

const RADII = [14, 10, 18];
const TITLES = ["Q3 roadmap", "Design review", "Weekly report"];
const TAGS = ["New", "Draft", "Live"];

const CHAR = 0.012;
const LINE_GAP = 0.05;
const PREVIEW = "scale(.7)";
const POP = { opacity: 0, transform: "scale(.94)" };
const SAVE: [x: number, y: number] = [208, 150];

const length = (line: Token[]) =>
  line.reduce((total, [, value]) => total + value.length, 0);

function chip(at: number, x: number, y: number): SceneKey[] {
  return [
    { at, opacity: 0, transform: "translate(0px, 0px) scale(1)" },
    { at: at + 0.1, opacity: 1, transform: "translate(0px, 0px) scale(1)", ease: GLIDE },
    { at: at + 0.55, opacity: 1, transform: `translate(${x}px, ${y}px) scale(1)` },
    { at: at + 0.7, opacity: 0, transform: `translate(${x}px, ${y}px) scale(.6)` },
  ];
}

// Types a file line by line with a caret; returns when each line ends.
function typeFile(tracks: SceneSpec["tracks"], file: number, start: number) {
  const ends: number[] = [];
  let time = start;

  FILES[file].lines.forEach((line, index) => {
    const chars = length(line);
    const end = time + chars * CHAR;
    const row = `.sv-c-file-${file} .sv-c-ln-${index + 1}`;

    tracks[`${row} > code`] = typeOn(time, end - time, chars);
    tracks[`${row} > i`] = reveal(time, 0.05);
    tracks[`${row} > s`] = [
      { at: time, opacity: 0 },
      { at: time, opacity: 1 },
      { at: time, transform: "translateX(0ch)", ease: `steps(${chars}, end)` },
      { at: end, transform: `translateX(${chars}ch)` },
      { at: end + LINE_GAP, transform: `translateX(${chars}ch)` },
      { at: end + LINE_GAP, opacity: 1 },
      { at: end + LINE_GAP, opacity: 0 },
    ];

    ends.push(end);
    time = end + LINE_GAP;
  });

  return { ends, done: time };
}

function text(root: HTMLElement, selector: string, value: string) {
  root.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function toggleSaved(root: HTMLElement) {
  const view = root.querySelector<HTMLElement>(".sv-c-view")!;

  view.dataset.saved = String(view.dataset.saved !== "true");
}

function buildIntro(): SceneSpec {
  const tracks: SceneSpec["tracks"] = {};
  const { ends, done: compiled } = typeFile(tracks, 0, 0.5);
  const [article, heading, button] = [ends[3], ends[4], ends[7]];
  const click = compiled + 2;

  Object.assign(tracks, {
    ".sv-c-card": reveal(article, 0.4, POP),
    ".sv-c-chip-1": chip(article - 0.1, 206, 34),
    ".sv-c-title, .sv-c-meta": reveal(heading, 0.35),
    ".sv-c-chip-2": chip(heading - 0.1, 176, 32),
    ".sv-c-btn": reveal(button, 0.35, POP),
    ".sv-c-chip-3": chip(button - 0.1, 172, 50),
    ".sv-c-hmr": [
      ...flash(article, article + 0.25, 0.1),
      ...flash(heading, heading + 0.25, 0.1),
      ...flash(button, button + 0.25, 0.1),
    ],
    ".sv-c-st1": [
      { at: 0, opacity: 1 },
      { at: compiled, opacity: 1 },
      { at: compiled + 0.2, opacity: 0 },
    ],
    ".sv-c-st2": reveal(compiled + 0.2, 0.2),

    // The preview takes over once the component compiles.
    ".sv-c-editor": [
      { at: 0, opacity: 1 },
      { at: compiled + 0.4, opacity: 1 },
      { at: compiled + 1.2, opacity: 0.5 },
    ],
    ".sv-c-view": [
      { at: 0, transform: PREVIEW },
      { at: compiled + 0.4, transform: PREVIEW, ease: GLIDE },
      { at: compiled + 1.3, transform: "none" },
    ],

    // A visitor saves the card: the state in the code is live.
    ".sv-cur-visitor": cursor([
      [compiled + 1.2, 330, 170],
      [click - 0.1, ...SAVE],
      [click, ...SAVE, 0.82],
      [click + 0.15, ...SAVE],
      [click + 0.8, ...SAVE],
      [click + 1.2, 262, 214],
    ]),
  });

  return {
    duration: click + 1.4,
    hold: 0.8,
    tracks,
    prepare: (root) => {
      root.querySelector<HTMLElement>(".sv-c-view")!.dataset.saved = "false";
      text(root, ".sv-c-tab", FILES[0].name);
      text(root, ".sv-c-st2", "✓ compiled");
      text(root, ".sv-c-title", "Weekly report");
      text(root, '[data-slot="radius"]', String(RADII[0]));
      text(root, '[data-slot="title"]', `"${TITLES[0]}"`);
      text(root, '[data-slot="tag"]', `"${TAGS[0]}"`);
      text(root, ".sv-c-tag", TAGS[0]);
    },
    cues: [[click + 0.05, toggleSaved]],
  };
}

function direct(): Director {
  const crew = createCrew({ visitor: [262, 214] });
  const state = {
    step: 0,
    file: 0,
    radius: 8,
    styled: 0,
    named: 0,
    tagged: false,
    passed: 3,
  };

  const session = (root: HTMLElement): SceneSpec => {
    const file = PLAN[state.step % PLAN.length];
    const previous = state.file;
    const tracks: SceneSpec["tracks"] = {};
    const cues: SceneSpec["cues"] = [];
    const prepares: ((scene: HTMLElement) => void)[] = [];

    state.step += 1;
    state.file = file;

    // Focus the editor and open the next file.
    add(tracks, ".sv-c-view", [
      { at: 0, transform: "none", ease: GLIDE },
      { at: 0.7, transform: PREVIEW },
    ]);
    add(tracks, ".sv-c-editor", fade(0, 0.5, 1, 0.6));
    add(tracks, ".sv-c-st2", fade(0, 1, 0, 0.25));
    add(tracks, ".sv-c-st1", fade(0.25, 0, 1, 0.2));
    add(tracks, `.sv-c-file-${previous}`, fade(0.6, 1, 0, 0.25));
    add(tracks, ".sv-c-tab", [...fade(0.6, 1, 0, 0.18), ...fade(0.82, 0, 1, 0.18)]);
    add(tracks, `.sv-c-file-${file}`, [
      { at: 0, opacity: 0 },
      { at: 0.9, opacity: 0 },
      { at: 0.92, opacity: 1 },
    ]);
    cues.push([0.8, (scene) => text(scene, ".sv-c-tab", FILES[file].name)]);

    const { done: compiled } = typeFile(tracks, file, 1);
    const shown = compiled + 1.2;
    let status = "✓ compiled";
    let demo = false;

    // Save: the preview grows back and hot-reloads the change.
    add(tracks, ".sv-c-st1", fade(compiled, 1, 0, 0.2));
    add(tracks, ".sv-c-st2", fade(compiled + 0.2, 0, 1, 0.2));
    add(tracks, ".sv-c-editor", [
      { at: compiled + 0.3, opacity: 1 },
      { at: compiled + 1, opacity: 0.5 },
    ]);
    add(tracks, ".sv-c-view", [
      { at: compiled + 0.3, transform: PREVIEW, ease: GLIDE },
      { at: compiled + 1.1, transform: "none" },
    ]);
    add(tracks, ".sv-c-hmr", flash(shown, shown + 0.3, 0.1));

    if (file === CSS) {
      const radius = RADII[state.styled % RADII.length];
      const shadow = "0 8px 24px rgba(0, 0, 0, 0.08)";

      prepares.push((scene) => text(scene, '[data-slot="radius"]', String(radius)));
      add(tracks, ".sv-c-card", [
        {
          at: shown,
          borderRadius: `${state.radius}px`,
          boxShadow: state.styled ? shadow : "0 0 0 rgba(0, 0, 0, 0)",
          ease: GLIDE,
        },
        { at: shown + 0.5, borderRadius: `${radius}px`, boxShadow: shadow },
      ]);
      state.styled += 1;
      state.radius = radius;
      status = "✓ styles updated";
    }

    if (file === HOOK) demo = true;

    if (file === CARD) {
      add(tracks, ".sv-c-tag", state.tagged
        ? [
            { at: shown, transform: "scale(1)" },
            { at: shown + 0.15, transform: "scale(1.15)" },
            { at: shown + 0.4, transform: "scale(1)" },
          ]
        : [
            { at: 0, opacity: 0, transform: "scale(.6)" },
            { at: shown, opacity: 0, transform: "scale(.6)" },
            { at: shown + 0.35, opacity: 1, transform: "scale(1)" },
          ]);
      state.tagged = true;
      demo = true;
    }

    if (file === APP) {
      const title = root.querySelector(".sv-c-title")!.textContent ?? "";
      const name = TITLES[state.named % TITLES.length];
      const tag = TAGS[state.named % TAGS.length];
      const typed = shown + 0.45;

      state.named += 1;
      prepares.push((scene) => {
        text(scene, '[data-slot="title"]', `"${name}"`);
        text(scene, '[data-slot="tag"]', `"${tag}"`);
      });
      add(tracks, ".sv-c-title", [
        ...eraseText(shown, 0.3, title.length),
        { at: typed, clipPath: HIDDEN_TEXT, ease: `steps(${name.length}, end)` },
        { at: typed + name.length * 0.035, clipPath: SHOWN_TEXT },
      ]);
      add(tracks, ".sv-c-tag", [...fade(shown, 1, 0, 0.15), ...fade(typed, 0, 1, 0.2)]);
      cues.push([
        shown + 0.35,
        (scene) => {
          text(scene, ".sv-c-title", name);
          text(scene, ".sv-c-tag", tag);
        },
      ]);
    }

    if (file === TEST) {
      state.passed += 1;
      status = `✓ ${state.passed} passed`;
      demo = true;
    }

    cues.push([compiled + 0.1, (scene) => text(scene, ".sv-c-st2", status)]);

    let duration = shown + 1.4;

    // A visitor tries the card, proving the change still works.
    if (demo) {
      const click = shown + 0.9;

      tracks[".sv-cur-visitor"] = crew.walk("visitor", [
        [click - 0.4, ...SAVE],
        [click, ...SAVE, 0.82],
        [click + 0.15, ...SAVE],
        [click + 0.7, 236, 176],
      ]);
      cues.push([click + 0.05, toggleSaved]);
      duration = click + 1.6;
    }

    return {
      duration,
      // A visible change in the preview reads best with a beat to land.
      hold: demo ? 0.5 : 0.9,
      tracks,
      cues,
      prepare: (scene) => prepares.forEach((run) => run(scene)),
    };
  };

  return { intro: buildIntro(), next: session };
}

export default function CodeScene({ title }: { title: string }) {
  return (
    <ServiceStage
      n="02"
      title={title}
      direct={direct}
      summary="Illustration: an ongoing front-end session. A React component is written, styled, refactored into a hook, given new props and tested, while a live preview updates and stays clickable."
    >
      <div className="sv-c-editor">
        <div className="sv-c-tabs">
          <span className="sv-c-tab">{FILES[0].name}</span>
          <span className="sv-c-st sv-c-st1">● editing</span>
          <span className="sv-c-st sv-c-st2">✓ compiled</span>
        </div>

        {FILES.map((file, index) => (
          <div key={index} className={`sv-c-file sv-c-file-${index}`}>
            {file.lines.map((line, row) => (
              <div
                key={row}
                className={`sv-c-ln sv-c-ln-${row + 1}`}
                style={{ top: 22 + row * 12 }}
              >
                <i>{row + 1}</i>
                <code>
                  {line.map(([kind, value, slot], token) => (
                    <span key={token} className={kind} data-slot={slot}>
                      {value}
                    </span>
                  ))}
                </code>
                <s />
              </div>
            ))}
          </div>
        ))}
      </div>

      <span className="sv-c-chip sv-c-chip-1">{"<article>"}</span>
      <span className="sv-c-chip sv-c-chip-2">{"<h3>"}</span>
      <span className="sv-c-chip sv-c-chip-3">{"<Button>"}</span>

      <div className="sv-c-view" data-saved="false">
        <div className="sv-c-bar">
          <i />
          <i />
          <i />
          <span className="sv-c-url">localhost:5173</span>
          <em className="sv-c-hmr" />
        </div>

        <div className="sv-c-card">
          <span className="sv-c-thumb" />
          <span className="sv-c-tag">{TAGS[0]}</span>
          <strong className="sv-c-title">Weekly report</strong>
          <span className="sv-c-meta" />

          <button
            type="button"
            className="sv-c-btn"
            tabIndex={-1}
            onClick={(event) => {
              const view = event.currentTarget.closest<HTMLElement>(".sv-c-view")!;

              view.dataset.saved = String(view.dataset.saved !== "true");
            }}
          >
            <s />
            <b className="sv-c-save">Save</b>
            <b className="sv-c-saved">Saved ✓</b>
          </button>
        </div>
      </div>

      <SceneCursor id="visitor" />
    </ServiceStage>
  );
}
