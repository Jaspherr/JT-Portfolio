import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";

import VideoReel from "@/components/sections/VideoReel";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export default function About() {
  const certificateRef = useRef<HTMLSpanElement>(null);
  const certificateLinkRef = useRef<HTMLAnchorElement>(null);
  const [certificateVisible, setCertificateVisible] = useState(false);
  const previewSuppressedRef = useRef(false);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const dismissedAtRef = useRef<{ x: number; y: number } | null>(null);

  const dismissCertificate = useCallback(() => {
    previewSuppressedRef.current = true;
    dismissedAtRef.current = lastPointerRef.current;
    setCertificateVisible(false);
  }, []);

  useEffect(() => {
    const onWindowReturn = () => {
      setCertificateVisible(false);
      if (!certificateLinkRef.current?.matches(":hover")) {
        previewSuppressedRef.current = false;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") onWindowReturn();
      else dismissCertificate();
    };

    const onWindowPointerOut = (event: globalThis.PointerEvent) => {
      if (event.relatedTarget === null) dismissCertificate();
    };

    const onWindowPointerMove = (event: globalThis.PointerEvent) => {
      if (!previewSuppressedRef.current || !certificateLinkRef.current) return;
      if (!event.composedPath().includes(certificateLinkRef.current)) {
        previewSuppressedRef.current = false;
        dismissedAtRef.current = null;
      }
    };

    window.addEventListener("blur", dismissCertificate);
    window.addEventListener("focus", onWindowReturn);
    window.addEventListener("pagehide", dismissCertificate);
    window.addEventListener("pointerout", onWindowPointerOut);
    window.addEventListener("pointermove", onWindowPointerMove, { capture: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("blur", dismissCertificate);
      window.removeEventListener("focus", onWindowReturn);
      window.removeEventListener("pagehide", dismissCertificate);
      window.removeEventListener("pointerout", onWindowPointerOut);
      window.removeEventListener("pointermove", onWindowPointerMove, { capture: true });
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [dismissCertificate]);

  const positionCertificate = (clientX: number, clientY: number) => {
    const preview = certificateRef.current;
    if (!preview) return;

    const width = preview.offsetWidth;
    const height = preview.offsetHeight;
    const gap = 14;
    const margin = 12;

    let left = clientX + gap;
    if (left + width > window.innerWidth - margin) {
      left = clientX - width - gap;
    }
    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - width - margin),
    );

    let top = clientY + gap;
    if (top + height > window.innerHeight - margin) {
      top = clientY - height - gap;
    }
    top = Math.max(
      margin,
      Math.min(top, window.innerHeight - height - margin),
    );

    preview.style.left = `${left}px`;
    preview.style.top = `${top}px`;
    preview.dataset.placement = top < clientY ? "top" : "bottom";
  };

  const moveCertificate = (event: PointerEvent<HTMLAnchorElement>) => {
    if (
      event.pointerType === "touch" ||
      previewSuppressedRef.current ||
      !document.hasFocus()
    ) return;

    lastPointerRef.current = { x: event.clientX, y: event.clientY };
    positionCertificate(event.clientX, event.clientY);
    setCertificateVisible(true);
  };

  const enterCertificate = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch" || !document.hasFocus()) return;

    if (previewSuppressedRef.current) {
      const dismissed = dismissedAtRef.current;
      if (
        dismissed &&
        Math.hypot(event.clientX - dismissed.x, event.clientY - dismissed.y) < 2
      ) return;
    }

    previewSuppressedRef.current = false;
    dismissedAtRef.current = null;
    moveCertificate(event);
  };

  return (
    <>
      <section id="about" className="section shell about">
        <div className="about-main">
          <div className="about-story">
            <h2 data-draft="set">
              A bit about the <em>person behind it.</em>
            </h2>
            <p className="about-lead">
              I&apos;m Jaspher, an AI Design Engineer who enjoys figuring things
              out, trying different approaches, and seeing where an idea can go.
              I&apos;m currently exploring how design, code, and prompt
              engineering fit together.
            </p>
  
            <p>
              So far, that&apos;s meant school projects that grew into full
              systems, an internship designing and building an admin platform, and
              some freelance video editing that taught me a thing or two about
              pacing, visuals, and motion.
            </p>
  
            <p>
              Lately, I&apos;ve been exploring prompt engineering and how it fits
              into my creative process. I start with an idea, work through the
              details with ChatGPT, and use Claude Code to bring it to life. From
              there, I review the results, make adjustments, and keep
              experimenting until everything feels right.
            </p>
  
            <p>
              I&apos;d rather make something useful and thoughtful than
              complicated for the sake of it. Still learning, still experimenting,
              and still figuring things out. This portfolio included.
            </p>
          </div>
  
          <section className="about-block" aria-labelledby="about-moment">
            <h3 id="about-moment">Along the way</h3>
  
            <p className="about-moment">
              <Link to="/projects/sakay">Sakay</Link>, our capstone, received{" "}
              <em>Best System Development</em> — and my UI/UX work on it was
              recognised as{" "}
              <a
                href="/certificate/cor.jpg"
                className="about-certificate-trigger"
                ref={certificateLinkRef}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={enterCertificate}
                onPointerMove={moveCertificate}
                onPointerLeave={() => {
                  setCertificateVisible(false);
                  lastPointerRef.current = null;
                  previewSuppressedRef.current = false;
                  dismissedAtRef.current = null;
                }}
                onPointerCancel={dismissCertificate}
                onPointerDown={dismissCertificate}
                onClick={dismissCertificate}
                onDragStart={(event) => event.preventDefault()}
                onFocus={(event) => {
                  if (
                    previewSuppressedRef.current ||
                    !document.hasFocus() ||
                    !event.currentTarget.matches(":focus-visible")
                  ) return;

                  const rect = event.currentTarget.getBoundingClientRect();
                  positionCertificate(rect.right, rect.top);
                  setCertificateVisible(true);
                }}
                onBlur={() => setCertificateVisible(false)}
                aria-label="View certificate for Most Outstanding UI/UX Designer"
              >
                <em>Most Outstanding UI/UX Designer.</em>
              </a>
            </p>
          </section>
      </div>

      <div className="about-notes">
        <section className="about-block" aria-labelledby="about-work">
          <h3 id="about-work">Where I&apos;ve worked</h3>

          <ol className="about-roles">
            {experience.map(({ index, company, role, date, text, reel }) => (
              <li key={index} className="about-role">
                <span className="about-role-date">{date}</span>

                <div>
                  <strong>{role}</strong>
                  <span className="about-role-company">{company}</span>
                  <p>{text}</p>

                  {reel && (
                    <VideoReel label={reel.label} videos={reel.videos} />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-block" aria-labelledby="about-tools">
          <h3 id="about-tools">What I reach for</h3>

          <dl className="about-tools">
            {skills.map(({ n, title, desc, chips }) => (
              <div key={n} className="about-tool">
                <dt>
                  {title}
                  <span>{desc}</span>
                </dt>
                <dd>{chips.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
    {typeof document !== "undefined" &&
      createPortal(
        <span
          ref={certificateRef}
          className={`about-certificate-preview${certificateVisible ? " is-visible" : ""}`}
          aria-hidden="true"
        >
          <img
            src="/certificate/cor.jpg"
            alt=""
            loading="eager"
            decoding="async"
            onLoad={() => {
              if (lastPointerRef.current && certificateVisible) {
                positionCertificate(lastPointerRef.current.x, lastPointerRef.current.y);
              }
            }}
          />
        </span>,
        document.body,
      )}
    </>
  );
}