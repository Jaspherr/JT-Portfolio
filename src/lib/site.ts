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
  import.meta.env.VITE_SITE_URL,
);

export const SITE_NAME = "Jaspher Tania Portfolio";

export const SITE_TITLE =
  "Jaspher Tania — UI/UX Designer & Front-End Developer";

export const SITE_DESCRIPTION =
  "Jaspher Tania designs interfaces and then builds them. Projects, animated experiments and notes from a UI/UX designer who also builds the front-end.";

export const SOCIAL_LINKS = {
  github: "https://github.com/jaspherr",
  linkedin: "https://www.linkedin.com/in/jaspher-tania/",
} as const;

export const RESUME_URL = "/resume/Jaspher%20Tania%20-%20Resume.pdf";

export const CONTACT_EMAIL = "taniajaspher0@gmail.com";

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