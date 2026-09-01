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
    blurb: 'A decade of React-based interfaces.',
    icons: [
      { name: 'React', className: 'fa-brands fa-react' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Redux', icon: 'simple-icons:redux' },
      { name: 'TanStack', icon: 'simple-icons:tanstack' },
    ],
  },
  {
    label: 'Style & Design',
    blurb: 'A token-first approach to styling, adaptable across ecosystems.',
    icons: [
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
      { name: 'Bootstrap', className: 'fa-brands fa-bootstrap' },
      { name: 'Figma', className: 'fa-brands fa-figma' },
      { name: 'Storybook', icon: 'simple-icons:storybook' },
    ],
  },
  {
    label: 'Services',
    blurb: 'Experience across a wide variety of server-side languages.',
    icons: [
      { name: 'Node.js', className: 'fa-brands fa-node-js' },
      { name: 'Python', className: 'fa-brands fa-python' },
      { name: 'Java', className: 'fa-brands fa-java' },
      { name: 'MySQL', icon: 'simple-icons:mysql' }
    ],
  },
  {
    label: 'Cloud',
    blurb: 'Serverless and containerized applications.',
    icons: [
      { name: 'AWS', className: 'fa-brands fa-aws' },
      { name: 'Docker', className: 'fa-brands fa-docker' },
      { name: 'Terraform', icon: 'simple-icons:terraform' },
    ],
  },
  {
    label: 'Workflow',
    blurb: 'Automation, AI workflows, integrated CI/CD',
    icons: [
      { name: 'GitHub', className: 'fa-brands fa-github' },
      { name: 'Vite', icon: 'simple-icons:vite' },
      { name: 'Claude Code', icon: 'simple-icons:claudecode' },
    ],
  },
];
