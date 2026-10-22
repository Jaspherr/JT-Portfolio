import { caseStudies } from "@/data/caseStudies";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  toMetaDescription,
} from "@/lib/site";

export type HeadTag =
  | { tag: "title"; text: string }
  | { tag: "meta"; attrs: Record<string, string> }
  | { tag: "link"; attrs: Record<string, string> };

const AUTHOR = "Jaspher Tania";
const TITLE_SUFFIX = " — Jaspher Tania";

const SITE_KEYWORDS = [
  "Jaspher Tania",
  "UI UX Designer",
  "UI Designer",
  "UX Designer",
  "Front-End Developer",
  "Web Designer",
  "Product Designer",
  "Figma",
  "Philippines",
];

const meta = (attrs: Record<string, string>): HeadTag => ({ tag: "meta", attrs });
const link = (attrs: Record<string, string>): HeadTag => ({ tag: "link", attrs });
const named = (name: string, content: string) => meta({ name, content });
const property = (name: string, content: string) =>
  meta({ property: name, content });

type PageHead = {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  robots?: string;
  noindex?: boolean;
  openGraph: HeadTag[];
  image: string;
};

function buildHead(page: PageHead): HeadTag[] {
  return [
    ...(page.noindex ? [named("robots", "noindex")] : []),
    { tag: "title", text: page.title },
    named("description", page.description),
    named("application-name", SITE_NAME),
    link({ rel: "author", href: SITE_URL }),
    named("author", AUTHOR),
    named("keywords", page.keywords.join(",")),
    named("creator", AUTHOR),
    named("publisher", AUTHOR),
    named("robots", "index, follow"),
    link({ rel: "canonical", href: page.canonical }),
    ...page.openGraph,
    named("twitter:card", "summary_large_image"),
    named("twitter:title", page.title),
    named("twitter:description", page.description),
    named("twitter:image", page.image),
    link({ rel: "shortcut icon", href: "/icon.png" }),
    link({ rel: "icon", href: "/icon.png" }),
    link({ rel: "apple-touch-icon", href: "/icon.png" }),
  ];
}

function siteHead(noindex = false): HeadTag[] {
  const image = absoluteUrl("/og-image.png");

  return buildHead({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    canonical: SITE_URL,
    noindex,
    image,
    openGraph: [
      property("og:title", SITE_TITLE),
      property("og:description", SITE_DESCRIPTION),
      property("og:url", SITE_URL),
      property("og:site_name", SITE_NAME),
      property("og:locale", "en_US"),
      property("og:image", image),
      property("og:image:width", "1200"),
      property("og:image:height", "630"),
      property("og:image:alt", "Jaspher Tania portfolio preview"),
      property("og:type", "website"),
    ],
  });
}

function caseStudyHead(slug: string): HeadTag[] | null {
  const project = caseStudies[slug];

  if (!project) return null;

  const title = `${project.projectName} Case Study${TITLE_SUFFIX}`;
  const description = toMetaDescription(project.impact);
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image = absoluteUrl(project.heroImage);

  return buildHead({
    title,
    description,
    keywords: [
      project.projectName,
      project.projectType,
      project.role,
      ...project.tags,
      AUTHOR,
    ],
    canonical: url,
    image,
    openGraph: [
      property("og:title", title),
      property("og:description", description),
      property("og:url", url),
      property("og:site_name", SITE_NAME),
      property("og:image", image),
      property("og:image:alt", `${project.projectName} case study preview`),
      property("og:type", "article"),
    ],
  });
}

export function getCaseStudySlug(pathname: string) {
  return pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1] ?? null;
}

export function getRouteHead(pathname: string): {
  tags: HeadTag[];
  status: 200 | 404;
} {
  if (pathname === "/") {
    return { tags: siteHead(), status: 200 };
  }

  const slug = getCaseStudySlug(pathname);
  const tags = slug ? caseStudyHead(slug) : null;

  return tags ? { tags, status: 200 } : { tags: siteHead(true), status: 404 };
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const attrsToString = (attrs: Record<string, string>) =>
  Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${escapeHtml(value)}"`)
    .join("");

export function headToString(tags: HeadTag[]) {
  return tags
    .map((tag) =>
      tag.tag === "title"
        ? `<title>${escapeHtml(tag.text)}</title>`
        : `<${tag.tag}${attrsToString(tag.attrs)} data-route-head />`,
    )
    .join("\n    ");
}

export function applyHead(tags: HeadTag[]) {
  document.head
    .querySelectorAll("[data-route-head]")
    .forEach((element) => element.remove());

  const anchor = document.head.querySelector("script#theme-init");

  for (const tag of tags) {
    if (tag.tag === "title") {
      document.title = tag.text;
      continue;
    }

    const element = document.createElement(tag.tag);

    for (const [key, value] of Object.entries(tag.attrs)) {
      element.setAttribute(key, value);
    }

    element.setAttribute("data-route-head", "");
    document.head.insertBefore(element, anchor);
  }
}

export function toJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}