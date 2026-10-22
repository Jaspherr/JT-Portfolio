import { useRef } from "react";
import {
  ArrowUpRight,
  Code2,
  Figma,
  Github,
  Linkedin,
  PenTool,
} from "lucide-react";

import Image from "@/components/ui/Image";
import { useIntroReady } from "@/hooks/useIntroReady";
import { SOCIAL_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAME = "JASPHER";
const FIRST_LINE_LETTER = 3;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useIntroReady(heroRef, "hero-ready");

  return (
    <section ref={heroRef} id="about" className="hero hero-intro shell">
      <div className="hero-eyebrow">
        <span>Designer + Developer</span>
        <span>Philippines · 2026</span>
      </div>

      <div className="hero-name">
        <span className="hero-im" aria-hidden="true">
          I&apos;M
        </span>

        <h1 aria-label="JASPHER">
          <span
            className="hero-name-letters"
            aria-hidden="true"
          >
            {NAME.split("").map((letter, index) => (
              <span
                className={cn(
                  "hero-name-letter",
                  index >= FIRST_LINE_LETTER
                    ? "hero-name-letter-line font-monoton"
                    : "hero-name-letter-solid",
                )}
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        <span className="hero-designer">
          a UI / UX Designer
        </span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h2>
            I shape useful ideas into{" "}
            <em>clear digital experiences.</em>
          </h2>

          <p className="hero-description">
            I design and build thoughtful interfaces where visual
            craft, product thinking, and front-end execution meet.
          </p>

          <a
            className="collab magnetic"
            href="#contact"
          >
            <span className="collab-label">
              <small>AVAILABLE FOR WORK</small>
              <strong>Start a project</strong>
            </span>

            <span
              className="collab-arrow"
              aria-hidden="true"
            >
              <ArrowUpRight />
            </span>
          </a>
        </div>

        <div className="avatar-stage">
          <div
            className="avatar-halo"
            aria-hidden="true"
          />

          <div className="avatar-wrap">
            <Image
              src="/extendedavatar.png"
              alt="Jaspher Tania 3D portrait"
              fill
              preload
              sizes="(max-width: 800px) 100vw, 1000px"
            />
          </div>
        </div>

        <div className="hero-meta">
          <div className="experience-count">
            <div className="experience-number">
              <strong>2</strong>

              <span
                className="experience-orbit"
                aria-hidden="true"
              >
                <span className="experience-dot" />
              </span>
            </div>

            <span className="experience-label">
              YEARS OF
              <br />
              DESIGN + BUILDING
            </span>
          </div>

          <div className="hero-currently">
            <span className="hero-currently-label">
              <i aria-hidden="true" />
              CURRENTLY
            </span>

            <p>
              Open to UI/UX design, front-end development,
              and selected freelance opportunities.
            </p>
          </div>

          <div
            className="socials"
            role="group"
            aria-label="Professional links and tools"
          >
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile, opens in a new tab"
            >
              <Linkedin aria-hidden="true" />
            </a>

            <span
              role="img"
              aria-label="Design"
            >
              <PenTool aria-hidden="true" />
            </span>

            <span
              role="img"
              aria-label="Figma"
            >
              <Figma aria-hidden="true" />
            </span>

            <span
              role="img"
              aria-label="Development"
            >
              <Code2 aria-hidden="true" />
            </span>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile, opens in a new tab"
            >
              <Github aria-hidden="true" />
            </a>
          </div>

          <div
            className="hero-meta-accent"
            aria-hidden="true"
          >
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}