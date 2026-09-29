"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import ThemeToggle from "@/components/layout/ThemeToggle";
import { RESUME_URL } from "@/lib/site";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#toolkit", label: "Toolkit" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      nav.classList.add("nav-ready");
      return;
    }

    let frame = 0;

    const revealNavbar = () => {
      if (nav.classList.contains("nav-ready")) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        nav.classList.add("nav-ready");
      });
    };

    revealNavbar();

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        !nav.classList.contains("nav-ready")
      ) {
        window.cancelAnimationFrame(frame);
        revealNavbar();
      }
    };

    const handlePageShow = () => {
      if (!nav.classList.contains("nav-ready")) {
        window.cancelAnimationFrame(frame);
        revealNavbar();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    window.addEventListener(
      "pageshow",
      handlePageShow,
    );

    return () => {
      window.cancelAnimationFrame(frame);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener(
        "pageshow",
        handlePageShow,
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus();
      wasOpen.current = false;
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean) as Element[];

    if (!sections.length) return;

    // Observer callbacks only include sections whose visibility changed,
    // so keep the latest entry per section to know when none is in view.
    const latestEntries = new Map<Element, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          latestEntries.set(entry.target, entry),
        );

        const visible = Array.from(latestEntries.values())
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          )[0];

        setActiveSection(
          visible ? `#${visible.target.id}` : "",
        );
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-10% 0px -45% 0px",
      },
    );

    sections.forEach((section) =>
      observer.observe(section),
    );

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className="nav shell nav-intro"
        aria-label="Primary navigation"
      >
        <a
          className="monogram"
          href="#top"
          aria-label="Back to top"
        >
          <Image
            src="/icon.png"
            alt=""
            width={36}
            height={36}
            preload
          />
        </a>

        <div className="nav-links">
          <div className="nav-primary">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`nav-link ${
                  activeSection === href
                    ? "is-active"
                    : ""
                }`}
                aria-current={
                  activeSection === href
                    ? "location"
                    : undefined
                }
              >
                {label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a
              className="nav-cta"
              href="#contact"
            >
              <span>Contact</span>
              <ArrowUpRight
                size={12}
                aria-hidden="true"
              />
            </a>

            <a
              className="nav-resume"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Jaspher Tania résumé in a new tab"
            >
              <span>Résumé</span>

              <ArrowUpRight
                className="nav-resume-icon"
                aria-hidden="true"
              />
            </a>

            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          className="nav-toggle"
          ref={menuButtonRef}
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-controls="mobile-nav"
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen((current) => !current)
          }
        >
          {isOpen ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <Menu size={18} aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`mobile-nav ${
          isOpen ? "is-open" : ""
        }`}
        aria-hidden={!isOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <div
          className="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="mobile-nav-header">
            <span>Navigate</span>

            <div className="mobile-nav-header-actions">
              <ThemeToggle />

              <button
                type="button"
                className="mobile-nav-close"
                ref={closeButtonRef}
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mobile-nav-links">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={
                  activeSection === href
                    ? "is-active"
                    : ""
                }
                aria-current={
                  activeSection === href
                    ? "location"
                    : undefined
                }
                onClick={handleLinkClick}
              >
                <span>{label}</span>
              </a>
            ))}
          </div>

          <div className="mobile-nav-footer">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Jaspher Tania résumé in a new tab"
              onClick={handleLinkClick}
            >
              <span>View Résumé</span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
              />
            </a>

            <a
              href="#contact"
              onClick={handleLinkClick}
            >
              <span>Contact</span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}