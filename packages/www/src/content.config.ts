import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects and Case Studies render through the same ContentCard
// component, so they share one schema. Adding an entry to either grid
// is dropping a file into its src/content/ directory — never a markup
// change. `thumbnail` stays a plain public/ path (not an image()
// asset) since the files live in public/images.
const contentCard = z.object({
  title: z.string(),
  blurb: z.string(),
  tags: z.array(z.string()),
  href: z.string().url(),
  hrefLabel: z.string().optional(),
  thumbnail: z.string(),
});

// Markdown, not YAML: same frontmatter shape, but each project can
// carry a longer-form writeup in its body for context the card's
// one-line blurb can't hold.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: contentCard,
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/case-studies' }),
  schema: contentCard,
});

export const collections = { projects, 'case-studies': caseStudies };
