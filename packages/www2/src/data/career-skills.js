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
    { name: 'HTML / CSS / JavaScript', years: 12, strength: 'expert' },
    { name: 'TypeScript', years: 6, strength: 'strong' },
    { name: 'React', years: 10, strength: 'expert' },
    { name: 'Redux / RTK', years: 10, strength: 'expert' },
    { name: 'RxJS', years: 6, strength: 'strong' },
    { name: 'Figma / Component Systems', years: 7, strength: 'strong' },
    { name: 'Tailwind', years: 3, strength: 'strong' },
    { name: 'Web Performance', years: 3, strength: 'strong' },
    { name: 'a11y / i18n', years: 9, strength: 'strong' },
  ],
  backend: [
    { name: 'Node.js', years: 8, strength: 'strong' },
    { name: 'C# / .NET', years: 4, strength: 'comfortable' },
    { name: 'Java / Spring Boot', years: 5, strength: 'strong' },
    { name: 'Python / Flask', years: 3, strength: 'comfortable' }
  ],
  data: [
    { name: 'SQL / MySQL', years: 9, strength: 'strong' },
    { name: 'No SQL / MongoDB / DynamoDB', years: 2, strength: 'exposure' }
  ],
  infra: [
    { name: 'System Design', years: 8, strength: 'strong' },
    { name: 'Edge Architecture', years: 8, strength: 'expert' },
    { name: 'AWS', years: 6, strength: 'strong' },
    { name: 'Serverless', years: 4, strength: 'comfortable'},
    { name: 'K8s', years: 9, strength: 'comfortable' },
  ],
};

export const maxSkillYears = Math.max(
  ...Object.values(careerSkills)
    .flat()
    .map((skill) => skill.years),
);
