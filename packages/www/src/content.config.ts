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
  // Keeps the entry undiscoverable. The one flag drives all three signals,
  // derived through noindex-routes.js: a robots.txt Disallow, omission from
  // the sitemap, and `noindex, follow` on the detail page. The meta tag is
  // unreachable behind the Disallow and kept only so the page stays out of
  // the index if that rule is ever lifted.
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
