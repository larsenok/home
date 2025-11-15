import './index.css';

const projects = [
  {
    title: 'Puzl',
    description:
      'A logic-first puzzle platform that adapts to the player, streaming custom difficulty ramps and celebrating wins with tactile micro-interactions.',
    caseStudy: 'https://puzl.vercel.app/',
    thumbnailNote: 'Use a crisp board mockup with highlighted number tiles against a soft gradient backdrop.',
    accent: 'linear-gradient(135deg, #f8d1ff, #a07be9)',
    visualLabel: 'Abstract render of the adaptive puzzle dashboard',
  },
  {
    title: 'Brain2',
    description:
      'Networked notebooks for fast-moving product teams—capture ideas, surface relationships, and slot insights straight into decision flows.',
    caseStudy: 'https://brain2-two.vercel.app/',
    thumbnailNote: 'Layer overlapping cards that hint at graph connections with a charcoal-to-indigo wash.',
    accent: 'linear-gradient(135deg, #d7f3ff, #6aa2ff)',
    visualLabel: 'Stylised cards representing connected notes',
  },
  {
    title: 'Open Energy',
    description:
      'Real-time monitoring for energy co-ops, translating live grid metrics into calm, scannable stories for field teams and stakeholders.',
    caseStudy: 'https://open-energy-blond.vercel.app/',
    thumbnailNote: 'Display a live data panel with a neon accent line chart on deep navy.',
    accent: 'linear-gradient(135deg, #ffe6c3, #ff8a57)',
    visualLabel: 'Dashboard snapshot showing live grid analytics',
  },
];

const contactDetails = [
  { label: 'Email', value: 'larsen.olek@gmail.com', href: 'mailto:larsen.olek@gmail.com' },
  { label: 'Location', value: 'Oslo, Norway' },
  { label: 'Phone', value: '+47 900 00 000', href: 'tel:+4790000000' },
  {
    label: 'Availability',
    value: 'Accepting new product briefs for Q3',
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
          <a href="/wiki">Wiki</a>
          <a className="nav-cta" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Freelance Product Designer & Frontend Partner</p>
            <h1>Designing calm digital experiences for teams who ship fast.</h1>
            <p className="hero-subtitle">
              I help founders and product leads translate complex systems into intuitive journeys—strategy, interface, and polished build support.
            </p>
            <a className="primary-button" href="#contact">
              Start a Project
            </a>
            <p className="hero-visual-note">
              Suggested hero treatment: pair this copy with a soft spotlight gradient over a monochrome studio portrait or a macro shot of interface sketches.
            </p>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section-heading">
            <h2>Top Collaborations</h2>
            <p>
              Three recent builds that capture how strategy, craft, and measured motion come together across different problem spaces.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <figure
                  className="project-thumbnail"
                  style={{ backgroundImage: project.accent }}
                  aria-label={project.visualLabel}
                />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a className="text-link" href={project.caseStudy} target="_blank" rel="noreferrer">
                    Case Study
                  </a>
                  <p className="project-visual-note">{project.thumbnailNote}</p>
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
            I blend product strategy with hands-on design and build, partnering with teams from first sketch to launch-ready handoff. Past gigs range from data-rich dashboards to tactile creative tools, all guided by clear storytelling and measurable impact.
          </p>
        </section>

        <section className="contact" id="contact">
          <div className="section-heading">
            <h2>Let’s Connect</h2>
            <p>Drop a note with your project goals, or grab time directly on my calendar.</p>
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
        <a href="/wiki">Wiki</a>
      </footer>
    </div>
  );
}
