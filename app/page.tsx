import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageEffects from "@/components/layout/PageEffects";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PortfolioAnimations from "@/components/animations/PortfolioAnimations";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Toolkit from "@/components/sections/Toolkit";
import Contact from "@/components/sections/Contact";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
} from "../lib/site";

const profileJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    author: {
      "@id": `${SITE_URL}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Jaspher Tania",
      url: SITE_URL,
      image: absoluteUrl("/extendedavatar.png"),
      jobTitle: "UI/UX Designer & Front-End Developer",
      sameAs: [
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.github,
      ],
      knowsAbout: [
        "UI/UX Design",
        "Front-End Development",
        "Product Design",
        "Figma",
        "React",
        "TypeScript",
      ],
    },
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <div id="top" aria-hidden="true" />

      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <PageEffects />
      <ScrollProgress />
      <PortfolioAnimations />

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Services />
        <Experience />
        <Projects />
        <Toolkit />
        <Contact />
      </main>

      <Footer />
    </>
  );
}