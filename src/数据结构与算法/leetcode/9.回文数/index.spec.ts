import isPalindrome from './index';

describe('9. 回文数', () => {
  it('输入：x = 121, target = 9, 输出：true', () => {
    expect(isPalindrome(121)).toBe(true);
  });

  it('输入：x = -121,  输出：false', () => {
    expect(isPalindrome(-121)).toBe(false);
  });

  it('输入：x = 10,  输出：false', () => {
    expect(isPalindrome(10)).toEqual(false);
  });
});
