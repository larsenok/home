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

type Translation = {
  heroLabel: string;
  heroTitle: string;
  heroTagline: string;
  heroAside: string;
  contactHeading: string;
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
  languageOptions: { en: string; no: string };
};

const data = rawData as DataFile;

const contactDetails: { label: string; value: Record<Language, string> }[] = [
  { label: '<name>=', value: { en: 'Ole Larsen', no: 'Ole Larsen' } },
  {
    label: '<role>=',
    value: {
      en: 'Result-oriented engineer & problem solver',
      no: 'Resultatorientert utvikler og problemløser',
    },
  },
  { label: '<email>=', value: { en: 'larsen.olek@gmail.com', no: 'larsen.olek@gmail.com' } },
  { label: '<location>=', value: { en: 'Oslo, Norway', no: 'Oslo, Norge' } },
  { label: '<availability>=', value: { en: 'Ready to help', no: 'Klar til å bidra' } },
];

const translations: Record<Language, Translation> = {
  en: {
    heroLabel: '',
    heroTitle: 'Project Atlas',
    heroTagline:
      'Notes from the workshop. \nFinished and on-going builds.',
    heroAside:
      'Explore the catalog, borrow an idea, or send a message.',
    contactHeading: 'Contact',
    intro:
      '',
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
      en: 'English',
      no: 'Norsk',
    },
  },
  no: {
    heroLabel: '',
    heroTitle: 'Prosjektatlas',
    heroTagline:
      'Notater fra verkstedet. Ferdig og pågående arbeid.',
    heroAside:
      'Bla i katalogen, lån en idé eller ta kontakt.',
    contactHeading: 'Kont',
    intro:
      '',
    projectsHeading: 'Prosjekter',
    projectStackLabel: 'Verktøykasse:',
    projectSourceLabel: 'Kilde',
    observatoryHeading: 'Verktøysobservatoriet',
    observatoryDescription:
      'Et komprimert øyeblikksbilde av de mest brukte stackene—sortert etter disiplin og med en plan om å bli et radialt varmekart som viser bruk etter aktualitet og intensitet.',
    observatoryToolCount: (count) => `${count} verktøy`,
    observatoryShowMore: (count) => `Vis ${count} til`,
    observatoryFrequency: (count) =>
      count > 0 ? `${count} prosjekt${count > 1 ? 'er' : ''}` : 'Utforskes',
    observatoryAwaiting: 'Venter på første innslag',
    languageLabel: 'Språk',
    languageOptions: {
      en: 'Engelsk',
      no: 'Norsk',
    },
  },
};

const projectSummaries: Record<string, Record<Language, string>> = {
  Puzl: {
    en: 'A simple homemade puzzle game with multiple difficulty levels - a fresh twist on sudoku and number matching.',
    no: 'Et enkelt, hjemmelaget puslespill med flere vanskelighetsgrader - en ny vri på sudoku og tallmatching.',
  },
  Brain2: {
    en: 'A structured note-taking app designed to help organize ideas and surface connections quickly.',
    no: 'En strukturert notatapp som gjør det lett å rydde i ideer og spotte koblinger kjapt.',
  },
  'Open Energy': {
    en: 'An interactive page for testing and visualization of gathered data and real-time updates, using open data APIs.',
    no: 'En interaktiv side for testing og visualisering av innsamlet data og sanntidsoppdatering, via åpne data-API-er.',
  },
  'Retro Portfolio': {
    en: 'This page! A single-page calling card that leans into "vintage" design and concise storytelling.',
    no: 'Denne siden! Et visittkort på én side som spiller på «gammeldags» design og enkel historiefortelling.',
  },
};

const formatYear = (year?: number) => (year ? year.toString() : undefined);

const detectLanguage = (): Language => {
  if (typeof navigator !== 'undefined') {
    const navigatorLanguages =
      typeof navigator.languages !== 'undefined'
        ? Array.from(navigator.languages)
        : [];

    const languages = [navigator.language, ...navigatorLanguages]
      .filter((value): value is string => Boolean(value))
      .map((value) => value.toLowerCase());

    if (languages.some((lang) => lang.startsWith('no') || lang.startsWith('nb') || lang.startsWith('nn'))) {
      return 'no';
    }
  }

  return 'en';
};

export default function App() {
  const { technologies, projects } = data;

  const [language, setLanguage] = useState<Language>(() => detectLanguage());

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
    const usedBy = projects.filter((project) => {
      const techSet = projectTechSets.get(project.name);
      return techSet !== undefined && techSet.has(tech.name);
    });
    return {
      ...tech,
      usedBy,
      frequency: usedBy.length,
      weight: Math.round((usedBy.length / projects.length) * 100),
    };
  });

  const groupedByCategory = technologyUsage.reduce<Map<string, TechnologyUsage[]>>((map, tech) => {
    const existing = map.get(tech.category);
    if (existing !== undefined) {
      existing.push(tech);
    } else {
      map.set(tech.category, [tech]);
    }
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
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
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
              const projectSummary = projectSummariesForLanguage[project.name];
              const localizedSummary =
                projectSummary !== undefined && projectSummary[language] !== undefined
                  ? projectSummary[language]
                  : project.summary;
                  
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
