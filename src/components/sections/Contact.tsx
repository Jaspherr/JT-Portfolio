import { ArrowUpRight, Check, Mail } from "lucide-react";

import { contactLinks } from "@/data/contact";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Contact() {
  const { copied, copy } = useCopyToClipboard();

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
        <div className="contact-top">
          <div className="contact-status">
            <span />
            Open to UI/UX and front-end roles
          </div>
        </div>

        <div className="contact-main">
          <p className="contact-pretitle">That&apos;s most of it.</p>

          <h2 data-draft="set">
            <span className="contact-line">If something here clicked,</span>
            <br />
            <em data-draft="ink">say hello.</em>
          </h2>

          <p className="contact-description">
            A question about one of the projects, a role you think I&apos;d fit,
            or something you&apos;re building — my inbox is open.
          </p>
        </div>

        <div className="contact-email-wrap">
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            <div className="contact-email-label">
              <Mail aria-hidden="true" />
              <span>Write to me</span>
            </div>

            <strong>{CONTACT_EMAIL}</strong>

            <span className="contact-email-arrow">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>

          <button
            type="button"
            className="copy-email-btn"
            onClick={() => copy(CONTACT_EMAIL)}
            aria-label="Copy email address to clipboard"
          >
            {copied ? <Check aria-hidden="true" /> : <Mail aria-hidden="true" />}
            <span>{copied ? "Copied!" : "Copy email"}</span>
          </button>
        </div>

        <div className="contact-bottom">
          <div className="contact-bottom-heading">
            <span>Or find me elsewhere</span>
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