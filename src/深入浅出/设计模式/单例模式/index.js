// 最简单的单例模式
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

console.log('[最简单的单例模式]: ', a === b);

// 透明的单例模式
const modal = (function (show = false) {
  this.show = show;
  this.instance = null;

  let modalClosure = function () {
    this.show = !this.show;
  };
})();
