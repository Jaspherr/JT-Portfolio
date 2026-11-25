import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import ExploredProjects from "@/components/sections/ExploredProjects";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import JsonLd from "@/components/shared/JsonLd";
import { homeTimelines } from "@/data/scrollTimelines";
import { useDraftOnView } from "@/hooks/useDraftOnView";
import { useScrollTimelines } from "@/hooks/useScrollTimelines";
import { profileJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  useDraftOnView();
  useScrollTimelines(homeTimelines);

  return (
    <>
      <JsonLd data={profileJsonLd} />

      <div id="top" aria-hidden="true" />

      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <ScrollProgress />

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <ExploredProjects />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}