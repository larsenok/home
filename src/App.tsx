import './index.css';

const projects = [
  {
    title: 'Puzl',
    description:
      'Built a self-tuning puzzle engine with live feedback loops so players always feel a step ahead of the challenge.',
    caseStudy: 'https://puzl.vercel.app/',
    accent: '#dbe4ff',
    visualLabel: 'Abstract render of the adaptive puzzle dashboard',
  },
  {
    title: 'Brain2',
    description:
      'Prototyped and shipped a networked notes tool that maps team ideas in real time and keeps context close to the work.',
    caseStudy: 'https://brain2-two.vercel.app/',
    accent: '#c7f9cc',
    visualLabel: 'Stylised cards representing connected notes',
  },
  {
    title: 'Open Energy',
    description:
      'Designed grid monitoring dashboards that translate dense telemetry into calm stories field crews can act on instantly.',
    caseStudy: 'https://open-energy-blond.vercel.app/',
    accent: '#ffe0e0',
    visualLabel: 'Dashboard snapshot showing live grid analytics',
  },
];

const contactDetails = [
  { label: 'Email', value: 'larsen.olek@gmail.com', href: 'mailto:larsen.olek@gmail.com' },
  { label: 'Location', value: 'Oslo, Norway' },
  { label: 'Phone', value: '+47 900 00 000', href: 'tel:+4790000000' },
  {
    label: 'Availability',
    value: 'Booking new collaborations for autumn',
  },
];

const wikiEntries = [
  {
    id: 'process',
    title: 'Project Rhythm',
    summary: 'From kickoff to launch in five steady beats.',
    details:
      'Understand how I scope, run discovery, draft prototypes, share progress, and land releases without surprises.',
  },
  {
    id: 'toolkit',
    title: 'Toolkit & Stack',
    summary: 'The tools I use daily and why they stick.',
    details:
      'Design systems in Figma, production builds in React/Vite, and light backend glue with Supabase or Firebase when needed.',
  },
  {
    id: 'collab',
    title: 'Collaboration Notes',
    summary: 'What to expect when we work together.',
    details:
      'Preferred meeting cadence, async updates, and how decisions get documented so everyone stays in sync.',
  },
];

export default function App() {
  return (
    <div className="site">
      <header className="site-header">
        <a className="site-logo" href="/">
          Ole Larsen
        </a>
        <nav className="site-nav">
          <a href="#wiki">Wiki</a>
          <a className="nav-cta" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Independent product designer & front-end partner</p>
            <h1>I help small teams ship clear internal tools fast.</h1>
            <p className="hero-subtitle">Prototype flows, build polished UIs, and stay on-call through launch.</p>
            <a className="primary-button" href="#contact">
              Start a project together
            </a>
          </div>
        </section>

        <section className="wiki" id="wiki">
          <div className="section-heading">
            <h2>Wiki Table of Contents</h2>
            <p>Quick notes clients request most often—jump in wherever you need context.</p>
          </div>
          <div className="wiki-toc">
            {wikiEntries.map((entry) => (
              <a key={entry.id} className="wiki-toc-item" href={`#wiki-${entry.id}`}>
                <span>{entry.title}</span>
                <p>{entry.summary}</p>
              </a>
            ))}
          </div>
          <div className="wiki-sections">
            {wikiEntries.map((entry) => (
              <article key={entry.id} id={`wiki-${entry.id}`}>
                <h3>{entry.title}</h3>
                <p>{entry.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section-heading">
            <h2>Recent collaborations</h2>
            <p>Selected projects where I owned both the product thinking and the hands-on execution.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <figure
                  className="project-thumbnail"
                  style={{ backgroundColor: project.accent }}
                  aria-label={project.visualLabel}
                />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a className="text-link" href={project.caseStudy} target="_blank" rel="noreferrer">
                    Case Study
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-heading">
            <h2>About Me</h2>
          </div>
          <p>
            I’ve spent the last decade moving between design studios and in-house product squads. My sweet spot is translating technical problems into calm flows, then partnering with engineers to get the details right. Outside of client work you’ll find me tinkering with modular synths or cycling along the Oslofjord.
          </p>
        </section>

        <section className="contact" id="contact">
          <div className="section-heading">
            <h2>Let’s Connect</h2>
            <p>Tell me what you’re building and I’ll share how I can help—or grab a time slot that works for you.</p>
          </div>
          <ul className="contact-list">
            {contactDetails.map((detail) => (
              <li key={detail.label}>
                <span className="contact-label">{detail.label}</span>
                {detail.href ? (
                  <a href={detail.href}>{detail.value}</a>
                ) : (
                  <span>{detail.value}</span>
                )}
              </li>
            ))}
          </ul>
          <a
            className="secondary-button"
            href="https://cal.com/ole-larsen/intro"
            target="_blank"
            rel="noreferrer"
          >
            Schedule a 20 min intro call
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Ole Larsen. Independent designer & builder.</p>
        <a href="#wiki">Wiki</a>
      </footer>
    </div>
  );
}
