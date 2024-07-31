#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, (args) => ({
      ext: [".ejs"],
      stylesheets: args.dev ? [
        "/style/resume.css",
      ] : [
        "/style/resume.min.css",
      ],
      template: "template/master.ejs",
      root: process.cwd(),
      prettyUrls: true
    }))
)();