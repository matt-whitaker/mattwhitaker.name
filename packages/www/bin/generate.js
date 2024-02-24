#!/usr/bin/env node

import { buildSite } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildSite(process.argv, {
      ext: [".ejs"],
      root: process.cwd()
    })
)();