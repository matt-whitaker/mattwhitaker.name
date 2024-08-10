#!/usr/bin/env node

import hljs from "highlight.js";
import markdownit from "markdown-it";
import { generateSite } from "@mattwhitaker.name/tools";

await (
  async () =>
    await generateSite(process.argv, (args) => ({
      feed: true,
      ext: [".ejs"],
      stylesheets: [
        "/style/blog.css"
      ],
      template: "template/master.ejs",
      root: process.cwd(),
      helpers: {
        md: (data) => markdownit({
          highlight(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }

            return '';
          }
        }).render(data)
      }
    }))
)();