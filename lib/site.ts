export const FALLBACK_SITE_URL = "https://jino-profile.vercel.app";

function normalizeSiteUrl(value?: string) {
  const raw = value?.trim() || FALLBACK_SITE_URL;
  const withProtocol =
    raw.startsWith("http://") || raw.startsWith("https://")
      ? raw
      : `https://${raw}`;

  return withProtocol.replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
);

export const SITE_NAME = "Jaspher Tania Portfolio";

export const SITE_TITLE =
  "Jaspher Tania — UI/UX Designer & Front-End Developer";

export const SITE_DESCRIPTION =
  "Portfolio of Jaspher Tania, a UI/UX designer and front-end developer creating clear, thoughtful digital products across web and mobile.";

export const SOCIAL_LINKS = {
  github: "https://github.com/jaspherr",
  linkedin: "https://www.linkedin.com/in/jaspher-tania/",
} as const;

export const RESUME_URL = "/resume/Jaspher%20Tania%20-%20Resume.pdf";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function toMetaDescription(value: string, maxLength = 160) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}