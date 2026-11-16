import { useRef } from "react";
import {
  ArrowDownRight,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import Image from "@/components/ui/Image";
import { useIntroReady } from "@/hooks/useIntroReady";
import { CONTACT_EMAIL, RESUME_URL, SOCIAL_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAME = "JASPHER";
const FIRST_LINE_LETTER = 3;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useIntroReady(heroRef, "hero-ready");

  return (
    <section ref={heroRef} id="intro" className="hero hero-intro shell">
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
          a designer who builds
        </span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h2>
            I design interfaces,{" "}
            <em>then I build them.</em>
          </h2>

          <p className="hero-description">
            Most of what I make lives somewhere between Figma and a
            code editor — school projects, an internship, and a few
            small experiments further down this page.
          </p>

          <a
            className="collab magnetic"
            href="#projects"
          >
            <span className="collab-label">
              <small>Have a look around</small>
              <strong>See what I&apos;ve made</strong>
            </span>

            <span
              className="collab-arrow"
              aria-hidden="true"
            >
              <ArrowDownRight />
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
              <strong>3</strong>

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
              LATELY
            </span>

            <p>
              Wrapped up an internship at Boom Technologies,
              edited video for Simple.biz, and rebuilt this site.
            </p>
          </div>

          <div
            className="socials"
            role="group"
            aria-label="Find me elsewhere"
          >
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile, opens in a new tab"
              title="LinkedIn"
            >
              <Linkedin aria-hidden="true" />
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={`Email ${CONTACT_EMAIL}`}
              title="Email"
            >
              <Mail aria-hidden="true" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Résumé, opens in a new tab"
              title="Résumé"
            >
              <FileText aria-hidden="true" />
            </a>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile, opens in a new tab"
              title="GitHub"
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