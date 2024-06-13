
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

/**
 * Quick helper to splatter a phone number across spans.
 * @param phoneNumber
 * @returns {string}
 */
export const obfuscatePhone = (phoneNumber) =>
  phoneNumber.split("").map(char => /\d/.test(char) ? `<span>${char}</span>` : char).join("");


export { render as renderEjs } from "ejs";