import { clsx } from 'clsx';

/**
 * Combines class names cleanly
 */
export function cn(...inputs) {
  if (typeof clsx === 'function') {
    return clsx(inputs);
  }
  return inputs.flat(Infinity).filter(Boolean).join(' ');
}

export default cn;
