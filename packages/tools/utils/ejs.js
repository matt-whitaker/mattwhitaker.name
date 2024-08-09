import moment from "moment";
import { DELIMITER_REGEX } from "./constants.js";

export const ejsHelpers = ({ dev = false, strings = {}, features = {}, cacheKey }) => ({
  lookup: (key, fallback = key) => strings[key] ? strings[key] : fallback,
  template: (string, data) => string.replace(DELIMITER_REGEX, (match, key) => data[key] || match),
  hide: (real, fake) => dev ? real : fake,
  feature: (feature) => !!(features)[feature],
  cachebust: (filename) => `${filename}?_cb=${cacheKey}`,
  minified: (filename) => `${filename.split(".")[0]}${dev ? "." : ".min."}${filename.split(".")[1]}`,
  date: (date) => moment(date).format('dddd, MMMM Do, YYYY'),
  markdown: () => {}
});

/**
 * Helper to read annotations from EJS
 * @param {string} data
 * @returns {{}}
 */
export const extractEjsAnnotations = (data) => {
  const annotationEjsRegEx = new RegExp(/<%#\s*(\S+)\s+(.*?)\s*%>/g);

  let ann, obj = {};
  while((ann = annotationEjsRegEx.exec(data)) !== null) {
    const [, key, value] = ann;
    obj[key] = value;
  }
  return obj;
}

export { render as renderEjs } from "ejs";