import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import Image from "@/components/ui/Image";
import { exploredProjects } from "@/data/exploredProjects";

export default function ExploredProjects() {
  return (
    <section
      id="explored-projects"
      className="section shell explored"
      aria-labelledby="explored-title"
    >
      <div className="explored-heading">
        <div className="explored-heading-main">
          <span className="explored-eyebrow" aria-hidden="true">
            <span className="explored-eyebrow-mark" /> Independent work
          </span>
          <h2 id="explored-title" data-draft="set">
            Explored <em>Projects</em>
          </h2>
        </div>

        <div className="explored-heading-aside">
          <span className="explored-count" aria-hidden="true">
            {String(exploredProjects.length).padStart(2, "0")} / Selected projects
          </span>
          <p>
            Independent experiments and software ideas I worked through in design
            and code. All four are live, so open one and look around.
          </p>
        </div>
      </div>

      <div className="explored-grid">
        {exploredProjects.map((project, index) => (
          <article
            key={project.name}
            className="explored-item"
            style={{ "--tone": project.tone } as CSSProperties}
          >
            <a
              href={project.url}
              className="explored-card-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore project: ${project.name}, opens in a new tab`}
            >
              <div className="explored-frame" data-draft="frame">
                <div className="explored-frame-meta" aria-hidden="true">
                  <span>Project / {String(index + 1).padStart(2, "0")}</span>
                  <span className="explored-frame-symbol">↗</span>
                </div>

                <div className="explored-mat">
                  <div className="explored-browser">
                    <div className="explored-browser-bar" aria-hidden="true">
                      <span className="explored-browser-label">Project preview</span>
                      <span className="explored-browser-suffix">↗</span>
                    </div>
                    <div className="explored-screen">
                      <Image
                        src={project.preview}
                        alt={project.previewAlt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 900px) 92vw, (max-width: 1400px) 45vw, 610px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="explored-copy">
                <div className="explored-title">
                  <h3>{project.name}</h3>
                  <span>{project.category}</span>
                </div>

                <p>{project.description}</p>

                <div className="explored-foot">
                  <ul aria-label={`${project.name} built with`}>
                    {project.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>

                  <span className="explored-link" aria-hidden="true">
                    <span>Explore project</span>
                    <span className="explored-link-icon">
                      <ArrowUpRight />
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
