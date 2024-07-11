#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, () => ({
      ext: [".ejs"],
      stylesheets: [
        "style/normalize.css",
        "style/resume.css",
      ],
      template: "template/master.ejs",
      root: process.cwd(),
      helpers: {
        rating: (rating) => [...Array(rating).keys()].map(() => "&#x25A0;").join(" ")
      }
    }))
)();