import romanToInt from './index';

describe('9. 回文数', () => {
  it('输入: s = "III", 输出: 3', () => {
    expect(romanToInt('III')).toBe(3);
  });

  it('输入: s = "IV",  输出: 4', () => {
    expect(romanToInt('IV')).toBe(4);
  });

  it('输入: s = "IX",  输出: 9', () => {
    expect(romanToInt('IX')).toEqual(9);
  });
});
