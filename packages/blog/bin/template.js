#!/usr/bin/env node

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
        md: (data) => markdownit().render(data)
      }
    }))
)();