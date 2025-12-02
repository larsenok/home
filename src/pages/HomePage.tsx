import { SiteShell } from '../components/SiteChrome';

type Project = {
  title: string;
  description: string;
  caseStudy: string;
  accent: string;
  visualLabel: string;
};

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

const projects: Project[] = [
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

const contactDetails: ContactDetail[] = [
  { label: 'Email', value: 'larsen.olek@gmail.com', href: 'mailto:larsen.olek@gmail.com' },
  { label: 'Location', value: 'Oslo, Norway' },
  { label: 'Phone', value: '+47 900 00 000', href: 'tel:+4790000000' },
  {
    label: 'Availability',
    value: 'Booking new collaborations for autumn',
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Independent product designer &amp; front-end partner</p>
          <h1>Help teams ship fast</h1>
          <p className="hero-subtitle">Prototype flows, build polished UIs, and stay on-call through launch.</p>
          <a className="primary-button" href="#contact">
            Start a project together
          </a>
          <a className="text-link" href="/wiki">
            Browse the project wiki
          </a>
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
          I’ve spent the last decade moving between design studios and in-house product squads. My sweet spot is translating
          technical problems into calm flows, then partnering with engineers to get the details right. Outside of client work
          you’ll find me tinkering with modular synths or cycling along the Oslofjord.
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
    </SiteShell>
  );
}
