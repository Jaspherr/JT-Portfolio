import { Link } from "react-router";

import VideoReel from "@/components/sections/VideoReel";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export default function About() {
  return (
    <section id="about" className="section shell about">
      <div className="about-main">
        <div className="about-story">
          <h2 data-draft="set">
            A bit about the <em>person behind it.</em>
          </h2>
          <p className="about-lead">
            I&apos;m Jaspher, an AI Design Engineer who enjoys figuring things out,
            trying different approaches, and seeing where an idea can go.
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
            recognised as <em>Most Outstanding UI/UX Designer.</em>
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
  );
}
