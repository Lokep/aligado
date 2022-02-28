/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
export default function strStr(haystack: String, needle: String): Number {
  if (!needle) {
    return 0;
  }

  if (!haystack) {
    return -1;
  }

  if (needle.length > haystack.length) {
    return -1;
  }

  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    const str = haystack.slice(i, i + needle.length);

    if (str === needle) {
      return i;
    }
  }

  return -1;
}
