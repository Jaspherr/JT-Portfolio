import { RESUME_URL, SOCIAL_LINKS } from "@/lib/site";
import type { ContactLink } from "@/types";

export const contactLinks: ContactLink[] = [
  {
    number: "01",
    label: "CODE & PROJECTS",
    name: "GitHub",
    href: SOCIAL_LINKS.github,
  },
  {
    number: "02",
    label: "PROFESSIONAL PROFILE",
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    number: "03",
    label: "CURRICULUM VITAE",
    name: "Résumé",
    href: RESUME_URL,
  },
];