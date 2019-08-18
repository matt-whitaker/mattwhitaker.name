
export default function freezeDeep(obj) {
  Object.freeze(obj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && (typeof obj[key] === "object" || typeof obj[key] === "function")) {
      freezeDeep(obj[key]);
    }
  }
}