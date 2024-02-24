import { basename, extname } from "path";
import { extractEjsAnnotations, renderEjs } from "./ejs.js";
import { loadFiles, readFile, resolveOutputPath, resolvePath, writeFile } from "./file.js";
import { parseArgs } from "./cli.js";
import { EXT_EJS, ENGINE_EJS, EXT_MD, ENGINE_MD } from "./constants.js";

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
 * @param options.ext {(EXT_EJS,EXT_MD)[]} list of file extensions to use; loads all files if omitted or empty
 * @param options.root {string} project root (cwd)
 * @returns {Promise<void[]>}
 */
export const buildSite = async (argv, options) => {
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

      // still need a title at a minimum
      page.title = page.title || basename(name, extname(name));

      const ctx = {
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