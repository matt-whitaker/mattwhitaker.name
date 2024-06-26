import { basename, extname } from "path";
import { extractEjsAnnotations, obfuscatePhone, renderEjs } from "./ejs.js";
import { loadFiles, readFile, resolveOutputPath, resolvePath, writeFile } from "./file.js";
import { EXT_EJS, ENGINE_EJS, EXT_MD, ENGINE_MD } from "./constants.js";
import { parseArgs } from "./cli.js";
import puppeteer from "puppeteer";

/**
 *
 * @async
 * @param {(ENGINE_EJS,ENGINE_MD)} engine Which templating engine to use
 * @param {string} template The template to render
 * @param {object} context The context data to pass in
 * @param {object} options Optional options for the engine
 * @returns {string} a rendered template
 */
const render = async (engine, template, context, options = {}) => {
  if (engine === ENGINE_EJS) {
    return renderEjs(template, context, { async: true, ...options });
  }

  return "";
}

/**
 *
 * @param {(ENGINE_EJS,ENGINE_MD)} engine Which templating engine to use
 * @param {string} data
 * @returns {{}}
 */
const extractAnnotations = (engine, data) => {
  if (engine === ENGINE_EJS) {
    return extractEjsAnnotations(data);
  }

  return {};
}

/**
 * Generates the HTML of the static site. Supports EJS and Markdown files
 * @async
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param options {object}
 * @param options.name {string} name for the build
 * @param options.ext {(EXT_EJS,EXT_MD)[]} list of file extensions to use; loads all files if omitted or empty
 * @param options.exclude {string[]} list of filenames to exclude
 * @param options.root {string} project root (cwd)
 * @param options.helpers {object} helpers for ejs
 * @returns {Promise<void[]>}
 */
export const buildPages = async (argv, options) => {
  const args = parseArgs(argv);
  const output = resolvePath(options.root, args.output);

  const [{ site }, pages, template] = await Promise.all([
    readFile(resolvePath(args.config), JSON.parse),
    loadFiles(args.pages, true, options.ext),
    readFile(resolvePath(args.template)),
  ]);

  await Promise.all(
    pages.map(async ({ name, path, data }) => {
      // extract annotated metadata from the file
      const page = extractAnnotations(extname(name).slice(1), data);

      if (!args.all && options.exclude && options.exclude.includes(name)) {
        return;
      }

      // still need a title at a minimum
      page.title = page.title || basename(name, extname(name));

      const ctx = {
        obfuscatePhone,
        page,
        site,
      };

      // render the "inner" page contents, and put it back on the context for main template rendering
      ctx.rendered = {
        content: await render(extname(name).slice(1), data, ctx, options),
        stylesheet: args.stylesheet,
      };

      // render into main template and write
      writeFile(
        resolveOutputPath(output, name),
        await render(extname(args.template).slice(1), template, ctx, options));
    }));
}

/**
 * Produces a PDF of the chosen page; loads via puppet
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param options {object}
 * @returns {Promise<void>}
 */
export const generatePdf = async (argv, options) => {
  try {
    const { filename } = parseArgs(argv);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 8.5 * 96,
      height: 11 * 96,
    });

    await page.goto(`http://localhost:8080/${filename}`, { waitUntil: "networkidle0" });
    await page.pdf({
      path: `dist/${filename.split(".")[0]}.pdf`,
      format: "Letter",
      printBackground: true
    });

    await browser.close();
  } catch (error) {
    console.error(`Error! ${error}`);
  }
}

export { parseArgs } from "./cli.js";