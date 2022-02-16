class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

var addTwoNumbers = function (l1, l2) {
  // 虚拟头结点（构建新链表时的常用技巧）
  let dummy = new ListNode(-1);
  // 指针 p 负责构建新链表
  let p = dummy;
  // 记录进位
  let carry = 0;
  // 开始执行加法，两条链表走完且没有进位时才能结束循环
  while (l1 != null || l2 != null || carry > 0) {
    // 先加上上次的进位
    let val = carry;
    if (l1 != null) {
      val += l1.val;
      l1 = l1.next;
    }
    if (l2 != null) {
      val += l2.val;
      l2 = l2.next;
    }
    // 处理进位情况
    carry = Math.floor(val / 10);
    val = val % 10;
    // 构建新节点
    p.next = new ListNode(val);
    p = p.next;
  }

  console.log(dummy);
  // 返回结果链表的头结点（去除虚拟头结点）
  return dummy.next;
};

console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));
console.log(addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]));
