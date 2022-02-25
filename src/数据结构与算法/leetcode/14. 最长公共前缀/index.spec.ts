import longestCommonPrefix from './index';

describe('14. 最长公共前缀', () => {
  it('输入：strs = ["flower","flow","flight"], 输出："fl"', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  });

  it('输入：strs = ["dog","racecar","car"],  输出: ""', () => {
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });

  it('输入：strs = ["ab", "a"],  输出: "a"', () => {
    expect(longestCommonPrefix(['ab', 'a'])).toBe('a');
  });
});
