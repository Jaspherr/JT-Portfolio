export type CaseStudyFeature = {
  number: string;
  title: string;
  image: string;
  imageType?: "web" | "mobile";
  description: string;
  userValue: string;
  implementation: string;
};

export type CaseStudy = {
  slug: string;
  projectName: string;
  eyebrow: string;
  role: string;
  platform: string;
  projectType: string;
  year: string;
  duration: string;
  context: string;
  team: string;
  audience: string;
  stack: string;

  githubUrl?: string;

  heroImage: string;
  heroImageType?: "web" | "mobile";

  tags: string[];
  impact: string;

  challenge: {
    heading: string;
    description: string[];
  };

  strategy: {
    introduction: string;
    designPrinciples: string[];
    technicalConsiderations: string[];
  };

  features: CaseStudyFeature[];

  results: {
    outcomes: string[];
    takeaways: string[];
  };
};