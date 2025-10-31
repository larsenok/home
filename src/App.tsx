import { useEffect, useMemo, useState } from 'react';
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

type TechnologyUsage = Technology & {
  usedBy: Project[];
  frequency: number;
  weight: number;
};

type Language = 'en' | 'no';
type LanguagePreference = 'system' | Language;

type Translation = {
  heroLabel: string;
  heroTitle: string;
  heroTagline: string;
  heroAside: string;
  contactHeading: string;
  contactDescription: string;
  intro: string;
  projectsHeading: string;
  projectStackLabel: string;
  projectSourceLabel: string;
  observatoryHeading: string;
  observatoryDescription: string;
  observatoryToolCount: (count: number) => string;
  observatoryShowMore: (count: number) => string;
  observatoryFrequency: (count: number) => string;
  observatoryAwaiting: string;
  languageLabel: string;
  languageOptions: { system: string; en: string; no: string };
};

const data = rawData as DataFile;

const contactDetails: { label: string; value: Record<Language, string> }[] = [
  { label: '<name>=', value: { en: 'Ole Larsen', no: 'Ole Larsen' } },
  { label: '<role>=', value: { en: 'Product-minded engineer & tinkerer', no: 'Produktorientert utvikler og fikler' } },
  { label: '<email>=', value: { en: 'larsen.olek@gmail.com', no: 'larsen.olek@gmail.com' } },
  { label: '<location>=', value: { en: 'Oslo, Norway', no: 'Oslo, Norge' } },
  { label: '<availability>=', value: { en: 'Ready to help', no: 'Klar til å bidra' } },
];

const translations: Record<Language, Translation> = {
  en: {
    heroLabel: 'Personal lab report',
    heroTitle: 'Project Atlas',
    heroTagline:
      'Notes from the workshop—celebrating finished builds, near-misses, and the tools that make them tick.',
    heroAside:
      'Every line of code here chased a real itch. Explore the catalog, borrow an idea, or drop a line so we can swap stories.',
    contactHeading: 'Contact Signals',
    contactDescription: 'Swap these placeholders with your own coordinates—everything is wired for quick edits.',
    intro:
      'There is always a weekend experiment simmering. Some mature into full releases, others teach a sharp lesson and end up on the shelf. This space is a living changelog of both, with context on what sparked each project and the stack that carried it over the finish line.',
    projectsHeading: 'Projects',
    projectStackLabel: 'Stack:',
    projectSourceLabel: 'Source',
    observatoryHeading: 'Toolchain Observatory',
    observatoryDescription:
      'A condensed snapshot of the stacks that show up most—grouped by discipline and begging to become a radial heatmap that plots adoption by recency and intensity.',
    observatoryToolCount: (count) => `${count} ${count === 1 ? 'tool' : 'tools'}`,
    observatoryShowMore: (count) => `Show ${count} more`,
    observatoryFrequency: (count) =>
      count > 0 ? `${count} project${count > 1 ? 's' : ''}` : 'Exploring',
    observatoryAwaiting: 'Awaiting first spotlight',
    languageLabel: 'Language',
    languageOptions: {
      system: 'Auto (system)',
      en: 'English',
      no: 'Norsk',
    },
  },
  no: {
    heroLabel: 'Personlig labbrapport',
    heroTitle: 'Prosjektatlas',
    heroTagline:
      'Notater fra verkstedet—en hyllest til ferdige bygg, nesten-treff og verktøyene som får dem til å gå.',
    heroAside:
      'Hver eneste kodelinje startet med en ekte kløe. Bla i katalogen, lån en idé eller ta kontakt så vi kan dele historier.',
    contactHeading: 'Kontaktspor',
    contactDescription:
      'Bytt ut disse plassholderne med dine egne koordinater—alt er rigget for raske endringer.',
    intro:
      'Det putrer alltid et helgeprosjekt i bakgrunnen. Noen blir til fullverdige lanseringer, andre lærer bort en skarp leksjon og havner på hyllen. Denne siden er en levende endringslogg for begge deler, med kontekst om hva som tente gnisten og stacken som bar prosjektet i mål.',
    projectsHeading: 'Prosjekter',
    projectStackLabel: 'Stack:',
    projectSourceLabel: 'Kilde',
    observatoryHeading: 'Verktøysobservatoriet',
    observatoryDescription:
      'Et komprimert øyeblikksbilde av de mest brukte stackene—sortert etter disiplin og med en plan om å bli et radiellt varmekart som viser adopsjon etter aktualitet og intensitet.',
    observatoryToolCount: (count) => `${count} verktøy`,
    observatoryShowMore: (count) => `Vis ${count} til`,
    observatoryFrequency: (count) =>
      count > 0 ? `${count} prosjekt${count > 1 ? 'er' : ''}` : 'Utforskes',
    observatoryAwaiting: 'Venter på første spotlight',
    languageLabel: 'Språk',
    languageOptions: {
      system: 'Auto (system)',
      en: 'Engelsk',
      no: 'Norsk',
    },
  },
};

const projectSummaries: Record<string, Record<Language, string>> = {
  'Workbench UI': {
    en: 'Component exploration playground for experimenting with interface ideas and motion studies.',
    no: 'En lekeplass for komponentutforskning der grensesnittidéer og animasjoner kan prøves ut fritt.',
  },
  'Open Energy': {
    en: 'An interactive globe that maps real-time energy fluctuations using open data APIs.',
    no: 'En interaktiv globus som viser sanntidsendringer i energibruk ved hjelp av åpne data-API-er.',
  },
  Brain2: {
    en: 'A structured note-taking app designed to help organize ideas and surface connections quickly.',
    no: 'En strukturert notatapp som hjelper til med å organisere idéer og avdekke sammenhenger raskt.',
  },
  'Retro Portfolio': {
    en: 'A single-page calling card that leans into vintage pixels, zine textures, and concise storytelling.',
    no: 'Et visittkort på én side som spiller på retro-piksler, zine-teksturer og konsis historiefortelling.',
  },
};

const formatYear = (year?: number) => (year ? year.toString() : undefined);

const resolveLanguage = (preference: LanguagePreference): Language => {
  if (preference === 'system') {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const normalized = navigator.language.toLowerCase();
      if (normalized.startsWith('en')) {
        return 'en';
      }
    }
    return 'no';
  }
  return preference;
};

export default function App() {
  const { technologies, projects } = data;

  const [languagePreference, setLanguagePreference] = useState<LanguagePreference>('system');
  const [language, setLanguage] = useState<Language>(() => resolveLanguage('system'));

  useEffect(() => {
    setLanguage(resolveLanguage(languagePreference));
  }, [languagePreference]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

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

  const projectSummariesForLanguage = useMemo(() => projectSummaries, []);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="hero-label">{t.heroLabel}</p>
          <h1>{t.heroTitle}</h1>
          <p className="tagline">{t.heroTagline}</p>
        </div>
        <aside className="hero-aside">
          <div className="language-switcher">
            <label className="language-switcher-label" htmlFor="language-select">
              {t.languageLabel}
            </label>
            <select
              id="language-select"
              value={languagePreference}
              onChange={(event) => setLanguagePreference(event.target.value as LanguagePreference)}
            >
              <option value="system">{t.languageOptions.system}</option>
              <option value="en">{t.languageOptions.en}</option>
              <option value="no">{t.languageOptions.no}</option>
            </select>
          </div>
          <p>{t.heroAside}</p>
        </aside>
      </header>

      <main>
        <section className="contact-card" aria-labelledby="contact-heading">
          <div className="contact-heading">
            <h2 id="contact-heading">{t.contactHeading}</h2>
            <p>{t.contactDescription}</p>
          </div>
          <ul className="contact-list">
            {contactDetails.map((item) => (
              <li key={item.label}>
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value[language]}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="intro">
          <p>{t.intro}</p>
        </section>

        <section className="projects">
          <h2>{t.projectsHeading}</h2>
          <ul className="project-list">
            {projects.map((project) => {
              const yearText = formatYear(project.year);
              const localizedSummary = projectSummariesForLanguage[project.name]?.[language] ?? project.summary;

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
                  <p className="project-summary">{localizedSummary}</p>
                  <div className="project-meta">
                    <span className="meta-label">{t.projectStackLabel}</span>
                    <ul className="tech-list">
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    {project.source ? (
                      <a className="source-link" href={project.source} target="_blank" rel="noreferrer">
                        {t.projectSourceLabel}
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="observatory">
          <h2>{t.observatoryHeading}</h2>
          <p className="observatory-description">{t.observatoryDescription}</p>
          <div className="observatory-grid">
            {condensedMatrix.map((entry) => (
              <article key={entry.category} className="observatory-card">
                <header className="observatory-card-header">
                  <div>
                    <h3>{entry.category}</h3>
                    <span className="observatory-category-summary">{t.observatoryToolCount(entry.toolCount)}</span>
                  </div>
                </header>
                <ul className="observatory-tech-list">
                  {entry.highlighted.map((tech) => (
                    <li key={`${entry.category}-${tech.name}`}>
                      <div className="observatory-tech-heading">
                        <span className="observatory-tech-name">{tech.name}</span>
                        <span className="observatory-tech-frequency">
                          {t.observatoryFrequency(tech.frequency)}
                        </span>
                      </div>
                      <p className="observatory-tech-projects">
                        {tech.usedBy.length > 0
                          ? tech.usedBy.map((project) => project.name).join(', ')
                          : t.observatoryAwaiting}
                      </p>
                    </li>
                  ))}
                </ul>
                {entry.remaining.length > 0 ? (
                  <details className="observatory-remaining">
                    <summary>{t.observatoryShowMore(entry.remaining.length)}</summary>
                    <ul>
                      {entry.remaining.map((tech) => (
                        <li key={`${entry.category}-${tech.name}-extra`}>
                          <div className="observatory-tech-heading">
                            <span className="observatory-tech-name">{tech.name}</span>
                            <span className="observatory-tech-frequency">
                              {t.observatoryFrequency(tech.frequency)}
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
