/**
 * objToEnv
 *
 * Recurses an object, building environment variables (defined as leaves in the tree) based on the JSON path
 *
 * @param {object} obj current pointer
 * @param {string} scope currently build prefix
 * @returns {object} The original object, but frozen
 */
module.exports = function objToEnv(obj, scope = '') {
  return Object.keys(obj).reduce((memo, key) => {
    // Do not follow prototype chain
    if (obj.hasOwnProperty(key)) {
      // If "value"
      if (typeof obj[key] !== 'function' && typeof obj[key] !== 'object') {
        if (scope) {
          return { ...memo, [`${scope.replace('.', '_').toUpperCase()}_${key.toUpperCase()}`]: obj[key] };
        } else {
          return { ...memo, [`${key.toUpperCase()}`]: obj[key] };
        }
      // Else "object"
      } else {
        if (scope) {
          return { ...memo, ...objToEnv(obj[key], `${scope.replace('.', '_').toUpperCase()}_${key.toUpperCase()}`) };
        } else {
          return { ...memo, ...objToEnv(obj[key], key.toUpperCase()) };
        }
      }
    } else {
      return memo;
    }
  }, {});
};
