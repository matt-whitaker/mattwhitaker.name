import pretty from "pretty";
import { ejsHelpers, extractEjsAnnotations, renderEjs } from "./ejs.js";
import { basename, extname, join, relative } from "path";
import { resolvePath, writeFile } from "./file.js";
import { EXT_HTML, INDEX, INDEX_HTML, PRETTY_BAN } from "./constants.js";

/**
 * Render a template
 * @async
 * @param {string} template The template to render
 * @param {object} context The context data to pass in
 * @param {object} options
 * @returns {string} a rendered template
 */
export const render = async (template, context, options = {}) => {
  const rendered = await renderEjs(template, { ...context, ...ejsHelpers(options) }, { async: true, root: options.root });
  return rendered ? pretty(rendered, { ocd: true }) : rendered;
}

export const generatePages = (files, args, options) => {
  return files.map((file) => {
    const raw = file.data
    const slug = basename(file.name, extname(file.name));
    const resource = relative(join(options.root, args.pages), file.path);
    const url = `/${join(resource, slug).replace(INDEX, "")}`;
    const template = `/${relative(options.root, join(file.path, file.name))}`;
    const outputRoot = resolvePath(options.root, args.output);
    const output = (() => {
      if (PRETTY_BAN.includes(`${slug}${EXT_HTML}`)) {
        return join(outputRoot, resource, `${slug}${EXT_HTML}`);
      }
      else if (slug === INDEX) return join(outputRoot, resource, INDEX_HTML);
      else return join(outputRoot, resource, slug, INDEX_HTML);
    })();
    const extracted = extractEjsAnnotations(raw);

    return {
      ...extracted,
      slug,
      resource,
      url,
      template,
      output,
      raw
    };
  });
}
