import twoSum from './index';

describe('1. 两数之和', () => {
  it('输入nums = [2,7,11,15], target = 9, 输出[0,1]', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('输入nums = [3,2,4], target = 6, 输出[1,2]', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it('输入nums = [3,3], target = 6, 输出[0,1]', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });
});
