import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mattwhitaker.name',
  // Tailwind v4 is CSS-first (src/style.css is the config) and hooks in
  // as a Vite plugin — same plugin as the pre-Astro setup, just
  // registered through Astro's vite passthrough.
  vite: {
    plugins: [tailwindcss()],
  },
});
