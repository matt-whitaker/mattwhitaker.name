// Left-column content for each career layer — a one-line lede, a row of
// role chips, and a list of work archetypes (categories of systems
// I've built or contributed to, deliberately not named projects).
// Keyed by the same area names as careerSkills so a layer pulls both
// halves from one key. Order of `archetypes` is display order; the list
// renders in two columns above the sm breakpoint, so even counts read
// tidiest.
export const careerFocus = {
  frontend: {
    lede: "My core discipline, much of my career as a SME and mentor",
    roles: ['Technical Lead', 'Frontend Architect', 'Design Systems', 'Browser Performance'],
    archetypes: [
      'Design systems & component libraries',
      'Data-dense dashboards & analytics',
      'Administrative & internal tooling',
      'Marketing & landing experiences',
      'Accessibility & internationalization',
      'Web performance',
    ],
  },
  backend: {
    lede: 'A genuine fullstack reach, at home across every layer behind the UI.',
    roles: ['Fullstack Engineer', 'API & Service Design', 'Distributed Architecture'],
    archetypes: [
      'RESTful API design',
      'Backend-for-frontend & orchestration',
      'Distributed microservices',
      'Serverless & event-driven workloads',
      'MVC applications (.NET, Spring)',
      'CMS & content pipelines',
    ],
  },
  data: {
    lede: 'Years of modeling, storing, and moving data alongside the fullstack work.',
    roles: ['Data Modeling', 'Schema Design'],
    archetypes: [
      'Relational modeling & schema design',
      'Query design & performance tuning',
      'NoSQL & access-pattern stores',
      'Data flow from storage to client',
    ],
  },
  infra: {
    lede: 'A supporting role, but I have some experience maintaining IaC codebases and am familiar with many AWS products.',
    roles: ['Systems Design', 'Serverless orchestration', 'IaC'],
    archetypes: [
      'Edge architecture & orchestration',
      'Serverless infrastructure',
      'CI/CD & deployment pipelines',
      'Container platforms (Kubernetes)',
      'Performance & service scaling'
    ],
  },
};
