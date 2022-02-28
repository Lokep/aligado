import removeElement from './index';

describe('27. 移除元素', () => {
  it('输入：nums = [3,2,2,3], val = 3, 输出：2, nums = [2,2]', () => {
    expect(removeElement([3, 2, 2, 3], 3)).toEqual(2);
  });

  it('输入：nums = [0,1,2,2,3,0,4,2], val = 2, 输出：5, nums = [0,1,4,0,3]', () => {
    expect(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)).toEqual(5);
  });
});
