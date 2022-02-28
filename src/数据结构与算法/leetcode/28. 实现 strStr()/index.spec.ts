import strStr from './index';

describe('28. 实现 strStr()', () => {
  it('输入：haystack = "hello", needle = "ll", 输出：2', () => {
    expect(strStr('hello', 'll')).toBe(2);
  });

  it('输入：haystack = "aaaaa", needle = "bba", 输出：-1', () => {
    expect(strStr('aaaaa', 'bba')).toBe(-1);
  });

  it('输入：haystack = "", needle = "", 输出：0', () => {
    expect(strStr('', '')).toBe(0);
  });
});
