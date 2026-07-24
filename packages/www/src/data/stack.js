// Micro-stacks for the radial "how I work" overview. Order here is the
// order around the circle, starting at 12 o'clock and going clockwise —
// Stack.astro derives each node's angle from its index, so reordering
// this array reorders the wheel with no markup change.
//
// Icons are Font Awesome *brand* classes, which the kit in Layout.astro
// already loads. FA Brands has no glyph for Tailwind, TypeScript, Astro,
// or TanStack, so those live in the blurb prose instead of as icons —
// keep that in mind before swapping an icon in.
export const stackGroups = [
  {
    label: 'Interface',
    blurb: 'React and TypeScript, composed so the seams still read a year later.',
    icons: [
      { name: 'React', className: 'fa-brands fa-react' },
      { name: 'JavaScript', className: 'fa-brands fa-js' },
      { name: 'HTML5', className: 'fa-brands fa-html5' },
    ],
  },
  {
    label: 'Styling',
    blurb: 'Tailwind tokens over bespoke CSS — systems that survive the handoff.',
    icons: [
      { name: 'CSS3', className: 'fa-brands fa-css3-alt' },
      { name: 'Sass', className: 'fa-brands fa-sass' },
      { name: 'Figma', className: 'fa-brands fa-figma' },
    ],
  },
  {
    label: 'Services',
    blurb: 'Node for orchestration; Python or Java where the domain already lives.',
    icons: [
      { name: 'Node.js', className: 'fa-brands fa-node-js' },
      { name: 'Python', className: 'fa-brands fa-python' },
      { name: 'Java', className: 'fa-brands fa-java' },
    ],
  },
  {
    label: 'Edge & Cloud',
    blurb: 'Serverless first at the edge, containers when state earns them.',
    icons: [
      { name: 'AWS', className: 'fa-brands fa-aws' },
      { name: 'Docker', className: 'fa-brands fa-docker' },
      { name: 'Linux', className: 'fa-brands fa-linux' },
    ],
  },
  {
    label: 'Workflow',
    blurb: 'Small PRs, trunk-based, and CI that fails loudly before users do.',
    icons: [
      { name: 'Git', className: 'fa-brands fa-git-alt' },
      { name: 'GitHub', className: 'fa-brands fa-github' },
      { name: 'npm', className: 'fa-brands fa-npm' },
    ],
  },
];
