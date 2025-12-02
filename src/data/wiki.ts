export type WikiEntry = {
  id: string;
  title: string;
  summary: string;
  details: string[];
};

export const wikiEntries: WikiEntry[] = [
  {
    id: 'process',
    title: 'Project Rhythm',
    summary: 'From kickoff to launch in five steady beats.',
    details: [
      'Understand how I scope, run discovery, draft prototypes, share progress, and land releases without surprises.',
    ],
  },
  {
    id: 'toolkit',
    title: 'Toolkit & Stack',
    summary: 'The tools I use daily and why they stick.',
    details: [
      'Design systems in Figma, production builds in React/Vite, and light backend glue with Supabase or Firebase when needed.',
    ],
  },
  {
    id: 'collab',
    title: 'Collaboration Notes',
    summary: 'What to expect when we work together.',
    details: [
      'Preferred meeting cadence, async updates, and how decisions get documented so everyone stays in sync.',
    ],
  },
];

export const stjernerEntry: WikiEntry = {
  id: 'stjerner',
  title: 'Stjerner Privacy Policy',
  summary: 'How the Stjerner mobile game handles your data.',
  details: [
    'Stjerner is a small puzzle game published on Google Play. The game only records completed games with their difficulty level and completion time so you can review your history and improve.',
    'No personal identifiers, contact details, or advertising IDs are collected. We do not use third-party analytics or ad networks.',
    'Game results are stored in a secure database with access limited to the service operators. Data is retained only as long as needed to provide in-game history and may be deleted upon request via the contact details in the store listing.',
    'Stjerner is intended for general audiences and is not directed to children under 13. Updates to this policy will be posted on this page with a fresh revision date.',
  ],
};
