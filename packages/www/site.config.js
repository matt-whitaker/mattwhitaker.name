export default {
  url: 'https://mattwhitaker.name',
  description: 'Matt Whitaker is a senior frontend engineer with over a decade of experience building React and TypeScript interfaces and the full-stack systems behind them. Also makes music as The Emwhit Project.',
  email: 'contact@mattwhitaker.name',
  linkedin: 'https://www.linkedin.com/in/whitakermatt',
  github: 'https://github.com/matt-whitaker',
  emwhit: "https://emwhitproject.com",
  fontawesome: 'https://kit.fontawesome.com/48be7dbb92.js',
  fonts: {
    urbanist: 'https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap'
  },
  // Root-relative (/#x, not #x) so they work from project detail
  // pages too; on the homepage they behave identically to plain
  // hash links.
  navLinks: [
    { href: '/#intro', label: 'Intro' },
    { href: '/#career', label: 'Career' },
    { href: '/#music', label: 'Music' },
    //{ href: '/#case-studies', label: 'Case Studies' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' }
  ]
};
