---
title: 手写
toc: menu
---

# 手写系列

> 推荐阅读： [死磕 36 个 JS 手写题](https://juejin.cn/post/6946022649768181774)

## 实现 instanceof 关键词

instanceof 就是判断构造函数的 prototype 属性是否出现在实例的原型链上。

```javascript
// 需要顺着原型链往上找，一直到 __proto__ 为 null
function customInstanceOf(cls, target) {
  let p = cls.__proto__;

  while (true) {
    if (p === null) return false;

    if (p === target.prototype) return true;

    p = p.__proto__;
  }
}
```

## new

实例化的过程：

1. 创建一个空的简单 JavaScript 对象（即{}）；
2. 为步骤 1 新创建的对象添加属性**proto**，将该属性链接至构造函数的原型对象 ；
3. 将步骤 1 新创建的对象作为 this 的上下文 ；
4. 如果该函数没有返回对象，则返回 this。

```javascript
function customNew(cls, ...params) {
  const obj = {};

  obj.__proto__ = cls.protype;

  const result = cls.call(obj, ...params);

  return result instanceof Object ? result : obj;
}
```

## call, apply, bind 的区别

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

- apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。返回值：调用有指定 this 值和参数的函数的结果。

- call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。返回值：使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

- bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。返回值：返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。

## 深浅拷贝
