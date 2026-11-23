import { useRef } from "react";
import { ArrowDownRight, FileText, Github, Linkedin, Mail } from "lucide-react";

import { useHeroBlueprint } from "@/hooks/useHeroBlueprint";
import { useIntroReady } from "@/hooks/useIntroReady";
import { CONTACT_EMAIL, RESUME_URL, SOCIAL_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAME = "JASPHER";
const FIRST_LINE_LETTER = 3;

const letterClass = (index: number) =>
  index >= FIRST_LINE_LETTER
    ? "hero-name-letter-line"
    : "hero-name-letter-solid";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useIntroReady(heroRef, "hero-ready");
  useHeroBlueprint(nameRef);

  return (
    <section ref={heroRef} id="intro" className="hero hero-intro shell">
      <div className="hero-name">
        <div className="hero-lockup">
          <h1 ref={nameRef} aria-label="JASPHER">
            <span className="hero-im" aria-hidden="true">
              I&apos;M
            </span>

            <span className="hero-name-letters" aria-hidden="true">
              {NAME.split("").map((letter, index) => (
                <span
                  className={cn("hero-name-letter", letterClass(index))}
                  key={`${letter}-${index}`}
                >
                  {letter}
                </span>
              ))}
            </span>

            <span className="hero-blueprint" aria-hidden="true">
              <span className="hero-bp-guide hero-bp-cap">
                <em>Cap height</em>
              </span>

              <span className="hero-bp-guide hero-bp-base">
                <em>Baseline</em>
              </span>

              <span className="hero-bp-letters">
                {NAME.split("").map((letter, index) => (
                  <span
                    className={cn("hero-bp-letter", letterClass(index))}
                    key={`bp-${letter}-${index}`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </span>

            <span className="hero-lens" aria-hidden="true" />
          </h1>
        </div>
      </div>

      <div className="hero-intro-row">
        <p className="hero-designer">
          , a designer who enjoys figuring things out.
        </p>

        <p className="hero-lede">
          <strong>
            I like making things look good,{" "}
            <em>but I also want them to work well.</em>
          </strong>{" "}
          I like experimenting, exploring different approaches, and seeing what
          I can create with design and code, with a little help from AI. This
          little corner of the internet is where I share the projects,
          experiments, and things I've learned along the way.
        </p>
      </div>

      <div className="hero-actions">
        <a className="collab" href="#projects">
          <span className="collab-label">
            <small>Have a look around</small>
            <strong>See what I&apos;ve made</strong>
          </span>

          <span className="collab-arrow" aria-hidden="true">
            <ArrowDownRight />
          </span>
        </a>

        <div className="socials" role="group" aria-label="Find me elsewhere">
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
      </div>
    </section>
  );
}
