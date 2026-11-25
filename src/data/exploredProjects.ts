import type { ExploredProject } from "@/types";

export const exploredProjects: ExploredProject[] = [
  {
    name: "Abong",
    category: "Independent exploration",
    description:
      "A long-term rental marketplace idea for Pangasinan. Search by town or school, browse sample places on a map and see what moving in would cost before asking for a viewing.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Leaflet"],
    preview: "/explored/Abong.png",
    previewAlt:
      "Abong's home page, with a rental search form beside photos of two featured places.",
    url: "https://abong-tan.vercel.app/",
    tone: "#1d5c45",
  },
  {
    name: "Fretform",
    category: "Interactive exploration",
    description:
      "For guitarists who know the basics but still get lost on the neck. Pick a chord or scale and see where its notes sit, which shapes hold them and where they can go next.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    preview: "/explored/Fretform.png",
    previewAlt:
      "Fretform's scale view, with every note of C major marked by colour and shape along a guitar neck.",
    url: "https://fretform.vercel.app/",
    tone: "#b5530c",
  },
  {
    name: "Kelmere",
    category: "Software demonstration",
    description:
      "One record for a made-up furniture workshop, from first quote to pay run. Switch roles, price a job, issue its materials and watch the stock change.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    preview: "/explored/Kelmere.png",
    previewAlt:
      "Kelmere's overview, with quote totals, work orders in progress and equipment to look at, all sample data.",
    url: "https://kelmere.vercel.app/",
    tone: "#12616a",
  },
  {
    name: "SI-Portal",
    category: "Software demonstration",
    description:
      "An operations workspace for planning a team's week: a calendar to plot and drag tasks on, team dashboards and a client directory. The people and numbers are fictional.",
    stack: ["React", "TypeScript", "React Router", "CSS"],
    preview: "/explored/SI-Portal.png",
    previewAlt:
      "SI-Portal's team dashboard, with a colour-coded grid of sample hours for the week and a list of follow-ups.",
    url: "https://si-portal-nu.vercel.app/",
    tone: "#4a2f5c",
  },
];
