import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ThemeToggle from "@/components/layout/ThemeToggle";
import Image from "@/components/ui/Image";
import { navLinks } from "@/data/navigation";
import { useIntroReady } from "@/hooks/useIntroReady";
import { RESUME_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const RESUME_LABEL = "Open Jaspher Tania résumé in a new tab";

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => section !== null);

    if (!sections.length) return;

    const latestEntries = new Map<Element, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => latestEntries.set(entry.target, entry));

        const visible = Array.from(latestEntries.values())
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        setActiveSection(visible ? `#${visible.target.id}` : "");
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-10% 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useIntroReady(navRef, "nav-ready");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
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

  const closeMenu = () => setIsOpen(false);

  const currentProps = (href: string) =>
    activeSection === href ? ({ "aria-current": "location" } as const) : {};

  return (
    <>
      <nav
        ref={navRef}
        className="nav shell nav-intro"
        aria-label="Primary navigation"
      >
        <a className="monogram" href="#top" aria-label="Back to top">
          <Image src="/icon.png" alt="" width={36} height={36} preload />
        </a>

        <div className="nav-links">
          <div className="nav-primary">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn("nav-link", activeSection === href && "is-active")}
                {...currentProps(href)}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a className="nav-cta" href="#contact">
              <span>Contact</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>

            <a
              className="nav-resume"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={RESUME_LABEL}
            >
              <span>Résumé</span>
              <ArrowUpRight className="nav-resume-icon" aria-hidden="true" />
            </a>

            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          className="nav-toggle"
          ref={menuButtonRef}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-nav"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
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
        className={cn("mobile-nav", isOpen && "is-open")}
        aria-hidden={!isOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
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
                onClick={closeMenu}
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
                className={cn(activeSection === href && "is-active")}
                {...currentProps(href)}
                onClick={closeMenu}
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
              aria-label={RESUME_LABEL}
              onClick={closeMenu}
            >
              <span>View Résumé</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <a href="#contact" onClick={closeMenu}>
              <span>Contact</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}