#!/usr/bin/env node

import {
  loadFiles,
  parseArgs,
  readFile,
  renderEjs,
  resolveOutputPath,
  resolvePath,
  writeFile,
} from "@mattwhitaker.name/tools";

const OUTPUT_EXT = ".html";

await (
  async () => {
    const { t, p, c, s, o } = parseArgs(process.argv);

    const config = JSON.parse(await readFile(resolvePath(c)));
    const template = await readFile(resolvePath(t));
    const pages = await loadFiles(p, true, [".ejs"]);

    const globalContext = { ...config, stylesheet: s };

    await Promise.all(
      pages.map(async ({ path, name, content }) => {
        const context = { ...globalContext, title: name, content: await renderEjs(content, globalContext) }
        return writeFile(resolveOutputPath(path, name, o, OUTPUT_EXT), await renderEjs(template, context));
      }));
  }
)();