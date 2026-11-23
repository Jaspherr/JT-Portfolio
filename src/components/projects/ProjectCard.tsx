import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";

import Image from "@/components/ui/Image";
import { useDragCarousel } from "@/hooks/useDragCarousel";
import { cn, padIndex } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCardProps = Project & {
  index: string;
  position: number;
  total: number;
};

export default function ProjectCard({
  slug,
  title,
  type,
  githubUrl,
  images,
  description,
  role,
  contributions,
  outcome,
  tags,
  index,
  position,
}: ProjectCardProps) {
  const mobileImages = useMemo(
    () => images.filter((image) => image.type === "mobile"),
    [images],
  );

  const webImages = useMemo(
    () => images.filter((image) => image.type === "web"),
    [images],
  );

  const isSakay = slug === "sakay";

  const projectImages = useMemo(
    () => (isSakay ? [...mobileImages, ...webImages] : images),
    [images, isSakay, mobileImages, webImages],
  );

  const {
    active: activeImage,
    isDragging,
    frameRef,
    previous: previousImage,
    next: nextImage,
    handlers,
  } = useDragCarousel(projectImages.length, ".project-sakay-slide");

  const activeProjectImage = projectImages[activeImage];

  const isMobileImage = activeProjectImage?.type === "mobile";

  const activeMobileIndex = isMobileImage
    ? mobileImages.findIndex((image) => image.src === activeProjectImage?.src)
    : -1;

  const activeWebIndex =
    activeProjectImage?.type === "web"
      ? webImages.findIndex((image) => image.src === activeProjectImage?.src)
      : -1;

  const reverse = position % 2 !== 0;

  return (
    <article
      className={cn("project-case", reverse && "project-case-reverse")}
    >
      <div className="project-case-inner">
        <div className="project-overline">
          <span>Project {index}</span>
        </div>

        <div className="project-case-heading">
          <div className="project-case-number">
            <span>{index}</span>
          </div>

          <h3>{title}</h3>

          <div className="project-case-type">{type}</div>
        </div>

        <div
          className="project-visual"
          role="group"
          aria-roledescription="carousel"
          aria-label={`${title} project previews`}
        >
          <div className="project-visual-meta">
            <span>
              {activeProjectImage?.type === "mobile" ? "Mobile" : "Web"}{" "}
              screens
            </span>
          </div>

          <div
            ref={frameRef}
            className={cn(
              "project-visual-frame",
              isMobileImage && "is-mobile-carousel",
              isSakay && "is-sakay-carousel",
              projectImages.length > 1 && "is-draggable",
              isDragging && "is-dragging",
            )}
            {...handlers}
            data-draft="frame"
          >
            <span className="draft-spec" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <b />
            </span>

            {isSakay && projectImages.length > 1 ? (
              <div className="project-sakay-carousel">
                {projectImages.map((image, imageIndex) => {
                  const offset = imageIndex - activeImage;
                  const distance = Math.abs(offset);

                  const isVisible =
                    image.type === "mobile"
                      ? distance <= 2
                      : distance <= 1;
                  const shouldRenderImage =
                    image.type === "mobile"
                      ? distance <= 3
                      : distance <= 2;

                  return (
                    <div
                      key={image.src}
                      className={cn(
                        "project-sakay-slide",
                        image.type === "mobile" ? "is-mobile" : "is-web",
                        offset === 0 && "is-active",
                        !isVisible && "is-hidden",
                      )}
                      aria-hidden={offset !== 0}
                      style={
                        {
                          "--sakay-offset": offset,
                          "--sakay-distance": Math.abs(offset),
                        } as React.CSSProperties
                      }
                    >
                      <div className="project-sakay-media">
                        {shouldRenderImage && (
                          <Image
                            src={image.src}
                            alt={`${title} ${image.type} project preview ${
                              imageIndex + 1
                            }`}
                            fill
                            sizes={
                              image.type === "mobile"
                                ? "260px"
                                : "(max-width: 800px) 90vw, 650px"
                            }
                            draggable={false}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : isMobileImage && projectImages.length > 1 ? (

              <div className="project-mobile-carousel">
                {mobileImages.map((image, imageIndex) => {
                  const offset = imageIndex - activeMobileIndex;

                  const distance = Math.abs(offset);
                  const isVisible = distance <= 2;
                  const shouldRenderImage = distance <= 3;

                  return (
                    <div
                      key={image.src}
                      className={cn(
                        "project-mobile-slide",
                        offset === 0 && "is-active",
                        !isVisible && "is-hidden",
                      )}
                      aria-hidden={offset !== 0}
                      style={
                        {
                          "--slide-offset": offset,
                          "--slide-distance": Math.abs(offset),
                        } as React.CSSProperties
                      }
                    >
                      {shouldRenderImage && (
                        <Image
                          src={image.src}
                          alt={`${title} mobile project preview ${
                            imageIndex + 1
                          }`}
                          fill
                          sizes="260px"
                          draggable={false}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : projectImages.length > 1 ? (

              <div className="project-web-carousel">
                {webImages.map((image, imageIndex) => {
                  const offset = imageIndex - activeWebIndex;

                  const distance = Math.abs(offset);
                  const isVisible = distance <= 1;
                  const shouldRenderImage = distance <= 2;

                  return (
                    <div
                      key={image.src}
                      className={cn(
                        "project-web-slide",
                        offset === 0 && "is-active",
                        !isVisible && "is-hidden",
                      )}
                      aria-hidden={offset !== 0}
                      style={
                        {
                          "--web-offset": offset,
                          "--web-distance": Math.abs(offset),
                        } as React.CSSProperties
                      }
                    >
                      {shouldRenderImage && (
                        <Image
                          src={image.src}
                          alt={`${title} web project preview ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 800px) 90vw, 650px"
                          draggable={false}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Image
                src={projectImages[0].src}
                alt={`${title} project preview`}
                fill
                sizes="(max-width: 800px) 100vw, 70vw"
                className="project-showcase-image"
                draggable={false}
              />
            )}
          </div>

          <div className="project-media-nav">
            {projectImages.length > 1 && (
              <div
                className="project-media-controls"
                role="group"
                aria-label={`${title} project image controls`}
              >
                <button
                  type="button"
                  onClick={previousImage}
                  disabled={activeImage === 0}
                  aria-label={`Previous ${title} image`}
                >
                  <ArrowLeft aria-hidden="true" />
                </button>

                <span
                  className="project-media-count"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">
                    Image {activeImage + 1} of {projectImages.length}
                  </span>

                  <b aria-hidden="true">
                    {padIndex(activeImage + 1)}
                  </b>

                  <i aria-hidden="true">/</i>

                  <span aria-hidden="true">
                    {padIndex(projectImages.length)}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={nextImage}
                  disabled={activeImage === projectImages.length - 1}
                  aria-label={`Next ${title} image`}
                >
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="project-summary">
          <div className="project-summary-block project-summary-brief">
            <span>What it is</span>

            <p>{description}</p>
          </div>

          <div className="project-summary-block project-summary-role">
            <span>My role</span>

            <strong>{role}</strong>
          </div>
        </div>

        <div className="project-impact">
          <div className="project-result">
            <span>How it turned out</span>

            <p>{outcome}</p>

            <div className="project-result-actions">
              <Link
                to={`/projects/${slug}`}
                className="project-case-study-link"
                aria-label={`View full ${title} case study`}
              >
                <span className="project-action-label">
                  Read the case study
                </span>

                <ArrowUpRight
                  className="project-action-arrow"
                  aria-hidden="true"
                />
              </Link>

              {githubUrl && (
                <a
                  href={githubUrl}
                  className="project-github-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} repository on GitHub, opens in a new tab`}
                >
                  <span className="project-action-label">Code on GitHub</span>

                  <ArrowUpRight
                    className="project-action-arrow"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>

          <div className="project-impact-heading">
            <span>What I did</span>
          </div>

          <div className="project-contribution-list">
            {contributions.map((contribution, i) => (
              <div className="project-contribution-item" key={contribution}>
                <span>{padIndex(i + 1)}</span>

                <strong>{contribution}</strong>
              </div>
            ))}
          </div>

        </div>

        <div className="project-footer">
          <div className="project-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}