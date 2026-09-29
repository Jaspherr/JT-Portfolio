import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { CaseStudy } from "@/types/caseStudy";
import CaseStudyNavigation from "./CaseStudyNavigation";
import PortfolioAnimations from "@/components/animations/PortfolioAnimations";
import { RESUME_URL } from "@/lib/site";

type Props = {
  project: CaseStudy;
};

function textOrDash(value?: string | null) {
  return value?.trim() || "—";
}

function joinMeta(...values: Array<string | null | undefined>) {
  const validValues = values.filter(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );
  return validValues.length > 0 ? validValues.join(" · ") : "—";
}

export default function CaseStudyPage({ project }: Props) {
  const technicalConsiderations =
    project.strategy.technicalConsiderations ?? [];
  const designPrinciples = project.strategy.designPrinciples ?? [];
  const challengeParagraphs = project.challenge.description ?? [];
  const features = project.features ?? [];
  const outcomes = project.results.outcomes ?? [];
  const takeaways = project.results.takeaways ?? [];
  const hasOutcomeDetails = outcomes.length > 0 || takeaways.length > 0;
  const outcomeSectionNumber = features.length > 0 ? "03" : "02";

  const metadata = [
    {
      label: "ROLE",
      value: textOrDash(project.role),
    },
    {
      label: "PLATFORM",
      value: textOrDash(project.platform),
    },
    {
      label: "PROJECT TYPE",
      value: textOrDash(project.projectType),
    },
    {
      label: "YEAR · DURATION",
      value: joinMeta(project.year, project.duration),
    },
    {
      label: "CONTEXT · TEAM",
      value: joinMeta(project.context, project.team),
    },
    {
      label: "AUDIENCE · STACK",
      value: joinMeta(project.audience, project.stack),
    },
  ];

  return (
    <main className="case-study" aria-labelledby="case-title">
      <a className="skip-link" href="#case-content">
        Skip to case study content
      </a>
      <PortfolioAnimations key={project.slug} />
      <header className="case-study-nav shell">
        <nav
          className="case-study-nav-links"
          aria-label="Case study quick navigation"
        >
          <Link href="/#projects">Selected Work</Link>
          <Link href="/#contact">Contact</Link>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Résumé, opens in a new tab"
          >
            Résumé
          </a>
        </nav>
        <span className="case-study-nav-current">
          {project.projectName}
        </span>
      </header>
      <section
        id="case-content"
        className="case-hero shell"
        tabIndex={-1}
        aria-labelledby="case-title"
      >
        <div className="case-topbar">
          <Link href="/#projects" className="case-back">
            <ArrowLeft aria-hidden="true" />
            <span>Selected Work</span>
          </Link>
          <span className="case-label">CASE STUDY</span>
        </div>
        <div className="case-heading">
          <span className="case-eyebrow">{project.eyebrow}</span>
          <h1 id="case-title">{project.projectName}</h1>
          <div className="case-heading-bottom">
            <p>{project.impact}</p>
          </div>
        </div>
        <div
          className={[
            "case-hero-showcase",
            project.heroImageType === "mobile"
              ? "case-hero-showcase--mobile"
              : "case-hero-showcase--web",
          ].join(" ")}
        >
          <div className="case-hero-showcase-top">
            <span>PROJECT PREVIEW</span>
          </div>
          <div className="case-hero-canvas">
            <div className="case-hero-media">
              <Image
                src={project.heroImage}
                alt={`${project.projectName} project interface`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 480px) 88vw, (max-width: 800px) 90vw, 1120px"
              />
            </div>
          </div>
        </div>
        <div className="case-meta" role="group" aria-label="Project details">
          {metadata.map(({ label, value }) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        {project.githubUrl && (
          <div className="case-actions">
            <a
              className="case-action"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.projectName} repository, opens in a new tab`}
            >
              <span className="case-action-content">
                <Github aria-hidden="true" />
                <span>View Repository</span>
              </span>
              <ArrowUpRight className="case-action-arrow" aria-hidden="true" />
            </a>
          </div>
        )}
      </section>
      <section
        className="case-section shell"
        aria-labelledby="case-overview-label"
      >
        <div className="case-section-heading">
          <span>01</span>
          <p id="case-overview-label">OVERVIEW</p>
        </div>
        <div className="case-overview-grid">
          <article>
            <span className="case-small-label">THE CHALLENGE</span>
            <h2>{project.challenge.heading}</h2>
            {challengeParagraphs.length > 0 && (
              <div className="case-paragraphs">
                {challengeParagraphs.map((paragraph, index) => (
                  <p key={`${index}-${paragraph}`}>{paragraph}</p>
                ))}
              </div>
            )}
          </article>
          <article>
            <span className="case-small-label">THE APPROACH</span>
            <h2>Designing for clarity and context.</h2>
            {project.strategy.introduction && (
              <p className="case-approach">{project.strategy.introduction}</p>
            )}
            {designPrinciples.length > 0 && (
              <ol className="case-principles">
                {designPrinciples.map((principle, index) => (
                  <li key={`${index}-${principle}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{principle}</p>
                  </li>
                ))}
              </ol>
            )}
          </article>
        </div>
        {technicalConsiderations.length > 0 && (
          <div className="case-technical-grid">
            <div className="case-technical-intro">
              <span className="case-small-label">TECHNICAL CONSIDERATIONS</span>
              <h2>How the product thinking translated into the build.</h2>
            </div>
            <ul className="case-technical-list">
              {technicalConsiderations.map((consideration, index) => (
                <li key={`${index}-${consideration}`}>{consideration}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      {features.length > 0 && (
        <section
          className="case-features"
          aria-labelledby="case-features-label"
        >
          <div className="shell">
            <div className="case-section-heading">
              <span>02</span>
              <p id="case-features-label">KEY FEATURES</p>
            </div>
            <div className="case-features-header">
              <h2>
                Key moments in
                <br />
                <em>the experience.</em>
              </h2>
              <p>
                A closer look at the primary interfaces that shaped the project
                experience.
              </p>
            </div>
            <div
              className={[
                "case-feature-grid",
                features.length === 1 ? "case-feature-grid-single" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {features.map((feature) => (
                <article
                  className="case-feature-card"
                  key={`${feature.number}-${feature.title}`}
                >
                  <div
                    className={[
                      "case-feature-image",
                      feature.imageType === "mobile"
                        ? "case-feature-image--mobile"
                        : "case-feature-image--web",
                    ].join(" ")}
                  >
                    <Image
                      src={feature.image}
                      alt={`${project.projectName} — ${feature.title}`}
                      fill
                      loading="eager"
                      sizes={
                        feature.imageType === "mobile"
                          ? "(max-width: 800px) 70vw, 320px"
                          : "(max-width: 800px) 94vw, 640px"
                      }
                    />
                  </div>

                  <div className="case-feature-info">
                    <div className="case-feature-title">
                      <span>{feature.number}</span>
                      <h3>{feature.title}</h3>
                    </div>

                    <p>{feature.description}</p>

                    <div className="case-feature-meta">
                      <div>
                        <span>USER VALUE</span>
                        <p>{feature.userValue}</p>
                      </div>

                      <div>
                        <span>IMPLEMENTATION</span>
                        <p>{feature.implementation}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <section
        className="case-section shell case-outcome"
        aria-labelledby="case-outcome-label"
      >
        <div className="case-section-heading">
          <span>{outcomeSectionNumber}</span>
          <p id="case-outcome-label">OUTCOME</p>
        </div>
        <div
          className={[
            "case-outcome-layout",
            !hasOutcomeDetails ? "case-outcome-layout--single" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="case-outcome-lead">
            <span className="case-small-label">PROJECT RESULT</span>
            <h2>
              The result &
              <br />
              <em>what I learned.</em>
            </h2>
            <p>{project.impact}</p>
          </div>
          {hasOutcomeDetails && (
            <div className="case-outcome-lists">
              {outcomes.length > 0 && (
                <article>
                  <span className="case-small-label">OUTCOMES</span>
                  <ul>
                    {outcomes.map((outcome, index) => (
                      <li key={`${index}-${outcome}`}>{outcome}</li>
                    ))}
                  </ul>
                </article>
              )}
              {takeaways.length > 0 && (
                <article>
                  <span className="case-small-label">KEY TAKEAWAYS</span>
                  <ul>
                    {takeaways.map((takeaway, index) => (
                      <li key={`${index}-${takeaway}`}>{takeaway}</li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          )}
        </div>
      </section>
      <CaseStudyNavigation currentSlug={project.slug} />
      <div className="case-home shell">
        <Link href="/#projects">
          <span>BACK TO SELECTED WORK</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
