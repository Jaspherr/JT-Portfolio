import type { Service } from "@/types";

export const services: Service[] = [
  {
    n: "01",
    icon: "design",
    title: "Product & UI/UX Design",
    text: "User flows, wireframes, prototypes, and polished interfaces designed around clarity—not decoration.",
    chips: ["Research", "Wireframes", "Figma", "Prototyping"],
  },
  {
    n: "02",
    icon: "code",
    title: "Front-End Development",
    text: "Responsive, accessible interfaces translated from design into maintainable production-ready code.",
    chips: ["React", "TypeScript", "Tailwind", "Flutter"],
  },
  {
    n: "03",
    icon: "ai",
    title: "AI-Assisted Prototyping & Design",
    text: "AI used as a speed layer for exploration, iteration, and validation—without outsourcing product judgment.",
    chips: ["Cursor", "v0", "Figma Make", "Rapid Prototyping"],
  },
  {
    n: "04",
    icon: "boxes",
    title: "Concept-to-Code",
    text: "A focused end-to-end engagement for teams that need one creative partner across UX, visual design, and UI build.",
    chips: ["Strategy", "Design", "Build", "Handoff"],
  },
];