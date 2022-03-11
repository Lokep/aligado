---
order: 10
---

# 树-TODO

## 树数据结构

## 二叉树 二叉搜索树

**二叉树**中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点

**二叉搜索树**（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。

### 创建 BinarySearchTree 类

- insert(key)：向树中插入一个新的键。
- search(key)：在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回 false。
- inOrderTraverse()：通过中序遍历方式遍历所有节点。
- preOrderTraverse()：通过先序遍历方式遍历所有节点。
- postOrderTraverse()：通过后序遍历方式遍历所有节点。
- min()：返回树中最小的值/键。
- max()：返回树中最大的值/键。
- remove(key)：从树中移除某个键。

```javascript
import { Compare, defaultCompare } from '../util';
import { Node } from './models/node';
export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // 用来比较节点值
    this.root = null; // {1} Node 类型的根节点
  }

  insert(key) {
    if (this.root == null) {
      // {1}
      this.root = new Node(key); // {2}
    } else {
      this.insertNode(this.root, key); // {3}
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // {4}
      if (node.left == null) {
        // {5}
        node.left = new Node(key); // {6}
      } else {
        this.insertNode(node.left, key); // {7}
      }
    } else {
      if (node.right == null) {
        // {8}
        node.right = new Node(key); // {9}
      } else {
        this.insertNode(node.right, key); // {10}
      }
    }
  }
}
```

## 树的遍历

### 中序遍历

### 先序遍历

### 后序遍历

## 搜索树中的值

## 自平衡树

### AVL 树

### 红黑树
