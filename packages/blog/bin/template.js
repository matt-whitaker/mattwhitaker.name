#!/usr/bin/env node

import markdownit from "markdown-it";
import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, (args) => ({
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