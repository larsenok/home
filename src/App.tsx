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

const contactDetails = [
  { label: '<name>=', value: 'Add your name here' },
  { label: '<role>=', value: 'Product-minded engineer & tinkerer' },
  { label: '<email>=', value: 'hello@yourdomain.dev' },
  { label: '<location>=', value: 'Where you are plotting the next build' },
  { label: '<availability>=', value: 'Open to collaborations, coffee chats, and curious problems' },
];

export default function App() {
  const { technologies, projects } = data;

  const sortedTechnologies = [...technologies].sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const projectTechSets = new Map(projects.map((project) => [project.name, new Set(project.technologies)]));
  const technologyUsage = sortedTechnologies.map((tech) => {
    const usedBy = projects.filter((project) => projectTechSets.get(project.name)?.has(tech.name));
    return {
      ...tech,
      usedBy,
      frequency: usedBy.length,
      weight: Math.round((usedBy.length / projects.length) * 100),
    };
  });

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="hero-label">Personal lab report</p>
          <h1>Project Atlas</h1>
          <p className="tagline">
            Notes from the workshop&mdash;celebrating finished builds, near-misses, and the tools that make them
            tick.
          </p>
        </div>
        <aside className="hero-aside">
          <p>
            Every line of code here chased a real itch. Explore the catalog, borrow an idea, or drop a line so we
            can swap stories.
          </p>
        </aside>
      </header>

      <main>
        <section className="contact-card" aria-labelledby="contact-heading">
          <div className="contact-heading">
            <h2 id="contact-heading">Contact Signals</h2>
            <p>Swap these placeholders with your own coordinates&mdash;everything is wired for quick edits.</p>
          </div>
          <ul className="contact-list">
            {contactDetails.map((item) => (
              <li key={item.label}>
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="intro">
          <p>
            There is always a weekend experiment simmering. Some mature into full releases, others teach a sharp
            lesson and end up on the shelf. This space is a living changelog of both, with context on what sparked
            each project and the stack that carried it over the finish line.
          </p>
        </section>

        <section className="projects">
          <h2>Projects</h2>
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
            Instead of cross-referencing rows and columns, skim the cards to see which tools earn repeat appearances,
            where they shine, and how often they get to headline a build.
          </p>
          <div className="matrix-grid">
            {technologyUsage.map((tech) => (
              <article key={tech.name} className="matrix-card">
                <header className="matrix-card-header">
                  <div>
                    <h3>{tech.name}</h3>
                    <span className="matrix-category">{tech.category}</span>
                  </div>
                  <span className="matrix-frequency">{tech.frequency} / {projects.length}</span>
                </header>
                <div className="matrix-progress" role="presentation">
                  <span
                    className="matrix-progress-bar"
                    style={{ width: `${Math.max(tech.weight, tech.frequency ? 8 : 4)}%` }}
                  />
                </div>
                <ul className="matrix-projects" aria-label={`Projects using ${tech.name}`}>
                  {tech.usedBy.length > 0 ? (
                    tech.usedBy.map((project) => (
                      <li key={`${tech.name}-${project.name}`}>{project.name}</li>
                    ))
                  ) : (
                    <li className="matrix-projects-empty">Waiting for its breakout project.</li>
                  )}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © 2025 &middot; Built with curiosity and a steady supply of playlists. Swap the placeholders above with
          your own story.
        </p>
      </footer>
    </div>
  );
}
