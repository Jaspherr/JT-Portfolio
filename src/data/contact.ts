import { RESUME_URL, SOCIAL_LINKS } from "@/lib/site";
import type { ContactLink } from "@/types";

export const contactLinks: ContactLink[] = [
  {
    number: "01",
    label: "Code and repos",
    name: "GitHub",
    href: SOCIAL_LINKS.github,
  },
  {
    number: "02",
    label: "The professional version",
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    number: "03",
    label: "Everything on one page",
    name: "Résumé",
    href: RESUME_URL,
  },
];
