"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/types";
import Link from "next/link";

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
  total,
}: ProjectCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const visualFrameRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const pointerId = useRef<number | null>(null);
  const dragFrame = useRef(0);
  const pendingDragX = useRef(0);

  const DRAG_THRESHOLD = 55;

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

  const activeProjectImage = projectImages[activeImage];

  const isMobileImage = activeProjectImage?.type === "mobile";

  const activeMobileIndex = isMobileImage
    ? mobileImages.findIndex((image) => image.src === activeProjectImage?.src)
    : -1;

  const activeWebIndex =
    activeProjectImage?.type === "web"
      ? webImages.findIndex((image) => image.src === activeProjectImage?.src)
      : -1;

  const previousImage = () => {
    setActiveImage((current) => Math.max(current - 1, 0));
  };

  const nextImage = () => {
    setActiveImage((current) =>
      Math.min(current + 1, projectImages.length - 1),
    );
  };

  const getDragDistance = (clientX: number) => {
    let distance = clientX - dragStartX.current;

    if (
      (activeImage === 0 && distance > 0) ||
      (activeImage === projectImages.length - 1 && distance < 0)
    ) {
      distance *= 0.25;
    }

    return distance;
  };

  const applyDragDistance = (distance: number) => {
    const frame = visualFrameRef.current;

    if (!frame) return;

    const value = `${distance}px`;

    frame.style.setProperty("--drag-x", value);

    // Sakay defines its own --drag-x value in the existing CSS, so update
    // those slides directly as well. This keeps the visual behavior identical
    // without forcing a React render on every pointer move.
    frame
      .querySelectorAll<HTMLElement>(".project-sakay-slide")
      .forEach((slide) => {
        slide.style.setProperty("--drag-x", value);
      });
  };

  const scheduleDragPaint = (distance: number) => {
    pendingDragX.current = distance;

    window.cancelAnimationFrame(dragFrame.current);

    dragFrame.current = window.requestAnimationFrame(() => {
      applyDragDistance(pendingDragX.current);
    });
  };

  const resetPointerState = () => {
    window.cancelAnimationFrame(dragFrame.current);
    pendingDragX.current = 0;
    applyDragDistance(0);

    setIsDragging(false);
    pointerId.current = null;
  };

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(dragFrame.current);
    };
  }, []);

  const releasePointer = (
    element: HTMLDivElement,
    id: number,
  ) => {
    if (element.hasPointerCapture(id)) {
      element.releasePointerCapture(id);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (projectImages.length <= 1) return;

    pointerId.current = e.pointerId;
    dragStartX.current = e.clientX;

    setIsDragging(true);

    window.cancelAnimationFrame(dragFrame.current);
    pendingDragX.current = 0;
    applyDragDistance(0);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) {
      return;
    }

    scheduleDragPaint(getDragDistance(e.clientX));
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) {
      return;
    }

    // Use the pointer-up position instead of React state so a very quick
    // drag-and-release cannot miss the final pointer movement.
    const finalDistance = getDragDistance(e.clientX);

    if (
      finalDistance <= -DRAG_THRESHOLD &&
      activeImage < projectImages.length - 1
    ) {
      setActiveImage((current) => current + 1);
    } else if (
      finalDistance >= DRAG_THRESHOLD &&
      activeImage > 0
    ) {
      setActiveImage((current) => current - 1);
    }

    releasePointer(e.currentTarget, e.pointerId);
    resetPointerState();
  };

  const handlePointerCancel = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (pointerId.current !== e.pointerId) {
      return;
    }

    // A browser/OS cancellation should never advance the carousel.
    releasePointer(e.currentTarget, e.pointerId);
    resetPointerState();
  };

  const handleLostPointerCapture = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (pointerId.current === e.pointerId) {
      resetPointerState();
    }
  };

  const reverse = position % 2 !== 0;

  return (
    <article
      className={`project-case ${reverse ? "project-case-reverse" : ""}`}
    >
      <div className="project-case-inner">
        <div className="project-overline">
          <span>CASE STUDY / {index}</span>
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
              PROJECT PREVIEW
              {activeProjectImage && (
                <> · {activeProjectImage.type.toUpperCase()}</>
              )}
            </span>

            <span>
              {String(activeImage + 1).padStart(2, "0")}

              <i>/</i>

              {String(projectImages.length).padStart(2, "0")}
            </span>
          </div>

          <div
            ref={visualFrameRef}
            className={[
              "project-visual-frame",
              isMobileImage ? "is-mobile-carousel" : "",
              isSakay ? "is-sakay-carousel" : "",
              projectImages.length > 1 ? "is-draggable" : "",
              isDragging ? "is-dragging" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerCancel}
            onLostPointerCapture={handleLostPointerCapture}
          >

            {isSakay && projectImages.length > 1 ? (
              <div className="project-sakay-carousel">
                {projectImages.map((image, imageIndex) => {
                  const offset = imageIndex - activeImage;
                  const distance = Math.abs(offset);

                  const isVisible =
                    image.type === "mobile"
                      ? distance <= 2
                      : distance <= 1;

                  // Keep one extra slide beyond the visible range mounted so
                  // the next interaction is already decoded, while avoiding
                  // loading every hidden project screenshot at once.
                  const shouldRenderImage =
                    image.type === "mobile"
                      ? distance <= 3
                      : distance <= 2;

                  return (
                    <div
                      key={image.src}
                      className={[
                        "project-sakay-slide",
                        image.type === "mobile" ? "is-mobile" : "is-web",
                        offset === 0 ? "is-active" : "",
                        !isVisible ? "is-hidden" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
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
                      className={`project-mobile-slide ${
                        offset === 0 ? "is-active" : ""
                      } ${!isVisible ? "is-hidden" : ""}`}
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
                      className={`project-web-slide ${
                        offset === 0 ? "is-active" : ""
                      } ${!isVisible ? "is-hidden" : ""}`}
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
                    {String(activeImage + 1).padStart(2, "0")}
                  </b>

                  <i aria-hidden="true">/</i>

                  <span aria-hidden="true">
                    {String(projectImages.length).padStart(2, "0")}
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
            <span>PROJECT BRIEF</span>

            <p>{description}</p>
          </div>

          <div className="project-summary-block project-summary-role">
            <span>MY ROLE</span>

            <strong>{role}</strong>
          </div>
        </div>

        <div className="project-impact">
          <div className="project-impact-heading">
            <span>MY CONTRIBUTION</span>

            <small>WHAT I BROUGHT TO THE PROJECT</small>
          </div>

          <div className="project-contribution-list">
            {contributions.map((contribution, i) => (
              <div className="project-contribution-item" key={contribution}>
                <span>{String(i + 1).padStart(2, "0")}</span>

                <strong>{contribution}</strong>
              </div>
            ))}
          </div>

          <div className="project-result">
            <span>OUTCOME</span>

            <p>{outcome}</p>

            <div className="project-result-actions">
              <Link
                href={`/projects/${slug}`}
                className="project-case-study-link"
                aria-label={`View full ${title} case study`}
              >
                <span className="project-action-label">
                  VIEW FULL CASE STUDY
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
                  <span className="project-action-label">GITHUB</span>

                  <ArrowUpRight
                    className="project-action-arrow"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="project-footer">
          <div className="project-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="project-position">
            <span>{index}</span>

            <div />

            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </article>
  );
}