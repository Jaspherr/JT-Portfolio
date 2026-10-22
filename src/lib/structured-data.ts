import type { CaseStudy } from "@/types";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
  toMetaDescription,
} from "@/lib/site";

export const profileJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    author: {
      "@id": `${SITE_URL}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Jaspher Tania",
      url: SITE_URL,
      image: absoluteUrl("/extendedavatar.png"),
      jobTitle: "UI/UX Designer & Front-End Developer",
      sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
      knowsAbout: [
        "UI/UX Design",
        "Front-End Development",
        "Product Design",
        "Figma",
        "React",
        "TypeScript",
      ],
    },
  },
];

export function caseStudyJsonLd(project: CaseStudy) {
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#case-study`,
    url: projectUrl,
    name: `${project.projectName} Case Study`,
    headline: project.challenge.heading,
    description: toMetaDescription(project.impact),
    image: absoluteUrl(project.heroImage),
    inLanguage: "en",
    about: project.projectType,
    keywords: project.tags.join(", "),
    creator: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Jaspher Tania",
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(project.githubUrl ? { sameAs: project.githubUrl } : {}),
  };
}