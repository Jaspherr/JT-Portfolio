import SectionKicker from "@/components/ui/SectionKicker";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
export default function Projects() {
  const total = projects.length;
  return (
    <section id="projects" className="section projects">
      <div className="shell projects-stage">
        <aside className="projects-heading reveal">
          <div className="projects-heading-content">
            <SectionKicker n="03" label="SELECTED WORK" />
            <h2>
              Selected things
              <br />
              <em>I&apos;ve shaped.</em>
            </h2>
            <p className="projects-heading-description">
              A selection of product work across web, mobile, AI, and
              operational interfaces.
            </p>
          </div>
          <div className="projects-heading-footer">
            <span>2024 — 2026</span>
            <div className="projects-heading-line">
              <span />
            </div>
            <span>{String(total).padStart(2, "0")} PROJECTS</span>
          </div>
        </aside>
        <div className="project-gallery">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={String(i + 1).padStart(2, "0")}
              position={i}
              total={total}
            />
          ))}
        </div>
      </div>
    </section>
  );
}