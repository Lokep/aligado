/**
 * @param {string[]} strs
 * @return {string}
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs: string[]): string {
  if (strs.length == 0) return '';

  let result = strs[0];

  for (let i = 1; i < strs.length; i++) {
    let j = 0;

    for (; j < result.length && j < strs[i].length; j++) {
      if (result[j] != strs[i][j]) break;
    }

    result = result.substr(0, j);

    if (result === '') return result;
  }
  return result;
};

export default longestCommonPrefix;
