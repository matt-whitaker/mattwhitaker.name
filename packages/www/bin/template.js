#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, {
      name: "main",
      ext: [".ejs"],
      stylesheets: [
        "style/normalize.css",
        "style/main.css",
      ],
      template: "template/master.ejs",
      root: process.cwd()
    })
)();