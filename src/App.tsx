import type { CSSProperties } from 'react';
import rawData from './data/projects.json';

type Technology = {
  name: string;
  category: string;
};

type Project = {
  name: string;
  summary: string;
  link: string;
  source?: string;
  year?: number;
  technologies: string[];
};

type DataFile = {
  technologies: Technology[];
  projects: Project[];
};

const data = rawData as DataFile;

const formatYear = (year?: number) => (year ? year.toString() : undefined);

export default function App() {
  const { technologies, projects } = data;

  const sortedTechnologies = [...technologies].sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const projectTechSets = new Map(projects.map((project) => [project.name, new Set(project.technologies)]));

  const momentumStats = projects.map((project) => ({
    name: project.name,
    techCount: project.technologies.length,
  }));

  const maxTechCount = momentumStats.reduce((max, stat) => Math.max(max, stat.techCount), 1);

  return (
    <div className="page">
      <header className="hero">
        <h1>&lt;name&gt; Build Journal</h1>
        <p className="tagline">Personal playground, client-ready outcomes, and an open invitation to collaborate.</p>
      </header>

      <main>
        <section className="intro">
          <p>
            I design and engineer thoughtful web experiences that make complex ideas easier to use. This page is a
            living record of experiments, production launches, and passion projects so you can see what I&apos;ve shipped
            and decide if we should create something together.
          </p>
          <p>
            Browse the highlights below, explore the technology matrix, and reach out when you&apos;re ready to start the
            next chapter of your product.
          </p>
        </section>

        <section className="visual-demo" aria-labelledby="visual-demo-heading">
          <h2 id="visual-demo-heading">Project Momentum</h2>
          <p className="visual-description">
            A quick pulse on each build&apos;s complexity. The brighter the bar, the wider the stack I orchestrated to bring
            it to life.
          </p>
          <ul className="momentum-list">
            {momentumStats.map((stat, index) => {
              const fillWidth = (stat.techCount / maxTechCount) * 100;
              const fillStyle = { '--fill-width': `${fillWidth}%`, '--fill-delay': `${index * 80}ms` } as CSSProperties;

              return (
                <li key={`${stat.name}-momentum`}>
                  <span className="momentum-name">{stat.name}</span>
                  <div className="momentum-bar">
                    <div className="momentum-fill" style={fillStyle}>
                      <span className="momentum-count">{stat.techCount} tech</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="projects">
          <h2>Project Stories</h2>
          <ul className="project-list">
            {projects.map((project) => {
              const yearText = formatYear(project.year);

              return (
                <li key={project.name} className="project-card">
                  <div className="project-heading">
                    <h3>
                      <a href={project.link} target="_blank" rel="noreferrer">
                        {project.name}
                      </a>
                    </h3>
                    {yearText ? <span className="project-year">{yearText}</span> : null}
                  </div>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-meta">
                    <span className="meta-label">Stack:</span>
                    <ul className="tech-list">
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    {project.source ? (
                      <a className="source-link" href={project.source} target="_blank" rel="noreferrer">
                        Source
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="matrix">
          <h2>Technology Matrix</h2>
          <p className="matrix-description">
            Columns list the available technologies and approaches. Rows represent projects. A check mark means the
            project shipped with that technology in its toolkit.
          </p>

          <div className="matrix-wrapper" role="region" aria-label="Technology usage matrix">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  {sortedTechnologies.map((tech) => (
                    <th key={tech.name} scope="col">
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-category">{tech.category}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const techSet = projectTechSets.get(project.name) ?? new Set<string>();

                  return (
                    <tr key={`matrix-${project.name}`}>
                      <th scope="row" className="matrix-project">
                        <span>{project.name}</span>
                      </th>
                      {sortedTechnologies.map((tech) => {
                        const hasTech = techSet.has(tech.name);
                        return (
                          <td
                            key={`${project.name}-${tech.name}`}
                            className={hasTech ? 'matrix-cell has-tech' : 'matrix-cell'}
                            aria-label={`${project.name} ${hasTech ? 'uses' : 'does not use'} ${tech.name}`}
                          >
                            {hasTech ? '✔' : ''}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="matrix-legend">
            <span className="legend-mark">✔</span>
            <span className="legend-text">Project completed with the listed technology.</span>
          </div>
        </section>

        <section className="contact" aria-labelledby="contact-heading">
          <div className="contact-panel">
            <h2 id="contact-heading">Let&apos;s build something purposeful</h2>
            <p>
              Ready to co-create a product or need help untangling a tricky interface? I&apos;m available for product design,
              full-stack prototyping, and collaborative sprint work.
            </p>
            <div className="contact-grid" role="list">
              <a className="contact-chip" href="mailto:hello@&lt;name&gt;.com" role="listitem">
                <span className="contact-chip-label">Email</span>
                <span className="contact-chip-value">hello@&lt;name&gt;.com</span>
              </a>
              <a className="contact-chip" href="https://cal.com/&lt;name&gt;/build" target="_blank" rel="noreferrer" role="listitem">
                <span className="contact-chip-label">Book a call</span>
                <span className="contact-chip-value">cal.com/&lt;name&gt;/build</span>
              </a>
              <a className="contact-chip" href="https://www.linkedin.com/in/&lt;name&gt;" target="_blank" rel="noreferrer" role="listitem">
                <span className="contact-chip-label">LinkedIn</span>
                <span className="contact-chip-value">linkedin.com/in/&lt;name&gt;</span>
              </a>
              <div className="contact-chip contact-chip--static" role="listitem">
                <span className="contact-chip-label">Based in</span>
                <span className="contact-chip-value">Lisbon → Remote worldwide</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Hand-built with curiosity. Ping me when you&apos;re ready for the next release-worthy experiment.
        </p>
      </footer>
    </div>
  );
}
