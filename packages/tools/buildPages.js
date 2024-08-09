import crypto from "crypto";
import { basename, extname, relative, join } from "path";
import { loadFiles, readFile, resolvePath, tryReadFile, writeFile } from "./utils/file.js";
import { EXT_EJS, EXT_MD, INDEX, INDEX_EJS, INDEX_HTML } from "./utils/constants.js";
import { parseArgs } from "./utils/cli.js";
import { mapStrings } from "./utils/lang.js";
import { getPageData, render } from "./utils/template.js";

/**
 * @typedef {object} BuildPagesOptions
 * @property {(EXT_EJS,EXT_MD)[]} ext list of file extensions to use; loads all files if omitted or empty
 * @property {string} root project root (cwd)
 * @property {object} helpers custom helper function
 * @property {object} context additional context to pass to templates
 */

/**
 * Generates the HTML of the static site. Supports EJS and Markdown files
 * @async
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param optionsFn {function(object):BuildPagesOptions}
 * @returns {Promise<void>}
 */
export const buildPages = async (argv, optionsFn) => {
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
    pages,
    template,
    strings
  ] = await Promise.all([
    readFile(resolvePath(args.config), JSON.parse),
    loadFiles(args.pages, options.ext),
    readFile(resolvePath(options.template)),
    tryReadFile(resolvePath(args.lang), mapStrings, {}),
  ]);

  await Promise.all(
    pages.map(async ({ name, data, path }) => {
      const prettyName = basename(name, extname(name));
      const outputRoot = resolvePath(options.root, args.output);
      const relativePath = relative(join(options.root, args.pages), path);

      const page = getPageData(data, ({ title }) => ({
        title: title || basename(name, extname(name)),
        filename: name,
        relativePath,
        url: `/${join(relativePath, prettyName).replace(INDEX, "")}`
      }));

      const rendered = await render(
        template,
        { pages, page, site, stylesheets: options.stylesheets, ...(options.helpers || {}), ...(options.context || {}) },
        { dev: args.dev, root: options.root, strings, features, cacheKey });

      const fullpath = prettyName === INDEX
        ? join(outputRoot, INDEX_HTML)
        : join(outputRoot, relativePath, prettyName, INDEX_HTML);

      return writeFile(fullpath, rendered);
    }));
}