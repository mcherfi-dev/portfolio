const REDUCED = '(prefers-reduced-motion: reduce)';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export const prefersReducedMotion = () => window.matchMedia(REDUCED).matches;

export const hasFinePointer = () => window.matchMedia(FINE_POINTER).matches;

export function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}
