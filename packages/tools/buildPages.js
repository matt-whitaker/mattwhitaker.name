import crypto from "crypto";
import fs from "fs-extra";
import { join, basename, extname } from "path";
import { loadFiles, readFile, resolveOutputPath, resolvePath, tryReadFile, writeFile } from "./utils/file.js";
import { EXT_EJS, EXT_MD } from "./utils/constants.js";
import { parseArgs } from "./utils/cli.js";
import puppeteer from "puppeteer";
import { mapStrings } from "./utils/lang.js";
import { extractAnnotations, render } from "./utils/template.js";

/**
 * @typedef {object} BuildPagesOptions
 * @property {(EXT_EJS,EXT_MD)[]} ext list of file extensions to use; loads all files if omitted or empty
 * @property {string} root project root (cwd)
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
      "description": "root directory where page are stored",
      "defaultValue": "template/page"
    },
    {
      "name": "lang",
      "description": "lang file",
      "defaultValue": "lang.txt"
    }
  ]);
  const options = optionsFn(args);

  const [{ site, features }, files, master, strings] = await Promise.all([
    readFile(resolvePath(args.config), JSON.parse),
    loadFiles(args.pages, options.ext),
    readFile(resolvePath(options.template)),
    tryReadFile(resolvePath(args.lang), mapStrings, {}),
  ]);

  await Promise.all(
    files.map(async ({ name, data }) => {
      const page = extractAnnotations(extname(name).slice(1), data, strings);

      Object.assign(page, {
        title: page.title || basename(name, extname(name)),
        filename: name
      });

      const rendered = await render(
        extname(options.template).slice(1),
        master,
        { page, site, stylesheets: options.stylesheets },
        { dev: args.dev, root: options.root, strings, features, cacheKey });

      return writeFile(resolveOutputPath(resolvePath(options.root, args.output), name), rendered);
    }));
}