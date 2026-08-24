import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared by Projects and Archives, which render through the same
// ContentCard component. `thumbnail` stays a plain public/ path (not an
// image() asset) since the files live in public/images.
const contentCard = z.object({
  title: z.string(),
  blurb: z.string(),
  tags: z.array(z.string()),
  href: z.string().url(),
  hrefLabel: z.string().optional(),
  thumbnail: z.string(),
  // Alt text for `thumbnail`; the card and the detail page fall back to
  // `title` when it's absent.
  alt: z.string().optional(),
  // Keeps the entry out of the index: the detail page renders
  // `noindex, follow` and the sitemap filter in astro.config.mjs drops it.
  // Never pair this with a robots.txt Disallow — a blocked crawler never
  // reads the meta tag.
  noindex: z.boolean().default(false),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: contentCard,
});

const archives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archives' }),
  schema: contentCard,
});

export const collections = { projects, archives };
