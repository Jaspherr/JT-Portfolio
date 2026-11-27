import type { MouseEvent } from "react";

import SceneCursor from "@/components/services/SceneCursor";
import ServiceStage from "@/components/services/ServiceStage";
import {
  GLIDE,
  createCrew,
  cursor,
  fade,
  flash,
  reveal,
  typeOn,
  type Director,
  type SceneKey,
  type SceneSpec,
} from "@/lib/scene";

const BRIEF = "Clean dashboard, responsive nav, actionable analytics";
const CONCEPTS = ["a", "b", "c"] as const;
const OVERVIEW_BARS = [14, 22, 18, 30, 26, 36, 24, 32, 40];
const INSIGHT_BARS = [22, 30, 26, 40, 34, 56, 44];
// Bars are drawn at twice these heights in the full-size charts.
const BAR_SCALE = 2;
const CHART_H = 96;
// Where review notes are pinned: under the middle summary card, flush with its
// right edge. The note's pointed corner sits on this point.
const NOTE_AT: [number, number] = [190, 69];

// The chosen concept sits where the prototype will grow from: the tiles'
// row is 73px below the prototype's top, and a tile is .4135 of its size.
const TILE_DY = 73;
const FROM_CONCEPT = `translate(61px, ${TILE_DY}px) scale(.4135)`;
const TO_PROTOTYPE = `translate(-61px, -${TILE_DY}px) scale(2.4186)`;
const BLOCK = { opacity: 0, transform: "scale(.6)" };
const BAR = "scaleY(0)";

const TREND = OVERVIEW_BARS.map(
  (height, index) =>
    `${index ? "L" : "M"}${12 + index * 20} ${CHART_H - height * BAR_SCALE}`,
).join(" ");

const intro: SceneSpec = (() => {
  const tracks: SceneSpec["tracks"] = {
    // The brief is written and sent by a person.
    ".sv-a-prompt": [
      { at: 0, opacity: 1 },
      { at: 4.55, opacity: 1 },
      { at: 4.9, opacity: 0 },
    ],
    ".sv-a-prompt > span": typeOn(0.5, 1.4, BRIEF.length),
    ".sv-cur-you": cursor([
      [0.2, 300, 90],
      [0.7, 262, 40],
      [1.95, 262, 40],
      [2.0, 262, 40, 0.82],
      [2.15, 262, 40],
      [3.5, 250, 66],
      [3.9, 62, 134],
      [4.2, 162, 134],
      [4.35, 162, 134, 0.82],
      [4.5, 162, 134],
      [5.6, 232, 90],
      [5.9, ...NOTE_AT],
      [5.95, ...NOTE_AT, 0.82],
      [6.1, ...NOTE_AT],
      [6.45, 226, 90],
      [7.0, 226, 90],
      [7.25, 130, 25],
      [7.3, 130, 25, 0.82],
      [7.45, 130, 25],
      [7.9, 150, 80],
      [8.3, 200, 214],
    ]),

    // Three concepts are explored in parallel.
    ".sv-a-lines": flash(2.05, 4.5),
    ".sv-a-lines path": [
      { at: 0, strokeDashoffset: 1 },
      { at: 2.1, strokeDashoffset: 1, ease: GLIDE },
      { at: 2.6, strokeDashoffset: 0 },
    ],
    ".sv-a-cap": flash(2.9, 4.5),
    ".sv-a-t-a, .sv-a-t-c": [
      { at: 2.5, opacity: 0 },
      { at: 2.7, opacity: 1 },
      { at: 4.55, opacity: 1 },
      { at: 4.9, opacity: 0 },
    ],

    // One direction is chosen and grows into the prototype.
    ".sv-a-t-b": [
      { at: 2.5, opacity: 0 },
      { at: 2.7, opacity: 1 },
      { at: 4.9, transform: "translate(0px, 0px) scale(1)", ease: GLIDE },
      { at: 5.1, opacity: 1 },
      { at: 5.5, opacity: 0 },
      { at: 5.7, transform: TO_PROTOTYPE },
    ],
    ".sv-a-ring": flash(4.38, 5.1, 0.15),
    ".sv-a-proto": [
      { at: 0, opacity: 0, transform: FROM_CONCEPT },
      { at: 4.9, transform: FROM_CONCEPT, ease: GLIDE },
      { at: 5.0, opacity: 0 },
      { at: 5.4, opacity: 1 },
      { at: 5.7, transform: "translate(0px, 0px) scale(1)" },
    ],
    ".sv-a-trail": reveal(5.5, 0.4, { opacity: 0, transform: "translateX(8px)" }),
    ".sv-a-m1": reveal(5.6),
    ".sv-a-m2": reveal(5.85),

    // A review note tightens the spacing.
    ".sv-a-pin": flash(5.95, 6.8, 0.2),
    ".sv-a-body": [
      { at: 0, transform: "translateY(7px)" },
      { at: 6.3, transform: "translateY(7px)", ease: GLIDE },
      { at: 6.65, transform: "translateY(0px)" },
    ],
    ".sv-a-m3": reveal(6.8),
  };

  CONCEPTS.forEach((concept, column) => {
    for (let block = 1; block <= 5; block += 1) {
      tracks[`.sv-a-t-${concept} > i:nth-child(${block})`] = reveal(
        2.75 + block * 0.15 + column * 0.06,
        0.3,
        BLOCK,
      );
    }

    const x = 17 + column * 100;

    tracks[`.sv-a-ag-${concept}`] = cursor(agentPath(2.5, x, [0, 0.35, 0.6, 0.8, 1, 1.2, 1.5]));
  });

  [3, -2, 4].forEach((offset, index) => {
    tracks[`.sv-a-kpi:nth-child(${index + 1})`] = [
      { at: 0, transform: `translateY(${offset}px)` },
      { at: 6.35 + index * 0.05, transform: `translateY(${offset}px)` },
      { at: 6.7 + index * 0.05, transform: "translateY(0px)" },
    ];
  });

  OVERVIEW_BARS.forEach((_, index) => {
    tracks[`.sv-a-chart > s:nth-child(${index + 1})`] = [
      { at: 0, transform: BAR },
      { at: 5.7 + index * 0.05, transform: BAR },
      { at: 6.2 + index * 0.05, transform: "scaleY(1)" },
    ];
  });

  INSIGHT_BARS.forEach((_, index) => {
    tracks[`.sv-a-big > s:nth-child(${index + 1})`] = [
      { at: 0, transform: BAR },
      { at: 7.5 + index * 0.05, transform: BAR },
      { at: 7.95 + index * 0.05, transform: "scaleY(1)" },
    ];
  });

  return {
    duration: 8.5,
    hold: 1,
    tracks,
    prepare: (root) => {
      const prototype = root.querySelector<HTMLElement>(".sv-a-proto")!;

      prototype.dataset.tab = "overview";
      prototype.dataset.chart = "bars";
      prototype.dataset.kpi = "even";
      CONCEPTS.forEach((concept) => {
        delete root.querySelector<HTMLElement>(`.sv-a-t-${concept}`)!.dataset.v;
      });
      text(root, ".sv-a-prompt > span", BRIEF);
      text(root, ".sv-a-cap-a", "A · Sidebar");
      text(root, ".sv-a-cap-b", "B · Top nav");
      text(root, ".sv-a-cap-c", "C · Cards");
      text(root, ".sv-a-m1 b", "3");
      text(root, ".sv-a-m2 b", "1");
      text(root, ".sv-a-m3 b", "2");
      text(root, ".sv-a-pin", "Tighten the spacing");
      choose(root, "b");
    },
    cues: [[7.35, (root) => showTab(root, "insights")]],
  };
})();

/* After the first prototype, the lab keeps iterating on it. Each round the
   current design becomes the baseline, a person writes a follow-up brief,
   two alternatives are explored next to it, one is chosen and the
   prototype updates. Between rounds the prototype is tested. */

type Topic = "chart" | "kpi";

const OPTIONS: Record<Topic, string[]> = {
  chart: ["bars", "line", "area"],
  kpi: ["even", "hero", "trend"],
};

const LABELS: Record<string, string> = {
  bars: "Bars",
  line: "Line",
  area: "Area",
  even: "Even",
  hero: "Hero metric",
  trend: "Trends",
};

const BRIEFS: Record<string, string> = {
  line: "Show the weekly trend, not just totals",
  area: "Emphasise the volume behind the trend",
  bars: "Compare each day side by side again",
  hero: "Make the key number stand out",
  trend: "Show whether each metric is improving",
  even: "Balance the summary cards again",
};

const NOTES = ["Spacing feels right", "Ready for a usability test", "Share with the team"];
const ROUNDS: (Topic | "code" | "test")[] = ["code", "chart", "kpi", "test"];

type Token = [kind: string, text: string];
type CodeLine = { add?: boolean; tokens: Token[] };
type CodeTask = {
  file: string;
  first: number;
  brief: string;
  tab: string;
  lines: CodeLine[];
};

const CODE_TASKS: Record<"filter" | "export", CodeTask> = {
  filter: {
    file: "Insights.tsx",
    first: 14,
    brief: "Wire the date filter to the analytics API",
    tab: "insights",
    lines: [
      { add: true, tokens: [["k", "const "], ["", "[range, setRange] = "], ["f", "useState"], ["p", "("], ["s", '"7d"'], ["p", ");"]] },
      { add: true, tokens: [["k", "const "], ["", "{ data } = "], ["f", "useAnalytics"], ["p", "({ "], ["", "range"], ["p", " });"]] },
      { tokens: [["k", "return "], ["p", "("]] },
      { tokens: [["p", "  <"], ["t", "Panel"], ["p", ">"]] },
      { add: true, tokens: [["p", "    <"], ["t", "DateFilter "], ["", "value"], ["p", "={"], ["", "range"], ["p", "} "], ["", "set"], ["p", "={"], ["", "setRange"], ["p", "} />"]] },
      { add: true, tokens: [["p", "    <"], ["t", "Chart "], ["", "data"], ["p", "={"], ["", "data.daily"], ["p", "} />"]] },
    ],
  },
  export: {
    file: "Overview.tsx",
    first: 8,
    brief: "Add a CSV export to the overview",
    tab: "overview",
    lines: [
      { add: true, tokens: [["k", "import "], ["p", "{ "], ["", "toCsv"], ["p", " } "], ["k", "from "], ["s", '"@/lib/csv"'], ["p", ";"]] },
      { add: true, tokens: [["k", "const "], ["f", "onExport"], ["p", " = () =>"]] },
      { add: true, tokens: [["p", "  "], ["f", "save"], ["p", "("], ["f", "toCsv"], ["p", "("], ["", "data"], ["p", "), "], ["s", '"report.csv"'], ["p", ");"]] },
      { tokens: [["k", "return "], ["p", "("]] },
      { tokens: [["p", "  <"], ["t", "Toolbar"], ["p", ">"]] },
      { add: true, tokens: [["p", "    <"], ["t", "Button "], ["", "onClick"], ["p", "={"], ["f", "onExport"], ["p", "}>"], ["", "CSV"], ["p", "</"], ["t", "Button"], ["p", ">"]] },
    ],
  },
};

const CODE_ORDER = ["filter", "export"] as const;
const ASIDE = "translate(-42px, 46px) scale(.6)";
const ACCEPT: [number, number] = [286, 154];

const lineText = ({ tokens }: CodeLine) => tokens.map(([, value]) => value).join("");
const TILE_X: Record<string, number> = { a: 17, b: 117, c: 217 };
const SETTLED = "translate(0px, 0px) scale(1)";

const grownFrom = (x: number) => `translate(${x - 56}px, ${TILE_DY}px) scale(.4135)`;
const grownInto = (x: number) => `translate(${56 - x}px, -${TILE_DY}px) scale(2.4186)`;

function text(root: HTMLElement, selector: string, value: string) {
  root.querySelector(selector)!.textContent = value;
}

// An agent drops in above its tile and sketches down through it.
function agentPath(start: number, left: number, times: number[]) {
  const stops: [number, number][] = [
    [43, 63],
    [10, 96],
    [56, 102],
    [22, 122],
    [62, 137],
    [30, 149],
    [70, 167],
  ];

  return stops.map(
    ([x, y], index): [number, number, number] => [start + times[index], left + x, y],
  );
}

function choose(root: HTMLElement, letter: string) {
  root.querySelectorAll<HTMLElement>(".sv-a-trail span").forEach((span) => {
    span.classList.toggle("is-chosen", span.dataset.letter === letter);
  });
}

function showTab(root: HTMLElement, tab: string) {
  root.querySelector<HTMLElement>(".sv-a-proto")!.dataset.tab = tab;
}

function bump(at: number): SceneKey[] {
  return [
    { at, transform: "scale(1)" },
    { at: at + 0.15, transform: "scale(1.3)" },
    { at: at + 0.45, transform: "scale(1)" },
  ];
}

function direct(): Director {
  const crew = createCrew({ you: [200, 214] });
  const state = {
    step: 0,
    code: 0,
    chart: 0,
    kpi: 0,
    pick: 0,
    note: 0,
    explored: 3,
    chosen: 1,
    revisions: 2,
    tab: "insights",
  };

  const test = (): SceneSpec => {
    const first = state.tab === "insights" ? "overview" : "insights";
    const note = NOTES[state.note % NOTES.length];

    state.note += 1;
    state.tab = first === "overview" ? "insights" : "overview";

    const tab = (name: string): [number, number] => [name === "overview" ? 96 : 130, 25];

    return {
      duration: 5.2,
      tracks: {
        ".sv-cur-you": crew.walk("you", [
          [0.7, ...tab(first)],
          [0.78, ...tab(first), 0.82],
          [0.86, ...tab(first)],
          [1.9, ...tab(state.tab)],
          [1.98, ...tab(state.tab), 0.82],
          [2.06, ...tab(state.tab)],
          [2.7, ...NOTE_AT],
          [2.78, ...NOTE_AT, 0.82],
          [2.86, ...NOTE_AT],
          [3.6, 226, 90],
        ]),
        ".sv-a-pin": flash(2.85, 4.3, 0.2),
      },
      prepare: (root) => text(root, ".sv-a-pin", note),
      cues: [
        [0.8, (root) => showTab(root, first)],
        [2, (root) => showTab(root, state.tab)],
      ],
    };
  };

  const round = (topic: Topic): SceneSpec => {
    const options = OPTIONS[topic];
    const from = state[topic];
    const to = (from + 1) % options.length;
    const other = (from + 2) % options.length;
    const picked = state.pick % 2 ? "a" : "c";
    const spare = picked === "a" ? "c" : "a";
    const variants: Record<string, string> = {
      b: options[from],
      [picked]: options[to],
      [spare]: options[other],
    };
    const brief = BRIEFS[options[to]];
    const x = TILE_X[picked];

    state[topic] = to;
    state.pick += 1;
    state.explored += 2;
    state.chosen += 1;
    state.revisions += 1;
    state.tab = "overview";

    const typed = 0.95 + brief.length * 0.035;
    const sent = typed + 0.25;
    const pick = sent + 2.3;
    const tracks: SceneSpec["tracks"] = {
      // The current prototype folds back into the baseline concept.
      ".sv-a-proto": [
        { at: 0, opacity: 1, transform: SETTLED, ease: GLIDE },
        { at: 0.6, opacity: 1 },
        { at: 0.8, transform: grownFrom(TILE_X.b) },
        { at: 0.9, opacity: 0 },
        { at: pick + 0.5, opacity: 0, transform: grownFrom(x), ease: GLIDE },
        { at: pick + 0.95, opacity: 1 },
        { at: pick + 1.3, transform: SETTLED },
      ],
      ".sv-a-t-b": [
        { at: 0, opacity: 0, transform: "none" },
        { at: 0.55, opacity: 0 },
        { at: 0.85, opacity: 1 },
      ],

      // A follow-up brief is written and sent.
      ".sv-a-prompt": [
        ...fade(0.5, 0, 1, 0.3),
        ...fade(pick + 0.2, 1, 0, 0.3),
      ],
      ".sv-a-prompt > span": typeOn(0.95, typed - 0.95, brief.length),
      ".sv-a-lines": flash(sent + 0.1, pick + 0.3),
      ".sv-a-lines path": [
        { at: 0, strokeDashoffset: 1 },
        { at: sent + 0.15, strokeDashoffset: 1, ease: GLIDE },
        { at: sent + 0.65, strokeDashoffset: 0 },
      ],
      ".sv-a-cap": flash(sent + 0.7, pick + 0.4),
      ".sv-cur-you": crew.walk("you", [
        [0.9, 262, 40],
        [typed, 262, 40],
        [sent, 262, 40, 0.82],
        [sent + 0.15, 262, 40],
        [sent + 1.2, 160, 66],
        [pick - 0.1, x + 43, 122],
        [pick, x + 43, 122, 0.82],
        [pick + 0.15, x + 43, 122],
        [pick + 1.6, 232, 170],
      ], 0.2),
      ".sv-a-ring": [
        { at: 0, opacity: 0, transform: `translateX(${x - TILE_X.b}px)` },
        ...flash(pick - 0.05, pick + 0.6, 0.15),
      ],

      // The rest fade while the choice grows into the prototype.
      [`.sv-a-t-${picked}`]: [
        { at: pick + 0.5, transform: "none", ease: GLIDE },
        { at: pick + 0.7, opacity: 1 },
        { at: pick + 1.1, opacity: 0 },
        { at: pick + 1.3, transform: grownInto(x) },
      ],
      // The version trail and counters share the tiles' row, so they step
      // aside while concepts are explored and return with the update.
      ".sv-a-trail, .sv-a-meta": [
        ...fade(0.1, 1, 0, 0.35),
        ...fade(pick + 1.2, 0, 1, 0.35),
      ],
      ".sv-a-m1 b": bump(pick + 1.6),
      ".sv-a-m2 b": bump(pick + 1.75),
      ".sv-a-m3 b": bump(pick + 1.9),
    };

    tracks[".sv-a-t-b"].push(...fade(pick + 0.5, 1, 0, 0.35));

    // Two alternatives are generated next to the baseline.
    [spare, picked].forEach((letter, order) => {
      const left = TILE_X[letter];
      const start = sent + 0.4 + order * 0.15;

      tracks[`.sv-a-t-${letter}`] = [
        { at: 0, opacity: 0, transform: "none" },
        { at: start, opacity: 0 },
        { at: start + 0.2, opacity: 1 },
        ...(tracks[`.sv-a-t-${letter}`] ?? []),
      ];

      if (letter === spare) {
        tracks[`.sv-a-t-${letter}`].push(...fade(pick + 0.5, 1, 0, 0.35));
      }

      for (let block = 1; block <= 5; block += 1) {
        tracks[`.sv-a-t-${letter} > i:nth-child(${block})`] = [
          { at: 0, ...BLOCK },
          ...reveal(start + 0.1 + block * 0.15, 0.3, BLOCK).slice(1),
        ];
      }

      tracks[`.sv-a-ag-${letter}`] = cursor(
        agentPath(start, left, [0, 0.35, 0.6, 0.8, 1, 1.2, 1.5]),
      );
    });

    return {
      duration: pick + 3,
      // The updated prototype and its counters are the result of the round.
      hold: 1,
      tracks,
      prepare: (root) => {
        Object.entries(variants).forEach(([letter, variant]) => {
          root.querySelector<HTMLElement>(`.sv-a-t-${letter}`)!.dataset.v = variant;
          text(
            root,
            `.sv-a-cap-${letter}`,
            `${letter.toUpperCase()} · ${letter === "b" ? "Current" : LABELS[variant]}`,
          );
        });
        text(root, ".sv-a-prompt > span", brief);
      },
      cues: [
        [pick + 1.45, (root) => choose(root, picked)],
        [
          pick + 0.55,
          (root) => {
            const prototype = root.querySelector<HTMLElement>(".sv-a-proto")!;

            prototype.dataset[topic] = options[to];
            prototype.dataset.tab = "overview";
          },
        ],
        [
          pick + 1.6,
          (root) => {
            text(root, ".sv-a-m1 b", String(state.explored));
            text(root, ".sv-a-m2 b", String(state.chosen));
            text(root, ".sv-a-m3 b", String(state.revisions));
          },
        ],
      ],
    };
  };

  const code = (): SceneSpec => {
    const key = CODE_ORDER[state.code % CODE_ORDER.length];
    const task = CODE_TASKS[key];
    const added = state.code >= CODE_ORDER.length;

    state.code += 1;
    state.revisions += 1;
    state.tab = task.tab;

    const typed = 0.95 + task.brief.length * 0.035;
    const sent = typed + 0.25;
    const tracks: SceneSpec["tracks"] = {
      ".sv-a-trail, .sv-a-meta": fade(0.1, 1, 0, 0.35),
      ".sv-a-proto": [
        { at: 0, opacity: 1, transform: SETTLED },
        { at: 0.3, transform: SETTLED, ease: GLIDE },
        { at: 1.1, transform: ASIDE },
      ],
      ".sv-a-prompt": fade(0.5, 0, 1, 0.3),
      ".sv-a-prompt > span": typeOn(0.95, typed - 0.95, task.brief.length),
      ".sv-a-code": [
        { at: 0, opacity: 0, transform: "translateX(6px)" },
        { at: sent + 0.1, opacity: 0, transform: "translateX(6px)" },
        { at: sent + 0.5, opacity: 1, transform: "none" },
      ],
      ".sv-a-accept": [{ at: 0, opacity: 0.35, transform: "scale(1)" }],
    };

    // The agent types each added line; the context around it is already there.
    let at = sent + 0.6;

    task.lines.forEach((line, index) => {
      if (!line.add) return;

      const chars = lineText(line).length;
      const duration = Math.max(0.3, chars * 0.018);

      tracks[`.sv-a-task-${key} .sv-a-cl:nth-child(${index + 1}) > code`] =
        typeOn(at, duration, chars);
      at += duration + 0.12;
    });

    const checks = at + 0.1;
    const passed = checks + 0.9;
    const accept = passed + 0.9;
    const back = accept + 0.7;

    tracks[".sv-a-accept"].push(
      { at: passed, opacity: 0.35 },
      { at: passed + 0.2, opacity: 1 },
      { at: accept, transform: "scale(1)" },
      { at: accept + 0.1, transform: "scale(.9)" },
      { at: accept + 0.3, transform: "scale(1)" },
    );
    tracks[".sv-a-code"].push(
      { at: back - 0.1, opacity: 1 },
      { at: back + 0.25, opacity: 0 },
    );
    tracks[".sv-a-prompt"].push(...fade(back - 0.1, 1, 0, 0.3));
    tracks[".sv-a-proto"].push(
      { at: back, transform: ASIDE, ease: GLIDE },
      { at: back + 0.8, transform: SETTLED },
    );
    tracks[".sv-a-trail, .sv-a-meta"].push(...fade(back + 0.7, 0, 1, 0.35));
    tracks[".sv-a-m3 b"] = bump(back + 1.1);

    // The feature lands in the prototype once the diff is accepted.
    tracks[`.sv-a-feat-${key}`] = added
      ? [
          { at: 0, opacity: 1, transform: "scale(1)" },
          { at: accept + 0.2, transform: "scale(1)" },
          { at: accept + 0.4, transform: "scale(1.2)" },
          { at: accept + 0.7, transform: "scale(1)" },
        ]
      : [
          { at: 0, opacity: 0, transform: "scale(.6)" },
          { at: accept + 0.2, opacity: 0, transform: "scale(.6)" },
          { at: accept + 0.45, opacity: 1, transform: "scale(1.2)" },
          { at: accept + 0.7, transform: "scale(1)" },
        ];

    tracks[".sv-cur-you"] = crew.walk(
      "you",
      [
        [0.9, 262, 40],
        [typed, 262, 40],
        [sent, 262, 40, 0.82],
        [sent + 0.15, 262, 40],
        [sent + 1.1, 226, 180],
        [passed, 236, 180],
        [accept - 0.1, ...ACCEPT],
        [accept, ...ACCEPT, 0.82],
        [accept + 0.15, ...ACCEPT],
        [back + 1.2, 232, 182],
      ],
      0.2,
    );

    const status = (value: string) => (root: HTMLElement) =>
      text(root, ".sv-a-status", value);

    return {
      duration: back + 2,
      hold: 1,
      tracks,
      prepare: (root) => {
        const editor = root.querySelector<HTMLElement>(".sv-a-code")!;

        editor.dataset.task = key;
        editor.classList.remove("is-merged");
        text(root, ".sv-a-prompt > span", task.brief);
        status("✦ Agent is writing…")(root);
      },
      cues: [
        [0.2, (root) => showTab(root, task.tab)],
        [checks, status("Running checks…")],
        [passed, status("✓ 4 checks passed")],
        [
          accept + 0.15,
          (root) => {
            root.querySelector(".sv-a-code")!.classList.add("is-merged");
            status("Merged")(root);
          },
        ],
        [back + 1.1, (root) => text(root, ".sv-a-m3 b", String(state.revisions))],
      ],
    };
  };

  return {
    intro,
    next: () => {
      const topic = ROUNDS[state.step % ROUNDS.length];

      state.step += 1;

      if (topic === "test") return test();

      return topic === "code" ? code() : round(topic);
    },
  };
}

function selectTab(event: MouseEvent<HTMLButtonElement>) {
  const prototype = event.currentTarget.closest<HTMLElement>(".sv-a-proto")!;

  prototype.dataset.tab = event.currentTarget.value;
}

export default function AiScene({ title }: { title: string }) {
  return (
    <ServiceStage
      n="03"
      title={title}
      direct={direct}
      summary="Illustration: a person keeps iterating on a dashboard prototype. They write follow-up briefs, compare generated alternatives against the current design, choose one, have an AI agent code a feature, review and accept its diff, and test the result."
    >
      <div className="sv-a-prompt">
        <i>✦</i>
        <span>{BRIEF}</span>
        <b>
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="7" />
            <path d="M7 10.4V3.9M4.4 6.5 7 3.9l2.6 2.6" />
          </svg>
        </b>
      </div>

      <svg className="sv-a-lines" viewBox="0 0 320 200">
        <path pathLength={1} d="M160 50v15q0 5-5 5H65q-5 0-5 5v11" />
        <path pathLength={1} d="M160 50v36" />
        <path pathLength={1} d="M160 50v15q0 5 5 5h90q5 0 5 5v11" />
      </svg>

      {CONCEPTS.map((concept) => (
        <div key={concept} className={`sv-a-t sv-a-t-${concept}`}>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      ))}

      <span className="sv-a-ring">
        <b>✓</b>
      </span>

      <span className="sv-a-cap sv-a-cap-a">A · Sidebar</span>
      <span className="sv-a-cap sv-a-cap-b">B · Top nav</span>
      <span className="sv-a-cap sv-a-cap-c">C · Cards</span>

      {CONCEPTS.map((concept) => (
        <span key={concept} className={`sv-a-ag sv-a-ag-${concept}`} />
      ))}

      <div className="sv-a-trail">
        {CONCEPTS.map((concept) => (
          <span
            key={concept}
            data-letter={concept}
            className={concept === "b" ? "is-chosen" : undefined}
          >
            {concept.toUpperCase()}
          </span>
        ))}
      </div>

      <div
        className="sv-a-proto"
        data-tab="insights"
        data-chart="bars"
        data-kpi="even"
      >
        <div className="sv-a-nav">
          <i />
          <button
            type="button"
            className="sv-a-tab sv-a-t1"
            value="overview"
            tabIndex={-1}
            onClick={selectTab}
          >
            Overview
          </button>
          <button
            type="button"
            className="sv-a-tab sv-a-t2"
            value="insights"
            tabIndex={-1}
            onClick={selectTab}
          >
            Insights
          </button>
          <span className="sv-a-ind" />
          {/* Drawn as SVG so the labels sit on an exact baseline; at this
              size HTML text centres on rounded font metrics and drifts. */}
          <span className="sv-a-feats">
            <svg
              className="sv-a-feat sv-a-feat-export"
              width="20.5"
              height="8"
              viewBox="0 0 20.5 8"
              aria-hidden="true"
            >
              <rect x=".3" y=".3" width="19.9" height="7.4" rx="3.7" />
              <path
                transform="translate(3 1.75) scale(.55)"
                d="M4 1.2v4.6M2 3.9 4 5.9l2-2M1.6 7h4.8"
              />
              <text x="8.6" y="5.6">
                CSV
              </text>
            </svg>
            <svg
              className="sv-a-feat sv-a-feat-filter"
              width="16.8"
              height="8"
              viewBox="0 0 16.8 8"
              aria-hidden="true"
            >
              <rect x=".3" y=".3" width="16.2" height="7.4" rx="3.7" />
              <text x="3" y="5.6">
                7d
              </text>
              <path
                transform="translate(9.4 1.75) scale(.55)"
                d="M2.2 3.2 4 5l1.8-1.8"
              />
            </svg>
          </span>
          <em />
        </div>

        <div className="sv-a-body">
          <div className="sv-a-ov">
            <div className="sv-a-kpis">
              {[
                ["2.4k", "↑ 8%"],
                ["68%", "↑ 3%"],
                ["+12", "↓ 2"],
              ].map(([value, change]) => (
                <span key={value} className="sv-a-kpi">
                  <i />
                  <b>{value}</b>
                  <em>{change}</em>
                </span>
              ))}
            </div>

            <div className="sv-a-chart">
              {OVERVIEW_BARS.map((height, index) => (
                <s
                  key={index}
                  style={{ left: 6 + index * 20, height: height * BAR_SCALE }}
                />
              ))}

              <svg
                className="sv-a-trend"
                viewBox={`0 0 188 ${CHART_H}`}
                preserveAspectRatio="none"
              >
                <path
                  className="sv-a-trend-area"
                  d={`${TREND} L172 ${CHART_H} L12 ${CHART_H} Z`}
                />
                <path className="sv-a-trend-line" d={TREND} />
              </svg>
            </div>
          </div>

          <div className="sv-a-ins">
            <span className="sv-a-call">↑ 12% this week</span>
            <span className="sv-a-act">3 leads to follow up</span>

            <div className="sv-a-big">
              {INSIGHT_BARS.map((height, index) => (
                <s
                  key={index}
                  style={{ left: 4 + index * 27, height: height * BAR_SCALE }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <span className="sv-a-pin">Tighten the spacing</span>

      <div className="sv-a-meta">
        <span className="sv-a-m1">
          <b>3</b>explored
        </span>
        <span className="sv-a-m2">
          <b>1</b>chosen
        </span>
        <span className="sv-a-m3">
          <b>2</b>revisions
        </span>
      </div>

      <div className="sv-a-code" data-task="filter">
        <div className="sv-a-code-bar">
          <span className="sv-a-agent">✦ Agent</span>
        </div>

        {CODE_ORDER.map((key) => (
          <div key={key} className={`sv-a-task sv-a-task-${key}`}>
            <span className="sv-a-fname">{CODE_TASKS[key].file}</span>

            <div className="sv-a-file">
              {CODE_TASKS[key].lines.map((line, index) => (
                <div
                  key={index}
                  className="sv-a-cl"
                  data-add={line.add ? "" : undefined}
                >
                  <i>{CODE_TASKS[key].first + index}</i>
                  {line.add && <u>+</u>}
                  <code>
                    {line.tokens.map(([kind, value], token) => (
                      <span key={token} className={kind || undefined}>
                        {value}
                      </span>
                    ))}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="sv-a-foot">
          <span className="sv-a-status">✦ Agent is writing…</span>
          <span className="sv-a-accept">Accept</span>
        </div>
      </div>

      <SceneCursor id="you" tag="JT" />
    </ServiceStage>
  );
}
