import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mattwhitaker.name',
  integrations: [
    icon(),
    sitemap({
      customPages: [],
      filter: page => {
        return ![
          '/projects/brandfluence',
          '/archives/pay-i'
        ].some(exclude => page.includes(exclude))
      }
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
