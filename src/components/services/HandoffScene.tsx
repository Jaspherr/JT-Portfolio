import SceneCursor from "@/components/services/SceneCursor";
import ServiceStage from "@/components/services/ServiceStage";
import {
  GLIDE,
  createCrew,
  cursor,
  drawBox,
  fade,
  flash,
  reveal,
  type Director,
  type SceneKey,
  type SceneSpec,
} from "@/lib/scene";

// The build happens in a small window on the right before it is delivered,
// centred on the package's line of travel (canvas y 77).
const WORKBENCH = "translate(130px, 22px) scale(.6)";
const UNBUILT = "grayscale(1) opacity(.55)";
const BUILT = "grayscale(0) opacity(1)";
const SETTLED = "translate(0px, 0px) scale(1)";
const PIECES: [selector: string, x: number, y: number][] = [
  [".sv-m-nav", 0, 40],
  [".sv-m-hero", 48, 4],
  [".sv-m-img", -50, 5],
  [".sv-m-cards", 0, -30],
];
// From the drop point to the nav button, the hero button and the media.
const TOKENS: [x: number, y: number][] = [
  [47, -23],
  [-44, 17],
  [32, 9],
];

function token(at: number, x: number, y: number): SceneKey[] {
  return [
    { at, opacity: 0, transform: "translate(0px, 0px) scale(1)" },
    { at: at + 0.1, opacity: 1, transform: "translate(0px, 0px) scale(1)", ease: GLIDE },
    { at: at + 0.5, opacity: 1, transform: `translate(${x}px, ${y}px) scale(1)` },
    { at: at + 0.75, opacity: 0, transform: `translate(${x}px, ${y}px) scale(2.4)` },
  ];
}

// Package, transfer and unpack, shared by the first delivery and every one after.
function handoff(at: number): SceneSpec["tracks"] {
  const t = (time: number) => at + time;

  return {
    ".sv-h-art": [
      { at: t(1.5), opacity: 1, transform: SETTLED, ease: GLIDE },
      { at: t(2.1), opacity: 0, transform: "translate(0px, 1px) scale(.3)" },
    ],
    ".sv-h-tok": [
      { at: t(1.55), opacity: 1, transform: SETTLED, ease: GLIDE },
      { at: t(2.1), opacity: 0, transform: "translate(18px, -46px) scale(.3)" },
    ],
    ".sv-h-pkg": [
      { at: 0, opacity: 0, transform: "translateX(0px) scale(.6)" },
      { at: t(1.85), opacity: 0, transform: "translateX(0px) scale(.6)" },
      { at: t(2.3), opacity: 1, transform: "translateX(0px) scale(1)" },
      { at: t(3.3), transform: "translateX(0px) scale(1)", ease: GLIDE },
      { at: t(5), opacity: 1, transform: "translateX(183px) scale(1)" },
      { at: t(5.4), opacity: 0, transform: "translateX(183px) scale(.5)" },
    ],
    ".sv-h-box > s": [
      { at: 0, transform: "scaleX(0)" },
      { at: t(2.3), transform: "scaleX(0)" },
      { at: t(2.65), transform: "scaleX(1)" },
    ],
    ".sv-h-lbl": flash(t(2.5), t(3.2)),
    ".sv-h-path": flash(t(2.8), t(5.2)),
    ".sv-h-path path": [
      { at: 0, strokeDashoffset: 1 },
      { at: t(2.9), strokeDashoffset: 1, ease: GLIDE },
      { at: t(3.5), strokeDashoffset: 0 },
    ],
    ".sv-h-box": [
      { at: 0, transform: "translateY(0px)" },
      { at: t(3.3), transform: "translateY(0px)", ease: "cubic-bezier(.3, .6, .6, 1)" },
      { at: t(4.15), transform: "translateY(-17px)", ease: "cubic-bezier(.4, 0, .7, .4)" },
      { at: t(5), transform: "translateY(5px)" },
    ],
    ".sv-h-gate": [
      { at: t(2.9), opacity: 0 },
      { at: t(3.2), opacity: 0.55 },
      { at: t(4), opacity: 0.55, transform: "scale(1)" },
      { at: t(4.2), opacity: 1, transform: "scale(1.3)" },
      { at: t(4.5), opacity: 0.55, transform: "scale(1)" },
      { at: t(5.2), opacity: 0.55 },
      { at: t(5.5), opacity: 0 },
    ],
    ".sv-h-chip": flash(t(3.8), t(4.8)),
    ".sv-h-f1": [
      { at: 0, opacity: 1 },
      { at: t(4.05), opacity: 1 },
      { at: t(4.3), opacity: 0 },
    ],
    ".sv-h-f2": [
      { at: 0, opacity: 0 },
      { at: t(4.05), opacity: 0 },
      { at: t(4.3), opacity: 1 },
    ],
    ".sv-h-l1 > s": [
      { at: t(3.3), transform: "scaleX(0)", ease: GLIDE },
      { at: t(5), transform: "scaleX(1)" },
    ],
    ".sv-h-s2": [
      { at: t(4.9), opacity: 0.3 },
      { at: t(5.2), opacity: 1 },
    ],
    ".sv-h-css": flash(t(6), t(6.9)),
    ".sv-h-l2 > s": [
      { at: t(5.3), transform: "scaleX(0)", ease: "linear" },
      { at: t(8), transform: "scaleX(1)" },
    ],
    ".sv-h-live": reveal(t(8.1), 0.3),
    ".sv-h-s3": [
      { at: t(8), opacity: 0.3 },
      { at: t(8.3), opacity: 1 },
    ],
    ".sv-h-s3 > em": [
      { at: 0, opacity: 0, transform: "scale(.4)" },
      { at: t(8.15), opacity: 0, transform: "scale(.4)" },
      { at: t(8.6), opacity: 1, transform: "none" },
    ],
  };
}

const intro: SceneSpec = (() => {
  const tracks: SceneSpec["tracks"] = {
    ...handoff(0),

    // The finished design is selected and grouped.
    ".sv-h-artname": [
      { at: 0, opacity: 1 },
      { at: 1.4, opacity: 1 },
      { at: 1.6, opacity: 0 },
    ],
    ".sv-cur-handoff": cursor([
      [0.2, -8, 53],
      [0.5, 8, 29],
      [0.6, 8, 29, 0.82],
      [1.3, 128, 141, 0.82],
      [1.4, 128, 141],
      [1.9, 146, 123],
      [2.3, 170, 214],
    ]),
    ".sv-h-sel": drawBox(0.6, 0.7, 1.5),

    // Its contents are assembled into components, then styled by the tokens.
    ".sv-h-site": [
      { at: 0, opacity: 0, transform: WORKBENCH },
      { at: 2.8, opacity: 0 },
      { at: 3.2, opacity: 1 },
      { at: 7.1, transform: WORKBENCH, ease: GLIDE },
      { at: 8, transform: "none" },
    ],
    ".sv-h-page": [
      { at: 0, filter: UNBUILT },
      { at: 6.45, filter: UNBUILT },
      { at: 7, filter: BUILT },
    ],
  };

  tracks[".sv-h-art"].unshift({ at: 0, opacity: 1, transform: SETTLED });
  tracks[".sv-h-tok"].unshift({ at: 0, opacity: 1, transform: SETTLED });
  tracks[".sv-h-l1 > s"].unshift({ at: 0, transform: "scaleX(0)" });
  tracks[".sv-h-l2 > s"].unshift({ at: 0, transform: "scaleX(0)" });
  tracks[".sv-h-s2"].unshift({ at: 0, opacity: 0.3 });
  tracks[".sv-h-s3"].unshift({ at: 0, opacity: 0.3 });

  PIECES.forEach(([selector, x, y], index) => {
    tracks[`.sv-h-site ${selector}`] = reveal(5.25 + index * 0.2, 0.55, {
      opacity: 0,
      transform: `translate(${x}px, ${y}px) scale(.5)`,
    });
  });

  TOKENS.forEach(([x, y], index) => {
    tracks[`.sv-h-td-${index + 1}`] = token(6 + index * 0.1, x, y);
  });

  return {
    duration: 8.9,
    // Delivered: the live site holds for a moment before the next run.
    hold: 1.3,
    tracks,
    prepare: (root) => {
      text(root, ".sv-h-artname", "Landing — final");
      text(root, ".sv-h-lbl b", "Design system");
      text(root, ".sv-h-css", "--brand: #4D2D1A;");
      text(root, ".sv-h-ver", "v1.0");
      root.querySelectorAll<HTMLElement>(".sv-f").forEach((section) => {
        section.dataset.f = "pricing";
      });
    },
  };
})();

/* After the first launch the pipeline keeps running: each new feature is
   designed, packaged, handed to development, assembled into the live page,
   validated and shipped as the next version. */

type Feature = {
  kind: string;
  name: string;
  token: string;
};

const FEATURES: Feature[] = [
  { kind: "pricing", name: "Pricing", token: "--radius: 10px;" },
  { kind: "reviews", name: "Testimonials", token: "--space-4: 16px;" },
  { kind: "signup", name: "Sign-up form", token: "--accent: #4D2D1A;" },
];

// Where the design tokens land on the new section while it is on the workbench.
const SECTION_TOKENS: [x: number, y: number][] = [
  [-30, 38],
  [0, 48],
  [30, 42],
];

const ENTER: [x: number, y: number][] = [
  [-40, 10],
  [0, 26],
  [40, 10],
];

function text(root: HTMLElement, selector: string, value: string) {
  root.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function direct(): Director {
  const crew = createCrew({ handoff: [170, 214] });
  const state = { step: 0, version: 0, scrolled: false };

  const release = (): SceneSpec => {
    const feature = FEATURES[state.step % FEATURES.length];
    const D = 0.8;
    const t = (time: number) => D + time;
    const tracks = handoff(D);

    state.step += 1;
    state.version += 1;

    const version = `v1.${state.version}`;

    Object.assign(tracks, {
      // The live site steps back to the workbench and a new run begins.
      ".sv-h-site": [
        { at: 0, transform: "none", ease: GLIDE },
        { at: 0.9, transform: WORKBENCH },
        { at: t(7.1), transform: WORKBENCH, ease: GLIDE },
        { at: t(8), transform: "none" },
      ],
      ".sv-h-l1 > s": [
        { at: 0.2, transform: "scaleX(1)", ease: GLIDE },
        { at: 0.7, transform: "scaleX(0)" },
        ...tracks[".sv-h-l1 > s"],
      ],
      ".sv-h-l2 > s": [
        { at: 0.2, transform: "scaleX(1)", ease: GLIDE },
        { at: 0.7, transform: "scaleX(0)" },
        ...tracks[".sv-h-l2 > s"],
      ],
      ".sv-h-s2": [...fade(0.3, 1, 0.3), ...tracks[".sv-h-s2"]],
      ".sv-h-s3": [...fade(0.3, 1, 0.3), ...tracks[".sv-h-s3"]],
      ".sv-h-s3 > em": [
        { at: 0.3, opacity: 1, transform: "none" },
        { at: 0.6, opacity: 0, transform: "scale(.4)" },
        ...tracks[".sv-h-s3 > em"].slice(1),
      ],
      ".sv-h-live": [{ at: 0, opacity: 1 }, { at: t(8.1), opacity: 1 }],

      // The next feature is prepared on the design side.
      ".sv-h-art": [
        { at: 0, opacity: 0, transform: "translate(0px, 0px) scale(.92)" },
        { at: 0.5, opacity: 0, transform: "translate(0px, 0px) scale(.92)" },
        { at: 1, opacity: 1, transform: SETTLED },
        ...tracks[".sv-h-art"],
      ],
      ".sv-h-art .sv-m": [{ at: 0, opacity: 0 }],
      ".sv-h-art .sv-f": [{ at: 0, opacity: 1 }],
      ".sv-h-tok": [
        { at: 0, opacity: 0, transform: SETTLED },
        ...fade(0.8, 0, 1, 0.3),
        ...tracks[".sv-h-tok"],
      ],
      ".sv-h-artname": [...fade(0.6, 0, 1, 0.2), ...fade(t(0.6), 1, 0, 0.2)],
      ".sv-cur-handoff": crew.walk("handoff", [
        [t(0.5), 8, 29],
        [t(0.6), 8, 29, 0.82],
        [t(1.3), 128, 141, 0.82],
        [t(1.4), 128, 141],
        [t(1.9), 146, 123],
      ]),
      ".sv-h-sel": drawBox(t(0.6), 0.7, t(1.5)),

      // Development assembles it into the page, then the tokens style it.
      ".sv-h-page": [{ at: 0, filter: BUILT }],
      ".sv-h-page .sv-f": [
        { at: t(4.9), filter: BUILT },
        { at: t(4.95), filter: UNBUILT },
        { at: t(6.45), filter: UNBUILT },
        { at: t(7), filter: BUILT },
      ],
      ".sv-h-check": flash(t(7), t(7.8)),
      ".sv-h-ver": [
        { at: t(8.1), transform: "scale(1)" },
        { at: t(8.25), transform: "scale(1.2)" },
        { at: t(8.55), transform: "scale(1)" },
      ],
    });

    for (let piece = 1; piece <= 3; piece += 1) {
      const [x, y] = ENTER[piece - 1];
      const start = t(5.25) + piece * 0.15;

      tracks[`.sv-h-art .sv-f > i:nth-child(${piece})`] = [
        { at: 0, opacity: 0, transform: "scale(.7)" },
        { at: 0.75 + piece * 0.12, opacity: 0, transform: "scale(.7)" },
        { at: 1.05 + piece * 0.12, opacity: 1, transform: "none" },
      ];
      // The live release stays up until the new section replaces it.
      tracks[`.sv-h-page .sv-f > i:nth-child(${piece})`] = [
        { at: t(4.9), opacity: state.scrolled ? 1 : 0, transform: "none" },
        { at: t(5.1), opacity: 0 },
        { at: start, opacity: 0, transform: `translate(${x}px, ${y}px) scale(.5)` },
        { at: start + 0.55, opacity: 1, transform: "none" },
      ];
    }

    SECTION_TOKENS.forEach(([x, y], index) => {
      tracks[`.sv-h-td-${index + 1}`] = token(t(6) + index * 0.1, x, y);
    });

    // The first new section scrolls the page down to where it lands.
    if (!state.scrolled) {
      tracks[".sv-h-scroll"] = [
        { at: t(5), transform: "translateY(0px)", ease: GLIDE },
        { at: t(5.6), transform: "translateY(-48px)" },
      ];
      state.scrolled = true;
    }

    return {
      duration: t(9.5),
      hold: 1.3,
      tracks,
      prepare: (root) => {
        text(root, ".sv-h-artname", `${feature.name} — final`);
        text(root, ".sv-h-lbl b", feature.name);
        text(root, ".sv-h-css", feature.token);
        root.querySelector<HTMLElement>(".sv-h-art .sv-f")!.dataset.f = feature.kind;
      },
      cues: [
        [
          t(5.15),
          (root) => {
            root.querySelector<HTMLElement>(".sv-h-page .sv-f")!.dataset.f = feature.kind;
          },
        ],
        [t(8.1), (root) => text(root, ".sv-h-ver", version)],
      ],
    };
  };

  return { intro, next: release };
}

function MiniPage() {
  return (
    <div className="sv-m">
      <div className="sv-m-nav">
        <i />
        <span />
        <span />
        <span />
        <b />
      </div>

      <div className="sv-m-hero">
        <i />
        <i />
        <span />
        <b />
      </div>

      <div className="sv-m-img" />

      <div className="sv-m-cards">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="sv-f" data-f="pricing">
      <i />
      <i />
      <i />
    </div>
  );
}

export default function HandoffScene({ title }: { title: string }) {
  return (
    <ServiceStage
      n="04"
      title={title}
      direct={direct}
      summary="Illustration: a continuous delivery pipeline. Each new feature is designed, packaged as a design system, handed to development, assembled into the live site, validated and shipped as the next version."
    >
      <span className="sv-h-artname">Landing — final</span>

      <div className="sv-h-art">
        <MiniPage />
        <Section />
      </div>

      <div className="sv-h-tok">
        <i />
        <i />
        <i />
        <i />
        <b>Aa</b>
        <span>8 · 16 · 24</span>
      </div>

      <span className="sv-box sv-h-sel" />

      <svg className="sv-h-path" viewBox="0 0 320 200">
        <path pathLength={1} d="M70 77Q160 41 250 82" />
      </svg>

      <span className="sv-h-gate" />
      <span className="sv-h-chip">tokens → components</span>

      <div className="sv-h-site">
        <div className="sv-h-bar">
          <i />
          <i />
          <i />
          <span>yourproduct.com</span>
          <em className="sv-h-ver">v1.0</em>
          <em className="sv-h-live">Live</em>
        </div>

        <div className="sv-h-page">
          <div className="sv-h-scroll">
            <MiniPage />
            <Section />
          </div>
        </div>
      </div>

      <span className="sv-h-css">--brand: #4D2D1A;</span>
      <span className="sv-h-check">✓ a11y · ✓ responsive</span>

      <div className="sv-h-pkg">
        <div className="sv-h-box">
          <i />
          <i />
          <span className="sv-h-f1">
            <i />
            <i />
            <i />
          </span>
          <span className="sv-h-f2">{"</>"}</span>
          <s />
        </div>
      </div>

      <div className="sv-h-lbl">
        <b>Design system</b>
        <span>Ready for development</span>
      </div>

      <span className="sv-h-td sv-h-td-1" />
      <span className="sv-h-td sv-h-td-2" />
      <span className="sv-h-td sv-h-td-3" />

      <div className="sv-h-steps">
        <span className="sv-h-st sv-h-s1">
          <i />
          <b>Design</b>
        </span>
        <span className="sv-h-ln sv-h-l1">
          <s />
        </span>
        <span className="sv-h-st sv-h-s2">
          <i />
          <b>Development</b>
        </span>
        <span className="sv-h-ln sv-h-l2">
          <s />
        </span>
        <span className="sv-h-st sv-h-s3">
          <i />
          <em>✓</em>
          <b>Delivered</b>
        </span>
      </div>

      <SceneCursor id="handoff" tag="Handoff" />
    </ServiceStage>
  );
}
