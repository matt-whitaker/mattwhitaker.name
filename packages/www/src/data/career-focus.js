// Left-column content for each career layer — a one-line lede, a row of
// role chips, and a list of work archetypes (categories of systems
// I've built or contributed to, deliberately not named projects).
// Keyed by the same area names as careerSkills so a layer pulls both
// halves from one key. Order of `archetypes` is display order; the list
// renders in two columns above the sm breakpoint, so even counts read
// tidiest.
export const careerFocus = {
  frontend: {
    lede: "Front-end is my strength, in any role, across various stacks, it's been the most consistent.",
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
    lede: 'Wide array of experience on different backend stacks. Adaptable, bringing a first principles mindset to cross languages seamlessly.',
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
    lede: 'Plenty of opportunities to think about data design and architecture for databases, but not my forte',
    roles: ['Data Modeling', 'Schema Design'],
    archetypes: [
      'Relational modeling & schema design',
      'Query design & performance tuning',
      'NoSQL & access-pattern stores',
      'Data flow from storage to client',
    ],
  },
  infra: {
    lede: 'I have some experience maintaining IaC codebases and am familiar with many AWS products, focus is more on architecture',
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
