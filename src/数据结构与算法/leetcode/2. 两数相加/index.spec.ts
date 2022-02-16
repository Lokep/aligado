import addTwoNumbers from './index';

describe('1. 两数之和', () => {
  it('输入l1 = [2,4,3], l2 = [5,6,4], 输出[7,0,8]', () => {
    // expect(addTwoNumbers([2, 4, 3], [5, 6, 4])).toEqual([7, 0, 8]);
  });

  it('输入l1 = [0], l2 = [0], 输出[0]', () => {
    // expect(addTwoNumbers([0], [0])).toEqual([0]);
  });

  it('输入l1 = [9,9,9,9,9,9,9],  l2 = [9,9,9,9], 输出[0,1]', () => {
    // expect(addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
  });
});
