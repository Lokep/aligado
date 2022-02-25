import isValid from './index';

describe('20. 有效的括号', () => {
  it('输入：s = "()", 输出：true', () => {
    expect(isValid('()')).toBeTruthy();
  });

  it('输入：s = "()[]{}", 输出：true', () => {
    expect(isValid('()[]{}')).toBeTruthy();
  });

  it('输入：s = "(]",  输出: false', () => {
    expect(isValid('(]')).toBeFalsy();
  });

  it('输入：s = "([)]" ,  输出: false', () => {
    expect(isValid('([)]')).toBeFalsy();
  });

  it('输入：s = "{[]}", 输出：true', () => {
    expect(isValid('{[]}')).toBeTruthy();
  });

  it('输入：s = "(([]){})", true', () => {
    expect(isValid('(([]){})')).toBeTruthy();
  });
});
