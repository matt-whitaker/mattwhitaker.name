import { getCollection } from 'astro:content';
import site from '../../site.config.js';

// Generated so the Disallow list can't drift from the routes it names — a
// static public/robots.txt disallowed a /projects/brandfluence that has never
// existed. The `noindex` frontmatter flag is the source; astro.config.mjs
// reads the same flag to drop the entry from the sitemap.
export async function GET() {
  const disallow = (
    await Promise.all(
      ['projects', 'archives'].map(async (collection) => {
        const entries = await getCollection(collection, ({ data }) => data.noindex);
        return entries.map(({ id }) => `Disallow: /${collection}/${id}`);
      })
    )
  ).flat();

  const lines = ['User-agent: *', 'Allow: /', ...disallow, `Sitemap: ${site.url}/sitemap-index.xml`];

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
