/** Lightweight shared pointers/scroll state read by the WebGL layer each frame. */
export const scrollState = {
  progress: 0, // 0..1 over full document
  heroProgress: 0, // 0..1 over hero section
  velocity: 0,
};

export const pointerState = {
  x: 0,
  y: 0,
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
