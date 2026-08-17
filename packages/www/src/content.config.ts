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
