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
      // Simple Icons (via astro-icon) — FA carries none of these.
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Redux', icon: 'simple-icons:redux' },
      { name: 'TanStack', icon: 'simple-icons:tanstack' },
    ],
  },
  {
    label: 'Style & Design',
    blurb: 'A token-first approach to styling, adaptable across ecosystems.',
    icons: [
      // Simple Icons (via astro-icon) — FA has no Tailwind brand glyph.
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
      { name: 'Bootstrap', className: 'fa-brands fa-bootstrap' },
      { name: 'Figma', className: 'fa-brands fa-figma' },
    ],
  },
  {
    label: 'Services',
    blurb: 'Experience across a wide variety of server-side languages.',
    icons: [
      { name: 'Node.js', className: 'fa-brands fa-node-js' },
      { name: 'Python', className: 'fa-brands fa-python' },
      { name: 'Java', className: 'fa-brands fa-java' },
    ],
  },
  {
    label: 'Cloud',
    blurb: 'Serverless and containerized applications.',
    icons: [
      { name: 'AWS', className: 'fa-brands fa-aws' },
      { name: 'Docker', className: 'fa-brands fa-docker' },
      // Simple Icons (via astro-icon) — FA has no Terraform brand glyph.
      { name: 'Terraform', icon: 'simple-icons:terraform' },
    ],
  },
  {
    label: 'Workflow',
    blurb: 'Clean pipelines, automation, and AI agents just make the job easier.',
    icons: [
      { name: 'GitHub', className: 'fa-brands fa-github' },
      // Simple Icons (via astro-icon) — FA has neither Vite nor Claude Code.
      { name: 'Vite', icon: 'simple-icons:vite' },
      { name: 'Claude Code', icon: 'simple-icons:claudecode' },
    ],
  },
];
