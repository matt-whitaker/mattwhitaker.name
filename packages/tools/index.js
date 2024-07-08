import fs from "fs-extra";
import { join, basename, extname } from "path";
import { loadFiles, readFile, resolveOutputPath, resolvePath, tryReadFile, writeFile } from "./file.js";
import { EXT_EJS, EXT_MD } from "./constants.js";
import { parseArgs } from "./cli.js";
import puppeteer from "puppeteer";
import { mapStrings } from "./lang.js";
import { extractAnnotations, render } from "./template.js";

/**
 * Generates the HTML of the static site. Supports EJS and Markdown files
 * @async
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param options {object}
 * @param options.ext {(EXT_EJS,EXT_MD)[]} list of file extensions to use; loads all files if omitted or empty
 * @param options.exclude {string[]} list of filenames to exclude
 * @param options.root {string} project root (cwd)
 * @param options.helpers {object} helpers for ejs
 * @returns {Promise<void[]>}
 */
export const buildPages = async (argv, options) => {
  const args = parseArgs(argv, [
    {
      "name": "pages",
      "description": "root directory where page are stored",
      "defaultValue": "template/page"
    },
    {
      "name": "template",
      "description": "site wide main template",
      "defaultValue": "template/master.ejs"
    },
    {
      "name": "stylesheet",
      "description": "expected stylesheet file",
      "defaultValue": "style.css"
    },
    {
      "name": "lang",
      "description": "lang file",
      "defaultValue": "lang.txt"
    }
  ]);

  const [{ site, features }, files, master, strings] = await Promise.all([
    readFile(resolvePath(args.config), JSON.parse),
    // TODO: recursive: false changes the path resolution behavior significantly. Need to solve before this can be changed.
    loadFiles(args.pages, options.ext),
    readFile(resolvePath(args.template)),
    tryReadFile(resolvePath(args.lang), mapStrings, {}),
  ]);

  await Promise.all(
    files
      .filter(({ name }) => args.all || !(options.exclude && options.exclude.includes(name)))
      .map(async ({ name, data }) => {

        const page = extractAnnotations(extname(name).slice(1), data, strings);

        Object.assign(page, {
          title: page.title || basename(name, extname(name)),
          filename: name
        });

        const ctx = { page, site, stylesheet: args.stylesheet };
        const rendered = await render(extname(args.template).slice(1), master, ctx, { dev: args.dev, root: options.root, strings, features });
        return writeFile(resolveOutputPath(resolvePath(options.root, args.output), name), rendered);
      }));
}

/**
 * Produces a PDF of the chosen page; loads via puppet
 * @async
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param options {object}
 * @returns {Promise<void>}
 */
export const generatePdf = async (argv, options) => {
  try {
    const args = parseArgs(argv, [
      {
        "name": "page",
        "description": "specific page for static generation",
        "defaultValue": "resume.html"
      },
      {
        "name": "output",
        "description": "distribution directory",
        "defaultValue": "dist/pdf"
      }
    ]);

    const $browser = await puppeteer.launch();
    const $page = await $browser.newPage();

    await $page.setViewport({
      width: 8.5 * 96,
      height: 11 * 96,
    });

    await $page.goto(`http://localhost:8080/${args.page}`, { waitUntil: "networkidle0" });
    await $page.pdf({
      path: `${args.output}/${args.page.split(".")[0]}.pdf`,
      format: "Letter",
      printBackground: true
    });

    await $browser.close();
  } catch (error) {
    console.error(`Error! ${error}`);
  }
}

/**
 * Copy files over (cross-os safe)
 * @async
 * @param argv
 * @param options
 * @param options.root {string} project root (cwd)
 * @returns {Promise<void>}
 */
export const copyFiles = async (argv, options) => {
  const args = parseArgs(argv, [
    {
      "name": "source",
      "description": "specific page for static generation",
      "defaultValue": "static"
    },
  ]);

  try {
    await fs.copy(join(options.root, args.source), join(options.root, args.output));
  } catch (err) {
    console.error(`Error! ${err}`);
  }
}