#!/usr/bin/env node

import { generatePdf } from "@mattwhitaker.name/tools";

await (
  async () => {
    await generatePdf(process.argv, {});
  }
)();
