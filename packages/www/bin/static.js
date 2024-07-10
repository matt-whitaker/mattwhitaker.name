#!/usr/bin/env node

import { copyFiles } from "@mattwhitaker.name/tools";

await(
  async () =>
    await copyFiles(process.argv, () => ({
      root: process.cwd(),
    }))
)();