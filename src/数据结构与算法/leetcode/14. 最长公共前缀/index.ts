/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs: string[]): string {
  if (strs.length === 0) return '';

  if (strs.length === 1) return strs[0];

  let result = strs[0];

  for (let i = 1; i < strs.length; i++) {
    let str = strs[i];
    let j = 0;
    while (j < result.length && j < str.length) {
      if (result[j] !== str[j]) {
        result = result.slice(0, j);
        break;
      }
      j++;
    }
    if (j === 0) return '';
  }
  return result;
};

export default longestCommonPrefix;
