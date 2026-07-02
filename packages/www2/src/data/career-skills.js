// Skill bars for the Career section. Bar length encodes years of
// experience, relative to the deepest skill across every layer (so a
// bar in Data is directly comparable to one in Frontend, not just
// within its own layer). Strength is a separate, self-assessed axis —
// shown as both fill opacity and an explicit tier label, since opacity
// alone isn't an accessible way to convey information.
//
// All numbers here are placeholders — edit freely, everything derives
// from this one file.

export const strengthLabels = {
  comfortable: 'Comfortable',
  strong: 'Strong',
  expert: 'Expert',
};

export const strengthOpacity = {
  comfortable: 55,
  strong: 75,
  expert: 100,
};

export const careerSkills = {
  frontend: [
    { name: 'React', years: 10, strength: 'expert' },
    { name: 'TypeScript', years: 8, strength: 'expert' },
    { name: 'Performance', years: 9, strength: 'strong' },
    { name: 'RxJS', years: 6, strength: 'strong' },
    { name: 'a11y / i18n', years: 7, strength: 'comfortable' },
  ],
  backend: [
    { name: 'Node', years: 8, strength: 'strong' },
    { name: '.NET', years: 6, strength: 'strong' },
    { name: 'Spring Boot', years: 4, strength: 'comfortable' },
    { name: 'Flask', years: 3, strength: 'comfortable' },
  ],
  data: [
    { name: 'Postgres', years: 7, strength: 'strong' },
    { name: 'DynamoDB', years: 4, strength: 'comfortable' },
    { name: 'Cassandra', years: 2, strength: 'comfortable' },
  ],
  infra: [
    { name: 'System design', years: 8, strength: 'strong' },
    { name: 'Edge layer', years: 5, strength: 'strong' },
    { name: 'K8s', years: 4, strength: 'comfortable' },
  ],
};

export const maxSkillYears = Math.max(
  ...Object.values(careerSkills)
    .flat()
    .map((skill) => skill.years),
);
