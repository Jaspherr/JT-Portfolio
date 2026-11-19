import { Link } from "react-router";

import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export default function About() {
  return (
    <section id="about" className="section shell about">
      <div className="about-story">
        <h2 data-draft="set">
          A bit about the <em>person behind it.</em>
        </h2>

        <p className="about-lead">
          I&apos;m Jaspher — a UI/UX designer who also builds the front-end,
          so most of my decisions get tested twice: once in Figma, once in the
          browser.
        </p>

        <p>
          So far that&apos;s meant school projects that turned into full
          systems, an internship designing and building an admin platform, and
          a stretch of freelance video editing that sharpened how I think about
          pacing and motion.
        </p>

        <p>
          When I build, the code is rarely the first step. I research how
          something should work, plan it out, then direct the implementation
          with AI-assisted tools — and spend most of my time on what comes
          after: debugging, questioning the output, and refining it until it
          actually does its job.
        </p>

        <p>
          I&apos;d rather an interface be clear than decorated. The rest
          I&apos;m still learning by making things — this site included.
        </p>
      </div>

      <div className="about-notes">
        <section className="about-block" aria-labelledby="about-recently">
          <h3 id="about-recently">Recently</h3>

          <ol className="about-roles">
            {experience.map(({ index, company, role, date, text }) => (
              <li key={index} className="about-role">
                <span className="about-role-date">{date}</span>

                <div>
                  <strong>{role}</strong>
                  <span className="about-role-company">{company}</span>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-block" aria-labelledby="about-moment">
          <h3 id="about-moment">Along the way</h3>

          <p className="about-moment">
            <Link to="/projects/sakay">Sakay</Link>, our capstone, received{" "}
            <em>Best System Development</em> — and my UI/UX work on it was
            recognised as <em>Most Outstanding UI/UX Designer.</em>
          </p>
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
