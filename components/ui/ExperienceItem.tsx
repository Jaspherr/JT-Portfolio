import { ArrowUpRight } from "lucide-react";

import type { Experience } from "@/types";

export default function ExperienceItem({
  index,
  company,
  role,
  date,
  text,
}: Experience) {
  return (
    <article className="timeline-job">
      <div className="timeline-date">
        <span>{index}</span>
        <p>{date}</p>
      </div>

      <div className="timeline-marker">
        <span />
      </div>

      <div className="timeline-content">
        <span className="timeline-role">
          {role}
        </span>

        <h3>{company}</h3>

        <p>{text}</p>

        <div className="timeline-bottom">
          <span>{date}</span>
          <ArrowUpRight aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}