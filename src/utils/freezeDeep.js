/**
 * Deeply freezes an object, recursing through nested objects.
 * @param {Object} obj
 */
export default function freezeDeep(obj) {
  Object.freeze(obj);

  for (const key in obj) {
    // Do not follow prototype chain
    if (obj.hasOwnProperty(key)) {
      // Freeze the value if an object
      if (typeof obj[key] === 'object' || typeof obj[key] === 'function') {
        freezeDeep(obj[key]);
      }
    }
  }
}
