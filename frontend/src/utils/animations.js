import { animate } from 'animejs';

/**
 * Checks if the user prefers reduced motion
 */
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Animates a numeric counter smoothly using Anime.js
 * @param {HTMLElement} element - Target DOM element displaying the number
 * @param {number} endValue - Target number
 * @param {number} duration - Animation duration in ms
 * @param {string} prefix - Optional prefix e.g. "$"
 * @param {string} suffix - Optional suffix e.g. "%" or "+"
 */
export const animateCounter = (element, endValue, duration = 1200, prefix = '', suffix = '') => {
  if (!element) return;
  if (isReducedMotion()) {
    element.textContent = `${prefix}${endValue}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  animate(obj, {
    val: endValue,
    duration,
    ease: 'outExpo',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
    },
  });
};

/**
 * Staggers in a list of child elements with a subtle translateY and opacity
 * @param {string|HTMLElement[]|NodeList} targets - Selector or elements
 * @param {number} delayStagger - Delay between each element in ms
 * @param {number} duration - Animation duration in ms
 */
export const fadeInStagger = (targets, delayStagger = 60, duration = 500) => {
  if (!targets || isReducedMotion()) return;

  animate(targets, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration,
    delay: (el, i) => i * delayStagger,
    ease: 'outQuad',
  });
};

/**
 * Hero section entrance animation for Landing page
 * @param {string|HTMLElement} target - Container or elements
 */
export const heroEntrance = (target) => {
  if (!target || isReducedMotion()) return;

  animate(target, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 800,
    ease: 'outCubic',
  });
};

/**
 * Modal dialog pop-in animation
 * @param {HTMLElement} element - Modal content container
 */
export const modalEntrance = (element) => {
  if (!element || isReducedMotion()) return;

  animate(element, {
    opacity: [0, 1],
    scale: [0.96, 1],
    translateY: [12, 0],
    duration: 250,
    ease: 'outBack(1.4)',
  });
};
