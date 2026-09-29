"use client";

import { ArrowUpRight, Check, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionKicker from "@/components/ui/SectionKicker";
import { RESUME_URL, SOCIAL_LINKS } from "@/lib/site";

const contactLinks = [
  {
    number: "01",
    label: "CODE & PROJECTS",
    name: "GitHub",
    href: SOCIAL_LINKS.github,
  },
  {
    number: "02",
    label: "PROFESSIONAL PROFILE",
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    number: "03",
    label: "CURRICULUM VITAE",
    name: "Résumé",
    href: RESUME_URL,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);

  const showCopiedState = () => {
    setCopied(true);

    if (copiedTimerRef.current !== null) {
      window.clearTimeout(copiedTimerRef.current);
    }

    copiedTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      copiedTimerRef.current = null;
    }, 1800);
  };

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    const email = "taniajaspher0@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      showCopiedState();
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "true");
      textarea.setAttribute("aria-hidden", "true");
      textarea.tabIndex = -1;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        showCopiedState();
      } catch {
        setCopied(false);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <section id="contact" className="section contact">
      <span
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {copied ? "Email address copied to clipboard." : ""}
      </span>

      <div className="shell contact-inner">
        <div className="contact-top reveal">
          <SectionKicker n="05" label="CONTACT" />

          <div className="contact-status">
            <span />
            Available for selected opportunities
          </div>
        </div>

        <div className="contact-main reveal">
          <p className="contact-pretitle">Have an idea in mind?</p>

          <h2>
            Let&apos;s make something
            <br />
            <em>worth remembering.</em>
          </h2>

          <p className="contact-description">
            Whether it&apos;s a product, interface, or an idea that still needs
            shape — tell me what you&apos;re working on.
          </p>
        </div>

        <div className="contact-email-wrap reveal">
          <a className="contact-email" href="mailto:taniajaspher0@gmail.com">
            <div className="contact-email-label">
              <Mail aria-hidden="true" />
              <span>START A CONVERSATION</span>
            </div>

            <strong>taniajaspher0@gmail.com</strong>

            <span className="contact-email-arrow">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>

          <button
            type="button"
            className="copy-email-btn"
            onClick={handleCopyEmail}
            aria-label="Copy email address to clipboard"
          >
            {copied ? (
              <>
                <Check aria-hidden="true" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Mail aria-hidden="true" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        <div className="contact-bottom">
          <div className="contact-bottom-heading">
            <span>OR ELSEWHERE</span>
          </div>

          <div className="contact-links">
            {contactLinks.map(({ number, label, name, href }) => (
              <a
                className="contact-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} — opens in a new tab`}
                key={name}
              >
                <span className="contact-link-number">{number}</span>

                <div className="contact-link-copy">
                  <small>{label}</small>
                  <strong>{name}</strong>
                </div>

                <span className="contact-link-arrow">
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}