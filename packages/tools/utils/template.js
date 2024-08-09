import pretty from "pretty";
import { ENGINE_EJS, ENGINE_MD } from "./constants.js";
import { ejsHelpers, extractEjsAnnotations, renderEjs } from "./ejs.js";

/**
 * Render a template
 * @async
 * @param {string} template The template to render
 * @param {object} context The context data to pass in
 * @param {object} options
 * @param {string} options.root root directory
 * @param {object} options.strings map of strings
 * @param {object} options.features map of features
 * @returns {string} a rendered template
 */
export const render = async (template, context, options = {}) => {
  const rendered = await renderEjs(template, { ...context, ...ejsHelpers(options) }, { async: true, root: options.root });
  return rendered ? pretty(rendered, { ocd: true }) : rendered;
}

/**
 *
 * @param {string} data file data
 * @param {function} builder optional data builder method
 * @returns {{}}
 */
export const getPageData = (data, builder) => {
  const annotations = extractEjsAnnotations(data);
  return builder ? { ...annotations, ...builder(annotations) } : annotations;
}