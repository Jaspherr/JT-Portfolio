"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioAnimations() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;
    const servicesSection = document.querySelector<HTMLElement>(".services");

    if (servicesSection) {
      const servicesHeading =
        servicesSection.querySelector<HTMLElement>(".services-heading");

      const servicesAccent = servicesSection.querySelector<HTMLElement>(
        ".services-accent span",
      );

      const serviceCards =
        servicesSection.querySelectorAll<HTMLElement>(".service-card");

      if (servicesHeading) {
        gsap.set(servicesHeading, {
          autoAlpha: 0,
          y: 45,
        });
      }

      if (servicesAccent) {
        gsap.set(servicesAccent, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      if (serviceCards.length) {
        gsap.set(serviceCards, {
          autoAlpha: 0,
          y: 45,
          scale: 0.98,
        });
      }
    }

    const toolsSection = document.querySelector<HTMLElement>(".tools");

    if (toolsSection) {
      const toolsIntro =
        toolsSection.querySelector<HTMLElement>(".tools-intro");

      const toolsAccent =
        toolsSection.querySelector<HTMLElement>(".tools-accent span");

      const toolkitRows =
        toolsSection.querySelectorAll<HTMLElement>(".toolkit-row");

      if (toolsIntro) {
        gsap.set(toolsIntro, {
          autoAlpha: 0,
          y: 45,
        });
      }

      if (toolsAccent) {
        gsap.set(toolsAccent, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      if (toolkitRows.length) {
        gsap.set(toolkitRows, {
          autoAlpha: 0,
          x: 40,
        });
      }
    }

    const contactBottom =
      document.querySelector<HTMLElement>(".contact-bottom");

    if (contactBottom) {
      const contactBottomHeading = contactBottom.querySelector<HTMLElement>(
        ".contact-bottom-heading",
      );

      const contactLinks =
        contactBottom.querySelectorAll<HTMLElement>(".contact-link");

      if (contactBottomHeading) {
        gsap.set(contactBottomHeading, {
          autoAlpha: 0,
          y: 18,
        });
      }

      if (contactLinks.length) {
        gsap.set(contactLinks, {
          autoAlpha: 0,
          y: 24,
        });
      }
    }

    const caseStudy = document.querySelector<HTMLElement>(".case-study");

    if (!caseStudy) return;

    const overviewGrid = caseStudy.querySelector<HTMLElement>(
      ".case-overview-grid",
    );

    if (overviewGrid) {
      const overviewSection =
        overviewGrid.closest<HTMLElement>(".case-section");

      const overviewHeading = overviewSection?.querySelector<HTMLElement>(
        ".case-section-heading",
      );

      const overviewArticles =
        overviewGrid.querySelectorAll<HTMLElement>("article");

      if (overviewHeading) {
        gsap.set(overviewHeading, {
          opacity: 0,
          y: 14,
        });
      }

      if (overviewArticles.length) {
        gsap.set(overviewArticles, {
          opacity: 0,
          y: 36,
        });
      }
    }

    const technicalGrid = caseStudy.querySelector<HTMLElement>(
      ".case-technical-grid",
    );

    if (technicalGrid) {
      const technicalIntro = technicalGrid.querySelector<HTMLElement>(
        ".case-technical-intro",
      );

      const technicalItems = technicalGrid.querySelectorAll<HTMLElement>(
        ".case-technical-list li",
      );

      if (technicalIntro) {
        gsap.set(technicalIntro, {
          opacity: 0,
          y: 30,
        });
      }

      if (technicalItems.length) {
        gsap.set(technicalItems, {
          opacity: 0,
          x: 18,
        });
      }
    }

    const caseFeatures = caseStudy.querySelector<HTMLElement>(".case-features");

    if (caseFeatures) {
      const featuresHeading = caseFeatures.querySelector<HTMLElement>(
        ".case-section-heading",
      );

      const featuresHeader = caseFeatures.querySelector<HTMLElement>(
        ".case-features-header",
      );

      const featureCards =
        caseFeatures.querySelectorAll<HTMLElement>(".case-feature-card");

      if (featuresHeading) {
        gsap.set(featuresHeading, {
          opacity: 0,
          y: 14,
        });
      }

      if (featuresHeader) {
        gsap.set(featuresHeader, {
          opacity: 0,
          y: 35,
        });
      }

      if (featureCards.length) {
        gsap.set(featureCards, {
          opacity: 0,
          y: 42,
          scale: 0.985,
        });
      }
    }

    const outcome = caseStudy.querySelector<HTMLElement>(".case-outcome");

    if (outcome) {
      const outcomeHeading = outcome.querySelector<HTMLElement>(
        ".case-section-heading",
      );

      const outcomeLead =
        outcome.querySelector<HTMLElement>(".case-outcome-lead");

      const outcomeLists = outcome.querySelectorAll<HTMLElement>(
        ".case-outcome-lists article",
      );

      if (outcomeHeading) {
        gsap.set(outcomeHeading, {
          opacity: 0,
          y: 14,
        });
      }

      if (outcomeLead) {
        gsap.set(outcomeLead, {
          opacity: 0,
          y: 34,
        });
      }

      if (outcomeLists.length) {
        gsap.set(outcomeLists, {
          opacity: 0,
          y: 24,
        });
      }
    }

    const caseNavigation =
      caseStudy.querySelector<HTMLElement>(".case-navigation");

    if (caseNavigation) {
      const navigationItems = caseNavigation.querySelectorAll<HTMLElement>(
        ".case-navigation-item",
      );

      if (navigationItems.length) {
        gsap.set(navigationItems, {
          opacity: 0,
          y: 22,
        });
      }
    }

    const caseHome = caseStudy.querySelector<HTMLElement>(".case-home");

    if (caseHome) {
      gsap.set(caseHome, {
        opacity: 0,
        y: 16,
      });
    }
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".exp-heading, .projects-heading-content")
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 55,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.05,
              ease: "power4.out",

              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            },
          );
        });

      /* CAPABILITIES */

      const servicesSection = document.querySelector<HTMLElement>(".services");

      if (servicesSection) {
        const servicesHeading =
          servicesSection.querySelector<HTMLElement>(".services-heading");

        const servicesAccent = servicesSection.querySelector<HTMLElement>(
          ".services-accent span",
        );

        const serviceCards =
          servicesSection.querySelectorAll<HTMLElement>(".service-card");

        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (servicesHeading) {
          servicesTl.to(
            servicesHeading,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power4.out",
            },
            0,
          );
        }

        if (servicesAccent) {
          servicesTl.to(
            servicesAccent,
            {
              scaleX: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            0.12,
          );
        }

        if (serviceCards.length) {
          servicesTl.to(
            serviceCards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: "power4.out",
              force3D: false,
            },
            0.15,
          );
        }
      }

      /* EXPERIENCE ACCENT */

      const experienceAccent = document.querySelector(
        ".experience-accent span",
      );

      const experienceAccentTrigger =
        document.querySelector(".experience-accent");

      if (experienceAccent && experienceAccentTrigger) {
        gsap.fromTo(
          experienceAccent,
          {
            scaleX: 0,
            transformOrigin: "left",
          },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
              trigger: experienceAccentTrigger,
              start: "top 85%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          },
        );
      }

      /* EXPERIENCE TIMELINE */

      gsap.utils.toArray<HTMLElement>(".timeline-job").forEach((job) => {
        const date = job.querySelector(".timeline-date");

        const marker = job.querySelector(".timeline-marker");

        const content = job.querySelector(".timeline-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: job,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (date) {
          tl.fromTo(
            date,
            {
              opacity: 0,
              x: -20,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power3.out",
            },
          );
        }

        if (marker) {
          tl.fromTo(
            marker,
            {
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              duration: 0.4,
              ease: "power3.out",
            },
            "-=.4",
          );
        }

        if (content) {
          tl.fromTo(
            content,
            {
              opacity: 0,
              x: 28,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power4.out",
              clearProps: "transform",
            },
            "-=.45",
          );
        }
      });

      /* PROJECTS */

      gsap.utils.toArray<HTMLElement>(".project-case").forEach((project) => {
        const overline = project.querySelector(".project-overline");

        const number = project.querySelector(".project-case-number");

        const title = project.querySelector(".project-case-heading h3");

        const type = project.querySelector(".project-case-type");

        const visual = project.querySelector(".project-visual-frame");

        const summary = project.querySelector(".project-summary");

        const impact = project.querySelector(".project-impact");

        const footer = project.querySelector(".project-footer");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 76%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (overline) {
          tl.fromTo(
            overline,
            {
              opacity: 0,
              scaleX: 0.92,
              transformOrigin: "left",
            },
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.5,
              ease: "power3.out",
            },
          );
        }

        if (number) {
          tl.fromTo(
            number,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            "-=.3",
          );
        }

        if (title) {
          tl.fromTo(
            title,
            {
              opacity: 0,
              y: 38,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power4.out",
            },
            "-=.3",
          );
        }

        if (type) {
          tl.fromTo(
            type,
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            "-=.48",
          );
        }

        if (visual) {
          tl.fromTo(
            visual,
            {
              opacity: 0,
              clipPath: "inset(8% 0 92% 0)",
            },
            {
              opacity: 1,
              clipPath: "inset(0% 0 0% 0)",
              duration: 0.45,
              ease: "power3.out",
            },
            "-=.42",
          );
        }

        if (summary) {
          tl.fromTo(
            summary,
            {
              opacity: 0,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=.3",
          );
        }

        if (impact) {
          tl.fromTo(
            impact,
            {
              opacity: 0,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=.35",
          );
        }

        if (footer) {
          tl.fromTo(
            footer,
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            "-=.35",
          );
        }
      });

      /* CASE STUDY */

      const caseStudy = document.querySelector<HTMLElement>(".case-study");

      if (caseStudy) {
        const overviewGrid = caseStudy.querySelector<HTMLElement>(
          ".case-overview-grid",
        );

        if (overviewGrid) {
          const overviewSection =
            overviewGrid.closest<HTMLElement>(".case-section");

          const sectionHeading = overviewSection?.querySelector<HTMLElement>(
            ".case-section-heading",
          );

          const overviewArticles =
            overviewGrid.querySelectorAll<HTMLElement>("article");

          const overviewTl = gsap.timeline({
            scrollTrigger: {
              trigger: overviewGrid,
              start: "top 82%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          if (sectionHeading) {
            overviewTl.fromTo(
              sectionHeading,
              {
                opacity: 0,
                y: 14,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.48,
                ease: "power3.out",
                clearProps: "transform",
              },
            );
          }

          if (overviewArticles.length) {
            overviewTl.fromTo(
              overviewArticles,
              {
                opacity: 0,
                y: 36,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                stagger: 0.12,
                ease: "power4.out",
                clearProps: "transform",
              },
              "-=.22",
            );
          }
        }

        /* TECHNICAL CONSIDERATIONS */

        const technicalGrid = caseStudy.querySelector<HTMLElement>(
          ".case-technical-grid",
        );

        if (technicalGrid) {
          const technicalIntro = technicalGrid.querySelector<HTMLElement>(
            ".case-technical-intro",
          );

          const technicalItems = technicalGrid.querySelectorAll<HTMLElement>(
            ".case-technical-list li",
          );

          const technicalTl = gsap.timeline({
            scrollTrigger: {
              trigger: technicalGrid,
              start: "top 82%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          if (technicalIntro) {
            technicalTl.fromTo(
              technicalIntro,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power4.out",
                clearProps: "transform",
              },
            );
          }

          if (technicalItems.length) {
            technicalTl.fromTo(
              technicalItems,
              {
                opacity: 0,
                x: 18,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.48,
                stagger: 0.065,
                ease: "power3.out",
                clearProps: "transform",
              },
              "-=.38",
            );
          }
        }

        /* KEY FEATURES */

        const caseFeatures =
          caseStudy.querySelector<HTMLElement>(".case-features");

        if (caseFeatures) {
          const featuresHeading = caseFeatures.querySelector<HTMLElement>(
            ".case-section-heading",
          );

          const featuresHeader = caseFeatures.querySelector<HTMLElement>(
            ".case-features-header",
          );

          const featureCards =
            caseFeatures.querySelectorAll<HTMLElement>(".case-feature-card");

          const featuresTl = gsap.timeline({
            scrollTrigger: {
              trigger: caseFeatures,
              start: "top 78%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          if (featuresHeading) {
            featuresTl.fromTo(
              featuresHeading,
              {
                opacity: 0,
                y: 14,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power3.out",
                clearProps: "transform",
              },
            );
          }

          if (featuresHeader) {
            featuresTl.fromTo(
              featuresHeader,
              {
                opacity: 0,
                y: 35,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power4.out",
                clearProps: "transform",
              },
              "-=.25",
            );
          }

          if (featureCards.length) {
            featuresTl.fromTo(
              featureCards,
              {
                opacity: 0,
                y: 42,
                scale: 0.985,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.72,

                stagger: {
                  each: 0.11,
                  from: "start",
                },

                ease: "power4.out",
                clearProps: "transform",
              },
              "-=.32",
            );
          }
        }

        /* OUTCOME */

        const outcome = caseStudy.querySelector<HTMLElement>(".case-outcome");

        if (outcome) {
          const outcomeHeading = outcome.querySelector<HTMLElement>(
            ".case-section-heading",
          );

          const outcomeLead =
            outcome.querySelector<HTMLElement>(".case-outcome-lead");

          const outcomeLists = outcome.querySelectorAll<HTMLElement>(
            ".case-outcome-lists article",
          );

          const outcomeTl = gsap.timeline({
            scrollTrigger: {
              trigger: outcome,
              start: "top 80%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          if (outcomeHeading) {
            outcomeTl.fromTo(
              outcomeHeading,
              {
                opacity: 0,
                y: 14,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power3.out",
                clearProps: "transform",
              },
            );
          }

          if (outcomeLead) {
            outcomeTl.fromTo(
              outcomeLead,
              {
                opacity: 0,
                y: 34,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                ease: "power4.out",
                clearProps: "transform",
              },
              "-=.24",
            );
          }

          if (outcomeLists.length) {
            outcomeTl.fromTo(
              outcomeLists,
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "transform",
              },
              "-=.38",
            );
          }
        }

        /* CASE STUDY FOOTER NAVIGATION */

        const caseNavigation =
          caseStudy.querySelector<HTMLElement>(".case-navigation");

        if (caseNavigation) {
          const navigationItems = caseNavigation.querySelectorAll<HTMLElement>(
            ".case-navigation-item",
          );

          if (navigationItems.length) {
            gsap.fromTo(
              navigationItems,
              {
                opacity: 0,
                y: 22,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.58,
                stagger: 0.1,
                ease: "power4.out",
                clearProps: "transform",

                scrollTrigger: {
                  trigger: caseNavigation,
                  start: "top 88%",
                  toggleActions: "play none none none",
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        }

        const caseHome = caseStudy.querySelector<HTMLElement>(".case-home");

        if (caseHome) {
          gsap.fromTo(
            caseHome,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.48,
              ease: "power3.out",
              clearProps: "transform",

              scrollTrigger: {
                trigger: caseHome,
                start: "top 92%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }

      /* TOOLKIT */

      const toolsSection = document.querySelector<HTMLElement>(".tools");

      if (toolsSection) {
        const toolsIntro =
          toolsSection.querySelector<HTMLElement>(".tools-intro");

        const toolsAccent =
          toolsSection.querySelector<HTMLElement>(".tools-accent span");

        const toolkitRows =
          toolsSection.querySelectorAll<HTMLElement>(".toolkit-row");

        const toolsTl = gsap.timeline({
          scrollTrigger: {
            trigger: toolsSection,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (toolsIntro) {
          toolsTl.to(
            toolsIntro,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power4.out",
            },
            0,
          );
        }

        if (toolsAccent) {
          toolsTl.to(
            toolsAccent,
            {
              scaleX: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            0.12,
          );
        }

        if (toolkitRows.length) {
          toolsTl.to(
            toolkitRows,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.85,
              stagger: 0.09,
              ease: "power4.out",
              force3D: false,
            },
            0.15,
          );
        }
      }

      /* CONTACT */

      const contact = document.querySelector(".contact");

      if (contact) {
        const contactTop = contact.querySelector(".contact-top");

        const contactPretitle = contact.querySelector(".contact-pretitle");

        const contactTitle = contact.querySelector(".contact-main h2");

        const contactDescription = contact.querySelector(
          ".contact-description",
        );

        const contactEmail = contact.querySelector(".contact-email");

        const contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: contact,
            start: "top 65%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (contactTop) {
          contactTl.fromTo(
            contactTop,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
          );
        }

        if (contactPretitle) {
          contactTl.fromTo(
            contactPretitle,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=.35",
          );
        }

        if (contactTitle) {
          contactTl.fromTo(
            contactTitle,
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power4.out",
            },
            "-=.35",
          );
        }

        if (contactDescription) {
          contactTl.fromTo(
            contactDescription,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=.45",
          );
        }

        if (contactEmail) {
          contactTl.fromTo(
            contactEmail,
            {
              opacity: 0,
              scaleX: 0.95,
              transformOrigin: "left",
            },
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=.35",
          );
        }
      }

      /* CONTACT ELSEWHERE */

      const contactBottom =
        document.querySelector<HTMLElement>(".contact-bottom");

      if (contactBottom) {
        const contactBottomHeading = contactBottom.querySelector<HTMLElement>(
          ".contact-bottom-heading",
        );

        const contactLinks =
          contactBottom.querySelectorAll<HTMLElement>(".contact-link");

        const elsewhereTl = gsap.timeline({
          scrollTrigger: {
            trigger: contactBottom,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (contactBottomHeading) {
          elsewhereTl.to(
            contactBottomHeading,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            0,
          );
        }

        if (contactLinks.length) {
          elsewhereTl.to(
            contactLinks,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power4.out",
              force3D: false,
            },
            0.08,
          );
        }
      }

      /* REFRESH */
    });

    const refreshRaf = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshRaf);
      ctx.revert();
    };
  }, []);

  return null;
}