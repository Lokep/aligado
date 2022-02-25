---
order: 1
title: JavaScript基础
---

# JavaScript 基础

## 类型判断、类型检测，分别说出下列方法的区别？

> typeof, instanceof, constructor, Object.prototype.toString.call()  
> 数组还有一个 Array.isArray, 其中 Object.prototype.toString.call 最为严谨

instanceof 简单用法

```javascript
function Fn() {}
const fn = new Fn();
fn instanceof Fn; // true
```

```javascript
// left instanceof right
function _instanceof(left, right) {
  // 构造函数原型
  const prototype = right.prototype;
  // 实列对象属性，指向其构造函数原型
  left = left.__proto__;
  // 查实原型链
  while (true) {
    // 如果为null，说明原型链已经查找到最顶层了，真接返回false
    if (left === null) {
      return false;
    }
    // 查找到原型
    if (prototype === left) {
      return true;
    }
    // 继续向上查找
    left = left.__proto__;
  }
}

const str = 'abc';
_instanceof(str, String); // true
```

## 构造函数在实例化的过程做了哪些事，能否手写实现？

<Badge>手写</Badge>

## call, apply 的作用，能否手写实现？

<Badge>手写</Badge>

## Set、Map、WeakSet、WeakMap 的区别和使用场景？

## 模块化

> commonjs requirejs seajs esm cjs

import 和 require 导入的区别?

## 深浅拷贝

<Badge>手写</Badge>

> 递归遍历对象，解决循环引用问题

## 函数柯里化

<Badge>手写</Badge>

柯里化(Currying) 是把接收多个参数的原函数变换成接受一个单一参数（原来函数的第一个参数的函数)并返回一个新的函数，新的函数能够接受余下的参数，并返回和原函数相同的结果。

1. 参数对复用
2. 提高实用性
3. 延迟执行 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。柯里化的函数可以延迟接收参数，就是比如一个函数需要接收的参数是两个，执行的时候必须接收两个参数，否则没法执行。但是柯里化后的函数，可以先接收一个参数

## Event Loop 事件循环

> 应围绕宏任务、微任务，同步异步回答

同步任务  
指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

异步任务  
不进入主线程、而进入任务队列（task queue）的任务，只有等主线程任务执行完毕，任务队列开始通知主线程，请求执行任务，该任务才会进入主线程执行。

当某个宏任务执行完后, 会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务；如果没有，在执行环境栈中会读取宏任务队列中排在最前的任务；执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。

## Promise

<Badge>手写</Badge>

async/await 是基于 Promise 实现的，看起来更像同步代码，

不需要写匿名函数处理 Promise 的 resolve 值错误处理：　 Async/Await 让 try/catch 可以同时处理同步和异步错误。条件语句也跟错误处理一样简洁一点中间值处理（第一个方法返回值，用作第二个方法参数） 解决嵌套问题调试方便

## 箭头函数

### 什么时候不应该用箭头函数？

1. 当想要函数被提升时(箭头函数是匿名的)
2. 要在函数中使用 this/arguments 时，由于箭头函数本身不具有 this/arguments，因此它们取决于外部上下文
3. 使用命名函数(箭头函数是匿名的)
4. 使用函数作为构造函数时(箭头函数没有构造函数)
5. 当想在对象字面是以将函数作为属性添加并在其中使用对象时，因为咱们无法访问 this 即对象本身。

## 实现发布订阅

<Badge>手写</Badge>

```javascript
/* Pubsub */
function Pubsub() {
  //存放事件和对应的处理方法
  this.handles = {};
}

Pubsub.prototype = {
  //传入事件类型type和事件处理handle
  on: function (type, handle) {
    if (!this.handles[type]) {
      this.handles[type] = [];
    }
    this.handles[type].push(handle);
  },
  emit: function () {
    //通过传入参数获取事件类型
    //将arguments转为真数组
    var type = Array.prototype.shift.call(arguments);
    if (!this.handles[type]) {
      return false;
    }
    for (var i = 0; i < this.handles[type].length; i++) {
      var handle = this.handles[type][i];
      //执行事件
      handle.apply(this, arguments);
    }
  },
  off: function (type, handle) {
    handles = this.handles[type];
    if (handles) {
      if (!handle) {
        handles.length = 0; //清空数组
      } else {
        for (var i = 0; i < handles.length; i++) {
          var _handle = handles[i];
          if (_handle === handle) {
            //从数组中删除
            handles.splice(i, 1);
          }
        }
      }
    }
  },
};
```

## promise 怎么实现链式调用跟返回不同的状态

```javascript
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    executor(this.resolve, this.reject);
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  };

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  };

  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    }
  }
}
```

## 实现 Promise.all

```javascript
function all(promises) {
  let len = promises.length,
    res = [];
  if (len) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < len; i++) {
        let promise = promises[i];
        promise.then(
          (response) => {
            res[i] = response;

            // 当返回结果为最后一个时
            if (res.length === len) {
              resolve(res);
            }
          },
          (error) => {
            reject(error);
          },
        );
      }
    });
  }
}
```

# Typescript

## interface 和 type 的区别

- interface 只能定义对象类型。type 声明可以声明任何类型。
- interface 能够声明合并，两个相同接口会合并。Type 声明合并会报错
- type 可以类型推导
