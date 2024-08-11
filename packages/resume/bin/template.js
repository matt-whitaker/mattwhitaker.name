#!/usr/bin/env node

import { generateSite } from "@mattwhitaker.name/core";

await (
  async () =>
    await generateSite(process.argv, () => ({
      ext: [".ejs"],
      stylesheets: [
        "/style/resume.css"
      ],
      template: "template/master.ejs",
      root: process.cwd()
    }))
)();