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

  return (
    <div className="page">
      <header className="hero">
        <h1>Project Hub</h1>
        <p className="tagline">A lightweight index of experiments, utilities, and curiosities.</p>
      </header>

      <main>
        <section className="intro">
          <p>
            Welcome to a tidy corner of the web where every build is catalogued. No frameworks-on-top-of-frameworks
            here—just hand-tuned notes about each project and a simple ledger of the technologies they touch.
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
      </main>

      <footer className="footer">
        <p>@ 2025</p>
      </footer>
    </div>
  );
}
