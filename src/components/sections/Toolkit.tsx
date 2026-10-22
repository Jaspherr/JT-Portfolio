import {
  Code2,
  FileSearch,
  LayoutGrid,
  PenTool,
  type LucideIcon,
} from "lucide-react";

import SectionKicker from "@/components/ui/SectionKicker";
import { skills } from "@/data/skills";

const icons: Record<string, LucideIcon> = {
  Development: Code2,
  "Design & UX": PenTool,
  "Strategy & Content": FileSearch,
  "Creative Workflow": LayoutGrid,
};

export default function Toolkit() {
  return (
    <section id="toolkit" className="section shell tools">
      <div className="tools-intro">
        <SectionKicker n="04" label="TOOLKIT" />

        <h2>
          Tools change.
          <br />
          <em>Craft stays.</em>
        </h2>

        <p>
          I move between design, code, strategy, and creative tools depending on
          what the work needs.
        </p>

        <div className="tools-accent" aria-hidden="true">
          <span />
        </div>

        <div className="tools-note">
          <span>04</span>

          <div>
            <small>DISCIPLINES</small>
            <p>ACROSS MY WORK</p>
          </div>
        </div>
      </div>

      <div className="toolkit-index">
        {skills.map((skill) => {
          const Icon = icons[skill.title];

          return (
            <article key={skill.n} className="toolkit-row">
              <div className="toolkit-row-head">
                <span className="toolkit-number">{skill.n}</span>

                <div className="toolkit-title">
                  <span className="toolkit-icon" aria-hidden="true">
                    {Icon && <Icon />}
                  </span>

                  <h3>{skill.title}</h3>
                </div>

                <span className="toolkit-mark" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </div>

              <div className="toolkit-row-body">
                <p>{skill.desc}</p>

                <div className="toolkit-tags">
                  {skill.chips.map((chip) => (
                    <span className="toolkit-tag" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <span className="toolkit-row-accent" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}