import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "@/App";
import { caseStudies, caseStudyOrder } from "@/data/caseStudies";
import { ImagePreloadContext, type ImagePreload } from "@/lib/image-preload";
import { getRouteHead, headToString } from "@/lib/seo";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const routes = [
  "/",
  ...caseStudyOrder.map((slug) => `/projects/${slug}`),
];

const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function preloadLinks(preloads: ImagePreload[]) {
  return preloads.map(
    ({ imageSrcSet, imageSizes, fetchPriority }) =>
      `<link rel="preload" as="image" imagesrcset="${escapeAttr(imageSrcSet)}"` +
      (imageSizes ? ` imagesizes="${escapeAttr(imageSizes)}"` : "") +
      (fetchPriority ? ` fetchpriority="${fetchPriority}"` : "") +
      " />",
  );
}

export function render(url: string) {
  const preloads: ImagePreload[] = [];

  const html = renderToString(
    <StrictMode>
      <ImagePreloadContext value={preloads}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ImagePreloadContext>
    </StrictMode>,
  );

  const { tags, status } = getRouteHead(url);

  const fontPreloads =
    url === "/"
      ? [
          `<link rel="preload" href="/fonts/monoton-latin.woff2" as="font" type="font/woff2" crossorigin />`,
        ]
      : [];

  return {
    html,
    status,
    head: [...fontPreloads, ...preloadLinks(preloads), headToString(tags)].join(
      "\n    ",
    ),
  };
}

export function robotsTxt() {
  return `User-Agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export function sitemapXml() {
  const entry = (loc: string, image: string, changefreq: string, priority: number) =>
    `<url>\n<loc>${loc}</loc>\n<image:image>\n<image:loc>${image}</image:loc>\n</image:image>\n<changefreq>${changefreq}</changefreq>\n<priority>${priority}</priority>\n</url>`;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    entry(SITE_URL, absoluteUrl("/og-image.png"), "monthly", 1),
    ...caseStudyOrder.map((slug) =>
      entry(
        absoluteUrl(`/projects/${slug}`),
        absoluteUrl(caseStudies[slug].heroImage),
        "yearly",
        0.8,
      ),
    ),
    `</urlset>`,
    "",
  ].join("\n");
}