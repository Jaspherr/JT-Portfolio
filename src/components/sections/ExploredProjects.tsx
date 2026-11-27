import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import Image from "@/components/ui/Image";
import { exploredProjects } from "@/data/exploredProjects";
import type { BlueprintMark } from "@/types";

const KIND_LABEL = {
  independent: "Independent project",
  demo: "Interactive demo · fictional data",
} as const;

// One drafting mark; a zero width or height makes it a single rule.
function markStyle([x, y, width, height]: BlueprintMark, index: number) {
  return {
    "--x": `${x}%`,
    "--y": `${y}%`,
    "--w": `${width}%`,
    "--h": `${height}%`,
    "--i": index,
  } as CSSProperties;
}

function markKind([, , width, height]: BlueprintMark) {
  if (height === 0) return "row";
  if (width === 0) return "column";
  return undefined;
}

export default function ExploredProjects() {
  return (
    <section
      id="explored-projects"
      className="section shell explored"
      aria-labelledby="explored-title"
    >
      <div className="explored-heading">
        <h2 id="explored-title" data-draft="set">
          Explored <em>Projects</em>
        </h2>

        <div className="explored-heading-aside">
          <span className="explored-count" aria-hidden="true">
            {String(exploredProjects.length).padStart(2, "0")} / Live projects
          </span>
          <p>
            Independent experiments and software ideas I worked through in design
            and code. All four are live, so open one and look around.
          </p>
        </div>
      </div>

      <div className="explored-list">
        {exploredProjects.map((project, index) => {
          const id = `explored-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

          return (
            <article
              key={project.name}
              className="explored-item"
              aria-labelledby={`${id}-title`}
              style={{ "--tone": project.tone } as CSSProperties}
            >
              {/* Drafted first: the layout's main blocks are ruled in, then
                  the real screenshot inks over them from the left. */}
              <div className="explored-media" data-draft="frame">
                <span className="draft-spec" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <b />
                </span>

                <span className="explored-blueprint" aria-hidden="true">
                  {project.blueprint.map((mark, markIndex) => (
                    <i
                      key={markIndex}
                      data-rule={markKind(mark)}
                      style={markStyle(mark, markIndex)}
                    />
                  ))}
                </span>

                <div className="explored-shot">
                  <Image
                    src={project.preview}
                    alt={project.previewAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 900px) 94vw, (max-width: 1400px) 58vw, 780px"
                  />
                </div>
              </div>

              <div className="explored-copy">
                <span className="explored-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="explored-kind" data-kind={project.kind}>
                  {KIND_LABEL[project.kind]}
                </p>

                <h3 id={`${id}-title`}>{project.name}</h3>

                <p id={`${id}-description`} className="explored-description">
                  {project.description}
                </p>

                <ul className="explored-stack" aria-label="Built with">
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>

                {/* The link stretches over the whole project, so the preview
                    opens the demo too without a second tab stop. */}
                <a
                  href={project.url}
                  className="explored-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={`${id}-description`}
                >
                  <span>Open live demo</span>
                  <span className="sr-only">
                    {`: ${project.name}, opens in a new tab`}
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
