#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, {
      ext: [".ejs"],
      root: process.cwd(),
      exclude: ["cover.ejs"]
    })
)();