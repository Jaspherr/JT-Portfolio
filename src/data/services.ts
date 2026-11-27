import type { Service } from "@/types";

export const services: Service[] = [
  {
    n: "01",
    icon: "design",
    title: "Product & UI/UX Design",
    text: "I work out the flow before the pixels: wireframes first, then prototypes, then polish. I'd rather an interface be clear than decorated.",
    chips: ["Research", "Wireframes", "Figma", "Prototyping"],
  },
  {
    n: "02",
    icon: "code",
    title: "Front-End Development",
    text: "I turn the design into the real thing. I choose the approach, steer the build, then debug and refine until it's responsive, accessible and holds up.",
    chips: ["React", "TypeScript", "Tailwind", "Flutter"],
  },
  {
    n: "03",
    icon: "ai",
    title: "AI-Assisted Design, Prototyping & Coding",
    text: "AI helps me move faster when I'm exploring, iterating, testing ideas and writing code. Deciding what's actually good is still my job.",
    chips: ["Cursor", "v0", "Figma Make", "Rapid Prototyping"],
  },
  {
    n: "04",
    icon: "boxes",
    title: "Concept-to-Code",
    text: "I take one idea all the way through UX, visual design and the build, so nothing gets lost in a handoff halfway.",
    chips: ["Strategy", "Design", "Build", "Handoff"],
  },
];
