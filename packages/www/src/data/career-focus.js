// Left-column content for each career layer — a one-line lede, a row of
// role chips, and a list of work archetypes (categories of systems
// I've built or contributed to, deliberately not named projects).
// Keyed by the same area names as careerSkills so a layer pulls both
// halves from one key. Order of `archetypes` is display order; the list
// renders in two columns above the sm breakpoint, so even counts read
// tidiest.
export const careerFocus = {
  frontend: {
    lede: "My focus has always been front-facing applications and interface concerns. It's what I'm strongest at",
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
    lede: `I've had opportunities to work on a diverse range of stacks.`,
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
    lede: 'Plenty of opportunities to think about data design.',
    roles: ['Data Modeling', 'Schema Design'],
    archetypes: [
      'Relational Database Design',
      'Cache modeling',
      'NoSQL and tail-end stores',
      'Failover and recovery', 
      'Scale and performance optimization',
    ],
  },
  infra: {
    lede: 'My experience is largely in the AWS space, but I\'ve worked on a number of infrastructures.',
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
