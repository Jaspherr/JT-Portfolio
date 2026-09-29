import type { MetadataRoute } from "next";

import {
  caseStudies,
  caseStudyOrder,
} from "@/data/caseStudies";
import {
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/og-image.png")],
    },
    ...caseStudyOrder.map((slug) => {
      const project = caseStudies[slug];

      return {
        url: absoluteUrl(`/projects/${slug}`),
        changeFrequency: "yearly" as const,
        priority: 0.8,
        images: [absoluteUrl(project.heroImage)],
      };
    }),
  ];
}