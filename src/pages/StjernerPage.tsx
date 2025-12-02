import type { NavLink } from '../components/SiteChrome';
import { SiteShell } from '../components/SiteChrome';
import { stjernerEntry } from '../data/wiki';

const stjernerNav: NavLink[] = [
  { label: 'Wiki', href: '/wiki', className: 'nav-outline' },
  { label: 'Home', href: '/', className: 'nav-outline' },
];

export default function StjernerPage() {
  return (
    <SiteShell navLinks={stjernerNav}>
      <section className="reading-page">
        <div className="section-heading">
          <p className="eyebrow">Stjerner</p>
          <h1>Privacy Policy</h1>
          <p>{stjernerEntry.summary}</p>
        </div>
        <article className="reading-article" id="wiki-stjerner">
          {stjernerEntry.details.map((paragraph, index) => (
            <p key={`stjerner-paragraph-${index}`}>{paragraph}</p>
          ))}
        </article>
        <a className="text-link" href="/wiki">
          Back to Wiki overview
        </a>
      </section>
    </SiteShell>
  );
}
