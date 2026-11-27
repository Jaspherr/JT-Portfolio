import { Bot, Boxes, Code2, PenTool } from "lucide-react";
import AiScene from "@/components/services/AiScene";
import CodeScene from "@/components/services/CodeScene";
import DesignScene from "@/components/services/DesignScene";
import HandoffScene from "@/components/services/HandoffScene";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

const icons = {
  design: <PenTool aria-hidden="true" />,
  code: <Code2 aria-hidden="true" />,
  ai: <Bot aria-hidden="true" />,
  boxes: <Boxes aria-hidden="true" />,
};

const scenes = {
  design: DesignScene,
  code: CodeScene,
  ai: AiScene,
  boxes: HandoffScene,
};

export default function Services() {
  return (
    <section id="services" className="section shell services">
      <div className="section-heading services-heading">
        <h2 data-draft="set">
          Design, code &amp;
          <br />
          <em>everything between.</em>
        </h2>

        <p>
          The four things I keep coming back to. Each has a small animated
          sketch I built for this page — they keep working on their own, so
          pause them whenever you like.
        </p>

        <div className="services-accent" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="service-grid">
        {services.map(({ icon: iconKey, ...service }) => {
          const Scene = scenes[iconKey];

          return (
            <ServiceCard
              key={service.n}
              {...service}
              icon={icons[iconKey]}
              scene={<Scene title={service.title} />}
            />
          );
        })}
      </div>
    </section>
  );
}