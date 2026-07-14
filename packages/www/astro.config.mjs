import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mattwhitaker.name',
  integrations: [
    // Emits sitemap-index.xml (+ sitemap-0.xml) at build time from this
    // project's routes — robots.txt points there. customPages covers
    // subsites deployed alongside www that this build can't see.
    sitemap({
      customPages: [],
    }),
  ],
  // Tailwind v4 is CSS-first (src/style.css is the config) and hooks in
  // as a Vite plugin — same plugin as the pre-Astro setup, just
  // registered through Astro's vite passthrough.
  vite: {
    plugins: [tailwindcss()],
  },
});
