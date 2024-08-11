#!/usr/bin/env node

import { copyFiles } from "@mattwhitaker.name/core";

await(async () => await copyFiles(process.argv, () => ({ root: process.cwd() })))();