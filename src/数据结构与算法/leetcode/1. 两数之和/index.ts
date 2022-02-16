/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export default function (nums: number[], target: number): number[] | false {
  for (let m = 0; m < nums.length; m++) {
    for (let n = 0; n < nums.length; n++) {
      if (m !== n && nums[m] + nums[n] === target) {
        return [m, n];
      }
    }
  }
  return false;
}
