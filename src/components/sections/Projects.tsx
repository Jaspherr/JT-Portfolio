import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { padIndex } from "@/lib/utils";

export default function Projects() {
  const total = projects.length;

  return (
    <section id="projects" className="section projects">
      <div className="shell projects-stage">
        <aside className="projects-heading">
          <div className="projects-heading-content">
            <h2 data-draft="set">
              Selected things
              <br />
              <em>I&apos;ve shaped.</em>
            </h2>
            <p className="projects-heading-description">
              Four projects from school and an internship — what each one
              was, what I did on it, and how it turned out.
            </p>
          </div>
        </aside>
        <div className="project-gallery">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={padIndex(i + 1)}
              position={i}
              total={total}
            />
          ))}
        </div>
      </div>
    </section>
  );
}