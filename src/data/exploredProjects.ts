import type { ExploredProject } from "@/types";

/* Blueprint marks trace each screenshot's main blocks, in percent of the
   preview (16:10). They are measured from the images in public/explored, so
   retake them if a preview changes. */

export const exploredProjects: ExploredProject[] = [
  {
    name: "Abong",
    kind: "independent",
    description:
      "A long-term rental marketplace idea for Pangasinan. Search by town or school, browse sample places on a map and see what moving in would cost before asking for a viewing.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Leaflet"],
    preview: "/explored/Abong.png",
    previewAlt:
      "Abong's search results for Dagupan City: two listing cards with monthly prices beside a map of the city marked with rent prices.",
    url: "https://abong-tan.vercel.app/",
    tone: "#1d5c45",
    blueprint: [
      [0, 7, 100, 0],
      [2.2, 8.5, 38, 4.6],
      [2.5, 17, 32, 9],
      [2.5, 28.3, 48.7, 0],
      [2.5, 40, 23.7, 57],
      [27.5, 40, 23.7, 57],
      [53.8, 14.3, 46.2, 85.7],
    ],
  },
  {
    name: "Fretform",
    kind: "independent",
    description:
      "For guitarists who know the basics but still get lost on the neck. Pick a chord or scale and see where its notes sit, which shapes hold them and where they can go next.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    preview: "/explored/Fretform.png",
    previewAlt:
      "Fretform's guitar neck in dark mode, with every G, B and D of a G major chord marked by colour and shape along the fretboard.",
    url: "https://fretform.vercel.app/",
    tone: "#b5530c",
    blueprint: [
      [0, 6.3, 100, 0],
      [2.2, 10.5, 50.5, 6.5],
      [2.2, 20, 16, 25.6],
      [20.4, 22.4, 48.5, 4],
      [21.6, 30, 75.4, 24.8],
      [21.6, 31.6, 75.4, 0],
      [21.6, 35.9, 75.4, 0],
      [21.6, 40.2, 75.4, 0],
      [21.6, 44.5, 75.4, 0],
      [21.6, 48.8, 75.4, 0],
      [21.6, 53.1, 75.4, 0],
      [20.4, 66.8, 51.5, 7.6],
      [82.3, 76.3, 15.5, 4.5],
    ],
  },
  {
    name: "Kelmere",
    kind: "demo",
    description:
      "One record for a made-up furniture workshop, from first quote to pay run. Switch roles, price a job, issue its materials and watch the stock change.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    preview: "/explored/Kelmere.png",
    previewAlt:
      "Kelmere's inventory of sample workshop materials, listing stock on hand, amounts reserved for work orders and whether each is in stock.",
    url: "https://kelmere.vercel.app/",
    tone: "#12616a",
    blueprint: [
      [0, 0, 16.7, 100],
      [16.7, 6.2, 83.3, 0],
      [18.3, 9, 27.5, 6],
      [18.3, 16.8, 57, 3.6],
      [18.4, 22.6, 79.9, 7.3],
      [38.4, 22.6, 0, 7.3],
      [58.4, 22.6, 0, 7.3],
      [78.3, 22.6, 0, 7.3],
      [18.4, 32.2, 79.9, 67.8],
      [18.4, 42.2, 79.9, 0],
    ],
  },
  {
    name: "SI-Portal",
    kind: "demo",
    description:
      "An operations workspace for planning a team's week: a calendar to plot and drag tasks on, team dashboards and a client directory. The people and numbers are fictional.",
    stack: ["React", "TypeScript", "React Router", "CSS"],
    preview: "/explored/SI-Portal.png",
    previewAlt:
      "SI-Portal's week calendar with sample tasks planned across each day, the hours logged against an eight-hour target and a panel for unscheduled work.",
    url: "https://si-portal-nu.vercel.app/",
    tone: "#4a2f5c",
    blueprint: [
      [0, 0, 18, 100],
      [20.3, 7.1, 76.4, 0],
      [20.3, 9.4, 25.7, 5],
      [88.5, 9.4, 8.2, 4.9],
      [20.3, 16.7, 19, 4],
      [20.3, 23.1, 54.2, 68.4],
      [31.2, 23.1, 0, 68.4],
      [42, 23.1, 0, 68.4],
      [52.8, 23.1, 0, 68.4],
      [63.6, 23.1, 0, 68.4],
      [76, 23.1, 20.7, 13.7],
      [76, 38.8, 20.7, 20],
    ],
  },
];
