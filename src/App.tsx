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

type StackHighlight = {
  title: string;
  description: string;
};

type TechnologyUsage = Technology & {
  usedBy: Project[];
  frequency: number;
  weight: number;
};

const data = rawData as DataFile;

const formatYear = (year?: number) => (year ? year.toString() : undefined);

const contactDetails = [
  { label: '<name>=', value: 'Ole Larsen' },
  { label: '<role>=', value: 'Product-minded engineer & tinkerer' },
  { label: '<email>=', value: 'larsen.olek@gmail.com' },
  { label: '<location>=', value: 'Oslo, Norway' },
  { label: '<availability>=', value: 'Ready to help' },
];

const stackHighlights: StackHighlight[] = [
  {
    title: 'React + TypeScript',
    description: 'Component-first ergonomics with type safety baked in.',
  },
  {
    title: 'Vite Build System',
    description: 'Lightning-fast local feedback loops and lean production bundles.',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first styling to keep experiments tactile and cohesive.',
  },
  {
    title: 'Vercel Hosting',
    description: 'Edge deployments with frictionless previews for every iteration.',
  },
  {
    title: 'Supabase Backbone',
    description: 'Managed Postgres, auth, and storage when the work needs a data pulse.',
  },
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
  const technologyUsage: TechnologyUsage[] = sortedTechnologies.map((tech) => {
    const usedBy = projects.filter((project) => projectTechSets.get(project.name)?.has(tech.name));
    return {
      ...tech,
      usedBy,
      frequency: usedBy.length,
      weight: Math.round((usedBy.length / projects.length) * 100),
    };
  });

  const groupedByCategory = technologyUsage.reduce<Map<string, TechnologyUsage[]>>((map, tech) => {
    const existing = map.get(tech.category) ?? [];
    existing.push(tech);
    map.set(tech.category, existing);
    return map;
  }, new Map());

  const condensedMatrix = Array.from(groupedByCategory.entries())
    .map(([category, techs]) => {
      const sorted = [...techs].sort((a, b) => {
        if (b.frequency === a.frequency) {
          return a.name.localeCompare(b.name);
        }
        return b.frequency - a.frequency;
      });

      return {
        category,
        toolCount: sorted.length,
        highlighted: sorted.slice(0, 3),
        remaining: sorted.slice(3),
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category));

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

        <section className="stack-summary" aria-labelledby="stack-summary-heading">
          <div className="stack-summary-heading">
            <h2 id="stack-summary-heading">Build Sheet</h2>
            <p>
              A quick census of the tools powering this lab&mdash;scan it like a legend before diving into the
              experiments below.
            </p>
          </div>
          <ul className="stack-summary-list">
            {stackHighlights.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
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
            A condensed snapshot of the stacks that show up most—grouped by discipline so you can scan for the right
            tool without wading through repetition.
          </p>
          <div className="matrix-grid">
            {condensedMatrix.map((entry) => (
              <article key={entry.category} className="matrix-card">
                <header className="matrix-card-header">
                  <div>
                    <h3>{entry.category}</h3>
                    <span className="matrix-category-summary">
                      {entry.toolCount} {entry.toolCount === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                </header>
                <ul className="matrix-tech-list">
                  {entry.highlighted.map((tech) => (
                    <li key={`${entry.category}-${tech.name}`}>
                      <div className="matrix-tech-heading">
                        <span className="matrix-tech-name">{tech.name}</span>
                        <span className="matrix-tech-frequency">
                          {tech.frequency > 0 ? `${tech.frequency} project${tech.frequency > 1 ? 's' : ''}` : 'Exploring'}
                        </span>
                      </div>
                      <p className="matrix-tech-projects">
                        {tech.usedBy.length > 0
                          ? tech.usedBy.map((project) => project.name).join(', ')
                          : 'Awaiting first spotlight'}
                      </p>
                    </li>
                  ))}
                </ul>
                {entry.remaining.length > 0 ? (
                  <details className="matrix-remaining">
                    <summary>Show {entry.remaining.length} more</summary>
                    <ul>
                      {entry.remaining.map((tech) => (
                        <li key={`${entry.category}-${tech.name}-extra`}>
                          <div className="matrix-tech-heading">
                            <span className="matrix-tech-name">{tech.name}</span>
                            <span className="matrix-tech-frequency">
                              {tech.frequency > 0
                                ? `${tech.frequency} project${tech.frequency > 1 ? 's' : ''}`
                                : 'Exploring'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}
