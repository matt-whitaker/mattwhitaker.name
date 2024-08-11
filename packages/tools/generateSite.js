import crypto from "crypto";
import { loadFiles, readFile, resolvePath, tryReadFile, writeFile } from "./utils/file.js";
import { EXT_EJS, EXT_MD } from "./utils/constants.js";
import { parseArgs } from "./utils/cli.js";
import { mapStrings } from "./utils/lang.js";
import { generatePages, render } from "./utils/template.js";
import { generateFeed } from "./utils/rss.js";

/**
 * @typedef {object} BuildPagesOptions
 * @property {(EXT_EJS,EXT_MD)[]} ext list of file extensions to use; loads all files if omitted or empty
 * @property {string} root project root (cwd)
 * @property {object} helpers custom helper function
 * @property {object} context additional context to pass to templates
 */

/**
 * Generates the HTML of the static site. Supports EJS
 * @async
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param optionsFn {function(object):BuildPagesOptions}
 * @returns {Promise<void>}
 */
export const generateSite = async (argv, optionsFn) => {
  const cacheKey = crypto.createHash('md5').update(Date.now().toString()).digest('hex');

  const args = parseArgs(argv, [
    {
      "name": "pages",
      "description": "root directory where pages are stored",
      "defaultValue": "template/page"
    },
    {
      "name": "lang",
      "description": "lang file",
      "defaultValue": "lang.txt"
    }
  ]);

  const options = optionsFn(args);

  const [
    { site, features },
    files,
    template,
    strings
  ] = await Promise.all([
    readFile(resolvePath(args.config), JSON.parse),
    loadFiles(args.pages, options.ext),
    readFile(resolvePath(options.template)),
    tryReadFile(resolvePath(args.lang), mapStrings, {}),
  ]);

  const pages = await Promise.all(
    generatePages(files, args, options)
    .map(async (page,_ , pages) => {
      const rendered = await render(
        template,
        { pages, page, site, stylesheets: options.stylesheets, ...(options.helpers || {}), ...(options.context || {}) },
        { dev: args.dev, root: options.root, strings, features, cacheKey });

      await writeFile(page.output, rendered);

      return { ...page, rendered };
    }));

  if (options.feed) {
    const { rss, atom } = await generateFeed(site, pages, args, options);
    await Promise.all([
      writeFile(rss.output, rss.content),
      writeFile(atom.output, atom.content)
    ]);

  }
}