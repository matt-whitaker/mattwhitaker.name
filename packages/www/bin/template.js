#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, (args) => ({
      ext: [".ejs"],
      stylesheets: args.dev ? [
        "style/normalize.css",
        "style/main.css",
      ] : [
        "style/normalize.css",
        "style/main.min.css",
      ],
      template: "template/master.ejs",
      root: process.cwd()
    }))
)();