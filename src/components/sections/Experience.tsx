import SectionKicker from "@/components/ui/SectionKicker";
import ExperienceItem from "@/components/ui/ExperienceItem";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section shell experience">
      <div className="exp-heading">
        <SectionKicker n="02" label="EXPERIENCE" />

        <h2>
          Learning by
          <br />
          making <em>real things.</em>
        </h2>

        <p>
          A growing path through design, development, and visual storytelling.
        </p>

        <div className="experience-accent" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="experience-timeline">
        {experience.map((item) => (
          <ExperienceItem key={item.index} {...item} />
        ))}
      </div>
    </section>
  );
}