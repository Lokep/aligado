# 监控埋点

- [ ] [初识 Sentry 前端监控](https://mp.weixin.qq.com/s/nhrjLW-3ac49u_H2FAWugA)

# 前端监控

前端监控通常包括行为监控(PV/UV, 埋点接口统计)、异常监控、性能监控。

一个监控系统，大致可以分为四个阶段：日志采集、日志存储、统计与分析、报告和警告。

## 错误监控

Vue 专门的错误警告的方法 Vue.config.errorHandler, （Vue 提供只能捕获其页面生命周期内的函数，比如 created, mounted）

```javascript
Vue.config.errorHandler = function(err) {
  console.error(‘Vue.error’, err.stack)
  // 逻辑处理
};
```

框架：betterjs，fundebug（收费） 捕获错误的脚本要放置在最前面，确保可以收集到错误信息 方法：

window.onerror()当有 js 运行时错误触发时,onerror 可以接受多个参数(message, source, lineno, colno, error)。 window.addEventListener('error'), function(e) {}, true 会比 window.onerror 先触发,不能阻止默认事件处理函数的执行，但可以全局捕获资源加载异常的错误前端 JS 错误捕获--sourceMap

## 如何监控网页崩溃？**崩溃和卡顿有何差别？**监控错误

Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 一般情况下不会崩溃；

Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；

卡顿：加载中，渲染遇到阻塞
