import pretty from "pretty";
import { ENGINE_EJS, ENGINE_MD } from "./constants.js";
import { ejsHelpers, extractEjsAnnotations, renderEjs } from "./ejs.js";

/**
 * Render a template
 * @async
 * @param {(ENGINE_EJS,ENGINE_MD)} engine Which templating engine to use
 * @param {string} template The template to render
 * @param {object} context The context data to pass in
 * @param {object} options
 * @param {string} options.root root directory
 * @param {object} options.strings map of strings
 * @param {object} options.features map of features
 * @returns {string} a rendered template
 */
export const render = async (engine, template, context, options = {}) => {
  let rendered = ""
  if (engine === ENGINE_EJS) {
    rendered = await renderEjs(template, { ...context, ...ejsHelpers(options) }, { async: true, root: options.root });
  }

  return rendered ? pretty(rendered, { ocd: true }) : rendered;
}

/**
 *
 * @param {(ENGINE_EJS,ENGINE_MD)} engine Which templating engine to use
 * @param {string} data
 * @returns {{}}
 */
export const extractAnnotations = (engine, data) => {
  if (engine === ENGINE_EJS) {
    return extractEjsAnnotations(data);
  }

  return {};
}