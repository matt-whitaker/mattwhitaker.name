/**
 * Creates a function that is continually debounced to the next animation frame
 *
 * @param {Function} fn The function to debounceAnimation
 * @returns {Function} wrapped function
 */
export default function debounceAnimation(fn) {
  let frame;

  return (...params) => {
    if (frame) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};
