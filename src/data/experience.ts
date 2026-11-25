import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    index: "01",
    company: "Boom Technologies Inc.",
    role: "Web Developer & UI/UX Designer Intern",
    date: "Dec 2025 – Mar 2026",
    text: "Designed and helped build Clarify, a multi-page admin platform — where I learned how much a design changes once real development constraints show up.",
  },
  {
    index: "02",
    company: "Simple.biz",
    role: "Freelance Video Editor",
    date: "Dec 2025 – Apr 2026",
    text: "Edited video for pacing, colour, sound and motion — work that sharpened the storytelling instincts I bring into interfaces.",
    reel: {
      label: "Edits for Orphans PH",
      videos: [
        {
          id: "qk0VgF9zeEg",
          title: "Where Purpose Leads, Faith Moves: One Team on a Mission in the Philippines",
          format: "landscape",
        },
        {
          id: "Zk4T99NXkXQ",
          title: "Chosen to Shine: Held by Love, United in Hope",
          format: "landscape",
        },
        {
          id: "3KKpNQZ-Ss8",
          title: "A Day of Connection and Celebration at St. Martin De Porres",
          format: "landscape",
        },
        {
          id: "5KQQXIaaBEg",
          title: "Tiny Dancers, Big Smiles: Kuya Center Kids",
          format: "short",
        },
        {
          id: "JWQ9g5ToChs",
          title: "Hearts That Inspire: Joy and Hope for St. Martin De Porres Kids",
          format: "short",
        },
      ],
    },
  },
];
