import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  caseStudies,
  caseStudyOrder,
} from "@/data/caseStudies";

type Props = {
  currentSlug: string;
};

export default function CaseStudyNavigation({
  currentSlug,
}: Props) {
  const currentIndex = caseStudyOrder.indexOf(currentSlug);

  const previousIndex =
    (currentIndex - 1 + caseStudyOrder.length) %
    caseStudyOrder.length;

  const nextIndex =
    (currentIndex + 1) % caseStudyOrder.length;

  const previous = caseStudies[caseStudyOrder[previousIndex]];
  const next = caseStudies[caseStudyOrder[nextIndex]];

  return (
    <nav
      className="case-navigation shell"
      aria-label="Project navigation"
    >
      <Link
        href={`/projects/${previous.slug}`}
        className="case-navigation-item"
      >
        <ArrowLeft aria-hidden="true" />

        <div>
          <span>PREVIOUS PROJECT</span>
          <strong>{previous.projectName}</strong>
        </div>
      </Link>

      <Link
        href={`/projects/${next.slug}`}
        className="case-navigation-item case-navigation-next"
      >
        <div>
          <span>NEXT PROJECT</span>
          <strong>{next.projectName}</strong>
        </div>

        <ArrowRight aria-hidden="true" />
      </Link>
    </nav>
  );
}