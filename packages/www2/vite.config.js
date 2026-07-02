import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';

import { projects } from './src/data/projects.js';
import site from './site.config.js';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: { projects, site },
        // ejs needs `filename` to resolve the partials' relative includes.
        ejsOptions: { filename: rootDir + 'index.html' },
      },
    }),
  ],
});
