#!/usr/bin/env node

import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { generateSite } from "@mattwhitaker.name/core";

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
        md: ((marked) => (md) => marked.parse(md))(
          new Marked(markedHighlight({
            highlight(str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(str, { language: lang }).value;
                } catch (_) {}
              }

              return false;
            }
          }))
        )
      }
    }))
)();