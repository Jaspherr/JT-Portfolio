import { Fragment } from "react";
import { useParams } from "react-router";

import CaseStudyPage from "@/components/projects/CaseStudyPage";
import JsonLd from "@/components/shared/JsonLd";
import { caseStudies } from "@/data/caseStudies";
import { caseStudyJsonLd } from "@/lib/structured-data";
import NotFoundPage from "@/pages/NotFoundPage";

export default function CaseStudyRoute() {
  const { slug = "" } = useParams();
  const project = caseStudies[slug];

  if (!project) return <NotFoundPage />;
  return (
    <Fragment key={project.slug}>
      <JsonLd data={caseStudyJsonLd(project)} />
      <CaseStudyPage project={project} />
    </Fragment>
  );
}