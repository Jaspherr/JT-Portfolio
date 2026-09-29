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

export type Service = {
  n: string;
  icon: "design" | "code" | "ai" | "boxes";
  title: string;
  text: string;
  chips: string[];
};

export type Experience = {
  index: string;
  company: string;
  role: string;
  date: string;
  text: string;
};

export type Skill = {
  n: string;
  title: string;
  desc: string;
  chips: string[];
};

export * from "./caseStudy";