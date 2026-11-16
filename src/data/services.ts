import type { Service } from "@/types";

export const services: Service[] = [
  {
    n: "01",
    icon: "design",
    title: "Product & UI/UX Design",
    text: "Working out the flow before the pixels — wireframes, prototypes, then the polish. I'd rather an interface be clear than decorated.",
    chips: ["Research", "Wireframes", "Figma", "Prototyping"],
  },
  {
    n: "02",
    icon: "code",
    title: "Front-End Development",
    text: "Turning the design into the real thing — choosing the approach, steering the build, then debugging and refining until it's responsive, accessible and holds up.",
    chips: ["React", "TypeScript", "Tailwind", "Flutter"],
  },
  {
    n: "03",
    icon: "ai",
    title: "AI-Assisted Prototyping & Design",
    text: "AI is a speed layer for me — for exploring, iterating and testing ideas. Deciding what's actually good stays my job.",
    chips: ["Cursor", "v0", "Figma Make", "Rapid Prototyping"],
  },
  {
    n: "04",
    icon: "boxes",
    title: "Concept-to-Code",
    text: "Taking one idea all the way — UX, visual design and the build — without a handoff in the middle where things get lost.",
    chips: ["Strategy", "Design", "Build", "Handoff"],
  },
];
