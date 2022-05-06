114. 浏览器出于安全考虑有？（同源策略）

115. var 的变量提升底层原理是什么？
116. event loop 讲讲
117. JS 的回收机制说一下
118. cookie，session，localStorage 和 sessionStorage 的区别

119. token，浏览器缓存

120. 输入 URL 浏览器是如何工作的

121. 浏览器如何渲染页面的

122. webkit 内核渲染页面过程

123. 表单提交和 ajax 的区别

124. 页面输入 url 之后发生了什么

- [ ] [面试官问：从页面 A 打开一个新页面 B，B 页面关闭后，如何通知 A 页面？](https://mp.weixin.qq.com/s/VfZuyFDDkxHWADl443KFKw)

## 浏览器缓存策略

强缓存：cache-control；no-cache max-age=<10000000>；expires；其中 Cache-Conctrol 的优先级比 Expires 高；

控制强制缓存的字段分别是 Expires 和 Cache-Control，如果客户端的时间小于 Expires 的值时，直接使用缓存结果。

协商缓存：Last-Modified / If-Modified-Since 和 Etag / If-None-Match，其中 Etag / If-None-Match 的优先级比 Last-Modified / 首次请求，服务器会在返回的响应头中加上 Last-Modified 字段，表示资源最后修改的时间。

浏览器再次请求时，请求头中会带上 If-Modified-Since 字段，比较两个字段，一样则证明资源未修改，返回 304，否则重新返回资源，状态码为 200；

## 垃圾回收机制

标记清除：进入执行环境的变量都被标记，然后执行完，清除这些标记跟变量。查看变量是否被引用。

引用计数：会记录每个值被引用的次数，当引用次数变成 0 后，就会被释放掉。

## app 与 H5 如何通讯交互的？

```javascript
// 兼容IOS和安卓
callMobile(parameters,messageHandlerName) {
  //handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // alert('ios')
    window.webkit.messageHandlers[messageHandlerName].postMessage(JSON.stringify(parameters))
  } else {
    // alert('安卓')
    //安卓传输不了js json对象，只能传输string
    window.webkit[messageHandlerName](JSON.stringify(parameters))
  }
}
```

由 app 将原生方法注入到 window 上供 js 调用

messageHandlerName 约定的通信方法 parameters 需要传入的参数

极客时间李兵老师的浏览器专栏
