import { Bot, Boxes, Code2, PenTool } from "lucide-react";
import SectionKicker from "@/components/ui/SectionKicker";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

const icons = {
  design: <PenTool aria-hidden="true" />,
  code: <Code2 aria-hidden="true" />,
  ai: <Bot aria-hidden="true" />,
  boxes: <Boxes aria-hidden="true" />,
};

export default function Services() {
  return (
    <section id="services" className="section shell services">
      <div className="section-heading services-heading">
        <SectionKicker n="01" label="CAPABILITIES" />

        <h2>
          From first idea to <em>final interface.</em>
        </h2>

        <p>
          I bridge design and development so the work stays coherent from
          concept through implementation.
        </p>

        <div className="services-accent" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="service-grid">
        {services.map(({ icon: iconKey, ...service }) => (
          <ServiceCard
            key={service.n}
            {...service}
            icon={icons[iconKey]}
          />
        ))}
      </div>
    </section>
  );
}