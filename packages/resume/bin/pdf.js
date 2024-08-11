#!/usr/bin/env node

import { generatePdf } from "@mattwhitaker.name/core";

await (async () => await generatePdf(process.argv, () => ({})))();
