import "./globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Open_Sans,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";

import SmoothScroll from "@/components/ui/SmoothScroll";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s — Jaspher Tania",
  },

  description: SITE_DESCRIPTION,

  alternates: {
    canonical: "/",
  },

  applicationName: SITE_NAME,

  authors: [
    {
      name: "Jaspher Tania",
      url: SITE_URL,
    },
  ],

  creator: "Jaspher Tania",
  publisher: "Jaspher Tania",

  keywords: [
    "Jaspher Tania",
    "UI UX Designer",
    "UI Designer",
    "UX Designer",
    "Front-End Developer",
    "Web Designer",
    "Product Designer",
    "Figma",
    "Philippines",
  ],

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jaspher Tania portfolio preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(() => {
  try {
    const storageKey = "jaspher-theme";
    const saved = localStorage.getItem(storageKey);

    // Default is always LIGHT. Only an explicit saved DARK choice overrides it.
    const theme = saved === "dark" ? "dark" : "light";

    // Migrate any legacy "system" value from the previous implementation.
    if (saved !== "light" && saved !== "dark") {
      localStorage.setItem(storageKey, "light");
    }

    const root = document.documentElement;

    root.dataset.theme = theme;
    root.dataset.themePreference = theme;
    root.style.colorScheme = theme;

    let themeColor = document.querySelector('meta[name="theme-color"]');

    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.setAttribute("name", "theme-color");
      document.head.appendChild(themeColor);
    }

    themeColor.setAttribute(
      "content",
      theme === "dark" ? "#11100e" : "#fdfdfb",
    );
  } catch {
    const root = document.documentElement;

    root.dataset.theme = "light";
    root.dataset.themePreference = "light";
    root.style.colorScheme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${openSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>

      <body suppressHydrationWarning>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}