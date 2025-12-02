import type { NavLink } from '../components/SiteChrome';
import { SiteShell } from '../components/SiteChrome';
import { wikiEntries, stjernerEntry } from '../data/wiki';

const secondaryNav: NavLink[] = [
  { label: 'Home', href: '/', className: 'nav-outline' },
];

export default function WikiPage() {
  return (
    <SiteShell navLinks={secondaryNav}>
      <section className="wiki" id="wiki">
        <div className="section-heading">
          <p className="eyebrow">Wiki</p>
          <h1>Working notes</h1>
          <p>Quick answers clients request most often—jump in wherever you need context.</p>
        </div>

        <div className="wiki-toc">
          {wikiEntries.map((entry) => (
            <a key={entry.id} className="wiki-toc-item" href={`#wiki-${entry.id}`}>
              <span>{entry.title}</span>
              <p>{entry.summary}</p>
            </a>
          ))}
          <a className="wiki-toc-item" href="/wiki/stjerner">
            <span>{stjernerEntry.title}</span>
            <p>{stjernerEntry.summary}</p>
          </a>
        </div>

        <div className="wiki-sections">
          {wikiEntries.map((entry) => (
            <article key={entry.id} id={`wiki-${entry.id}`}>
              <h3>{entry.title}</h3>
              {entry.details.map((paragraph, index) => (
                <p key={`${entry.id}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
