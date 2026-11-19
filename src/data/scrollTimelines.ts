import type { TimelineSpec } from "@/lib/scroll-timeline";

// Supporting copy settles in here. The defining moves — headings set on their baseline, frames spec'd then inked, the closing
// "say hello." — belong to the draft system (src/styles/draft.css), so they
// are not repeated in these timelines.

const headingRise: TimelineSpec = {
  scope: ".projects-heading-content",
  start: 0.82,
  tweens: [
    { targets: ".projects-heading-description", from: { opacity: 0, y: 18 }, duration: 0.8, ease: "power4.out", at: 0.35 },
  ],
};

const services: TimelineSpec = {
  scope: ".services",
  start: 0.9,
  tweens: [
    { targets: ".services-heading > p", from: { autoAlpha: 0, y: 18 }, duration: 0.8, ease: "power4.out", at: 0.35 },
    { targets: ".services-accent span", from: { scaleX: 0 }, originLeft: true, duration: 0.7, ease: "power3.out", at: 0.12 },
  ],
};

const serviceRow: TimelineSpec = {
  scope: ".service-card",
  start: 0.88,
  tweens: [
    { targets: ".service-top, .service-content", from: { autoAlpha: 0, y: 30 }, duration: 0.85, stagger: 0.08, ease: "power4.out", flat: true, at: 0 },
  ],
};

const projectCase: TimelineSpec = {
  scope: ".project-case",
  start: 0.76,
  tweens: [
    { targets: ".project-overline", from: { opacity: 0, scaleX: 0.92 }, originLeft: true, duration: 0.5, ease: "power3.out" },
    { targets: ".project-case-number", from: { opacity: 0, y: 12 }, duration: 0.4, ease: "power3.out", at: "-=0.3" },
    { targets: ".project-case-heading h3", from: { opacity: 0, y: 38 }, duration: 0.65, ease: "power4.out", at: "-=0.3" },
    { targets: ".project-case-type", from: { opacity: 0, y: 10 }, duration: 0.4, ease: "power3.out", at: "-=0.48" },
    { targets: ".project-summary", from: { opacity: 0, y: 14 }, duration: 0.5, ease: "power3.out", at: "-=0.3" },
    { targets: ".project-impact", from: { opacity: 0, y: 14 }, duration: 0.5, ease: "power3.out", at: "-=0.35" },
    { targets: ".project-footer", from: { opacity: 0, y: 10 }, duration: 0.4, ease: "power3.out", at: "-=0.35" },
  ],
};

const about: TimelineSpec = {
  scope: ".about",
  start: 0.85,
  tweens: [
    { targets: ".about-story > p", from: { opacity: 0, y: 18 }, duration: 0.8, stagger: 0.09, ease: "power4.out", at: 0.35, clearTransform: true },
    { targets: ".about-block", from: { opacity: 0, y: 24 }, duration: 0.7, stagger: 0.12, ease: "power3.out", at: 0.15 },
  ],
};

const contact: TimelineSpec = {
  scope: ".contact",
  start: 0.65,
  tweens: [
    { targets: ".contact-status", from: { opacity: 0, y: 15 }, duration: 0.5, ease: "power3.out" },
    { targets: ".contact-pretitle", from: { opacity: 0, y: 18 }, duration: 0.5, ease: "power3.out", at: "-=0.35" },
    { targets: ".contact-description", from: { opacity: 0, y: 18 }, duration: 0.5, ease: "power3.out", at: "-=0.45" },
    { targets: ".contact-email", from: { opacity: 0, scaleX: 0.95 }, originLeft: true, duration: 0.55, ease: "power3.out", at: "-=0.35" },
  ],
};

const contactElsewhere: TimelineSpec = {
  scope: ".contact-bottom",
  start: 0.9,
  tweens: [
    { targets: ".contact-bottom-heading", from: { autoAlpha: 0, y: 18 }, duration: 0.55, ease: "power3.out", at: 0 },
    { targets: ".contact-link", from: { autoAlpha: 0, y: 24 }, duration: 0.65, stagger: 0.08, ease: "power4.out", flat: true, at: 0.08 },
  ],
};

export const homeTimelines: TimelineSpec[] = [
  headingRise,
  services,
  serviceRow,
  projectCase,
  about,
  contact,
  contactElsewhere,
];

export const caseStudyTimelines: TimelineSpec[] = [
  {
    scope: ".case-section:has(.case-overview-grid)",
    trigger: ".case-overview-grid",
    start: 0.82,
    tweens: [
      { targets: ".case-section-heading", from: { opacity: 0, y: 14 }, duration: 0.48, ease: "power3.out", clearTransform: true },
      { targets: ".case-overview-grid article", from: { opacity: 0, y: 36 }, duration: 0.68, stagger: 0.12, ease: "power4.out", at: "-=0.22", clearTransform: true },
    ],
  },
  {
    scope: ".case-technical-grid",
    start: 0.82,
    tweens: [
      { targets: ".case-technical-intro", from: { opacity: 0, y: 30 }, duration: 0.65, ease: "power4.out", clearTransform: true },
      { targets: ".case-technical-list li", from: { opacity: 0, x: 18 }, duration: 0.48, stagger: 0.065, ease: "power3.out", at: "-=0.38", clearTransform: true },
    ],
  },
  {
    scope: ".case-features",
    start: 0.78,
    tweens: [
      { targets: ".case-section-heading", from: { opacity: 0, y: 14 }, duration: 0.45, ease: "power3.out", clearTransform: true },
      { targets: ".case-features-header", from: { opacity: 0, y: 35 }, duration: 0.65, ease: "power4.out", at: "-=0.25", clearTransform: true },
      { targets: ".case-feature-card", from: { opacity: 0, y: 42, scale: 0.985 }, duration: 0.72, stagger: 0.11, ease: "power4.out", at: "-=0.32", clearTransform: true },
    ],
  },
  {
    scope: ".case-outcome",
    start: 0.8,
    tweens: [
      { targets: ".case-section-heading", from: { opacity: 0, y: 14 }, duration: 0.45, ease: "power3.out", clearTransform: true },
      { targets: ".case-outcome-lead", from: { opacity: 0, y: 34 }, duration: 0.68, ease: "power4.out", at: "-=0.24", clearTransform: true },
      { targets: ".case-outcome-lists article", from: { opacity: 0, y: 24 }, duration: 0.55, stagger: 0.1, ease: "power3.out", at: "-=0.38", clearTransform: true },
    ],
  },
  {
    scope: ".case-navigation",
    start: 0.88,
    tweens: [
      { targets: ".case-navigation-item", from: { opacity: 0, y: 22 }, duration: 0.58, stagger: 0.1, ease: "power4.out", clearTransform: true },
    ],
  },
  {
    scope: ".case-home",
    start: 0.92,
    tweens: [
      { targets: ":scope", from: { opacity: 0, y: 16 }, duration: 0.48, ease: "power3.out", clearTransform: true },
    ],
  },
];