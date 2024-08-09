#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, (args) => ({
      ext: [".ejs"],
      stylesheets: [
        "style/main.css"
      ],
      template: "template/master.ejs",
      root: process.cwd()
    }))
)();