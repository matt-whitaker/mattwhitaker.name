const __cache = new Map();

/**
 * Static Cache class to manage cache creation (in-memory Map)
 */
export default class Cache {
  /**
   * Return a new Map
   *
   * @param {string|number} id Simple id for the cache
   * @returns {{set: Function, get: Function, has: Function}} the Map cache
   */
  static create(id) {
    if (!__cache.has(id)) {
      return __cache.set(id, new Map()).get(id);
    }
    return null;
  }
};
