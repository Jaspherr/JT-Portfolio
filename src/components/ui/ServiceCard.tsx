import type { Service } from "@/types";
import type { ReactNode } from "react";

type ServiceCardProps = Omit<Service, "icon"> & {
  icon: ReactNode;
};

export default function ServiceCard({
  n,
  title,
  text,
  chips,
  icon,
}: ServiceCardProps) {
  return (
    <article className={`service-card service-card-${n}`}>
      <div className="service-top">
        <div className="service-number">
          <span>{n}</span>
          {n === "01" && <small>PRIMARY</small>}
        </div>

        <div className="service-icon">{icon}</div>
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        <p>{text}</p>

        <div className="service-divider" />

        <div className="service-tags">
          {chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <span className="service-watermark" aria-hidden="true">
        {n}
      </span>

      <span className="service-edge" aria-hidden="true" />
    </article>
  );
}