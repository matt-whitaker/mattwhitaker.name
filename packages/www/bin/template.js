#!/usr/bin/env node

import { generateSite } from "@mattwhitaker.name/core";

await (
  async () =>
    await generateSite(process.argv, (args) => ({
      ext: [".ejs"],
      stylesheets: [
        "style/main.css"
      ],
      template: "template/master.ejs",
      root: process.cwd()
    }))
)();