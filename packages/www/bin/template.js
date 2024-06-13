#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, {
      name: "main",
      ext: [".ejs"],
      root: process.cwd()
    })
)();