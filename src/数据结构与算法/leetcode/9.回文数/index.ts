/**
 * @param {number} x
 * @return {boolean}
 */

export default function isPalindrome(x: number): boolean {
  if (x < 0) return false;

  if (x < 10) return true;

  return Number(String(x).split('').reverse().join('')) === x;
}
