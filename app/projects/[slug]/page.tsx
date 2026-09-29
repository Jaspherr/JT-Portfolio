import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyPage from "@/components/projects/CaseStudyPage";
import {
  caseStudies,
  caseStudyOrder,
} from "@/data/caseStudies";
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  toMetaDescription,
} from "@/lib/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyOrder.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies[slug];

  if (!project) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const path = `/projects/${project.slug}`;
  const description = toMetaDescription(project.impact);
  const title = `${project.projectName} Case Study`;

  return {
    title,
    description,

    alternates: {
      canonical: path,
    },

    keywords: [
      project.projectName,
      project.projectType,
      project.role,
      ...project.tags,
      "Jaspher Tania",
    ],

    openGraph: {
      title: `${title} — Jaspher Tania`,
      description,
      url: path,
      type: "article",
      siteName: SITE_NAME,
      images: [
        {
          url: project.heroImage,
          alt: `${project.projectName} case study preview`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} — Jaspher Tania`,
      description,
      images: [project.heroImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = caseStudies[slug];

  if (!project) {
    notFound();
  }

  const projectUrl = absoluteUrl(
    `/projects/${project.slug}`,
  );
  const description = toMetaDescription(project.impact);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#case-study`,
    url: projectUrl,
    name: `${project.projectName} Case Study`,
    headline: project.challenge.heading,
    description,
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
    ...(project.githubUrl
      ? { sameAs: project.githubUrl }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <CaseStudyPage project={project} />
    </>
  );
}