
export const strengthLabels = {
  exposure: 'Exposure',
  comfortable: 'Comfortable',
  strong: 'Strong',
  expert: 'Expert',
};

export const strengthOpacity = {
  exposure: 35,
  comfortable: 55,
  strong: 70,
  expert: 100,
};

export const careerSkills = {
  frontend: [
    { name: 'HTML / CSS / JavaScript', years: 13, strength: 'expert' },
    { name: 'TypeScript', years: 6, strength: 'strong' },
    { name: 'React', years: 9, strength: 'expert' },
    { name: 'RxJS', years: 5, strength: 'strong' },
    { name: 'Figma / Zeplin', years: 9, strength: 'strong' },
    { name: 'Tailwind', years: 3, strength: 'strong' }
  ],
  backend: [
    { name: 'Node.js / Express', years: 4, strength: 'strong' },
    { name: 'C# / .NET', years: 4, strength: 'comfortable' },
    { name: 'Java / Spring Boot', years: 5, strength: 'strong' },
    { name: 'Python / Flask', years: 2, strength: 'comfortable' }
  ],
  data: [
    { name: 'SQL / MySQL', years: 12, strength: 'comfortable' },
    { name: 'No SQL / MongoDB / DynamoDB', years: 2, strength: 'exposure' },
    { name: 'Caching / Redis / ElastiCache', years: 9, strength: 'strong' }
  ],
  infra: [
    { name: 'Microservice Architecture', years: 9, strength: 'strong' },
    { name: 'AWS', years: 9, strength: 'strong' },
    { name: 'Docker / Kubernetes', years: 9, strength: 'comfortable'},
    { name: 'Serverless', years: 6, strength: 'strong' }

  ],
};

export const maxSkillYears = Math.max(
  ...Object.values(careerSkills)
    .flat()
    .map((skill) => skill.years),
);
