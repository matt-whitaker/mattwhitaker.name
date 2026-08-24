import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// `astro:content` isn't available at config time, so the sitemap reads the
// entries' `noindex` flag off the files directly. Derived rather than listed
// by hand: a hardcoded path here outlived the route it named.
const noindexRoutes = ['projects', 'archives'].flatMap((collection) => {
  const dir = fileURLToPath(new URL(`./src/content/${collection}/`, import.meta.url));
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => {
      const frontmatter = readFileSync(dir + file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontmatter) throw new Error(`No frontmatter in src/content/${collection}/${file}`);
      return /^noindex:[ \t]*true[ \t]*$/m.test(frontmatter[1]);
    })
    .map((file) => `/${collection}/${file.replace(/\.md$/, '')}/`);
});

export default defineConfig({
  site: 'https://mattwhitaker.name',
  integrations: [
    icon(),
    sitemap({
      customPages: [],
      filter: (page) => !noindexRoutes.some((route) => page.endsWith(route)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
