import { ArrowUpRight, Check, Mail } from "lucide-react";

import SectionKicker from "@/components/ui/SectionKicker";
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
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            <div className="contact-email-label">
              <Mail aria-hidden="true" />
              <span>START A CONVERSATION</span>
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