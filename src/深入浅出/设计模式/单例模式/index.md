# 单例模式

## 什么是单例模式

> 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的 window 对象等。在 JavaScript 开发中，单例模式的用途同样非常广泛。

试想一下，当我们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。

## 实现一个单例模式

```javascript
const loading = function (transition = 1000) {
  this.transition = transition;
  this.show = true;
  this.instance = null;
};

loading.prototype.hide = function () {
  this.show = false;
};

loading.getInstance = function () {
  if (!this.instance) {
    this.instance = new loading();
  }
  return this.instance;
};

const a = loading.getInstance('2000');
const b = loading.getInstance('3000');

console.log(a === b); // true
```

## 透明的单例模式

但是上面的 loading 方法有一个弊端，就是缺乏透明性。loading 类的使用者必须知道这是一个单例类，跟以往通过 new loading 的方式来获取对象不同，这里则需要使用 loading.getInstance 来获取对象。

所以我们来写一个透明的单例模式：

## 安全的单例模式

## 惰性的单例模式
