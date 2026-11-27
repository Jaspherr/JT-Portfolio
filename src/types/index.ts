export type NavLink = {
  href: `#${string}`;
  label: string;
};

export type ProjectImage = {
  src: string;
  type: "web" | "mobile";
};

export type Project = {
  slug: string;
  title: string;
  type: string;
  githubUrl?: string;
  images: ProjectImage[];
  description: string;
  role: string;
  contributions: string[];
  outcome: string;
  tags: string[];
};

/* A drafting line or box over a project preview, in percent of the preview.
   A zero width or height draws a single rule. */
export type BlueprintMark = [x: number, y: number, width: number, height: number];

export type ExploredProject = {
  name: string;
  // "independent" for my own explorations, "demo" for software
  // demonstrations that run on fictional data.
  kind: "independent" | "demo";
  description: string;
  stack: string[];
  preview: string;
  previewAlt: string;
  url: string;
  // The project's own colour, behind its preview.
  tone: string;
  // The preview's main layout blocks, drawn before the screenshot inks in.
  blueprint: BlueprintMark[];
};

export type Service = {
  n: string;
  icon: "design" | "code" | "ai" | "boxes";
  title: string;
  text: string;
  chips: string[];
};

export type Video = {
  // The YouTube video ID.
  id: string;
  title: string;
  format: "landscape" | "short";
};

export type Experience = {
  index: string;
  company: string;
  role: string;
  date: string;
  text: string;
  reel?: {
    label: string;
    videos: Video[];
  };
};

export type Skill = {
  n: string;
  title: string;
  desc: string;
  chips: string[];
};

export type ContactLink = {
  number: string;
  label: string;
  name: string;
  href: string;
};

export * from "./caseStudy";