---
toc: menu
---

# Http 及浏览器相关

## 七层网络模型

应用层、表示层、会话层、传输层、网络层、数据链路层、物理层

**TCP** : 面向连接、传输可靠(保证数据正确性, 保证数据顺序)、用于传输大量数据(流模式)、速度慢，建立连接需要开销较多(时间，系统资源) 。（应用场景：HTP，HTTP，邮件）

**UDP**：面向非连接、传输不可靠、用于传输少量数据(数据包模式)、速度快 , 可能丢包（应用场景：即时通讯）

## https

客户端先向服务器端索要公钥，然后用公钥加密信息，服务器收到密文后，用自己的私钥解密。服务器公钥放在数字证书中。

## url 到加载渲染全过程

1. DNS 域名解析。
2. TCP 三次握手，建立接连。
3. 发送 HTTP 请求报文。
4. 服务器处理请求返回响应报文。
5. 浏览器解析渲染页面。
6. 四次挥手，断开连接。

**DNS** 协议提供通过域名查找 IP 地址，或逆向从 IP 地址反查域名的服务。DNS 是一个网络服务器，我们的域名解析简单来说就是在 DNS 上记录一条信息记录。

**TCP** 三次握手，四次挥手：握手挥手都是客户端发起，客户端结束。三次握手与四次挥手详解

**负载均衡** 请求在进入到真正的应用服务器前，可能还会先经过负责负载均衡的机器，它的作用是将请求合理地分配到多个服务器上，转发 HTTP 请求；同时具备具备防攻击等功能。可分为 DNS 负载均衡，HTTP 负载均衡，IP 负载均衡，链路层负载均衡等。

**Web Server** 请求经过前面的负载均衡后，将进入到对应服务器上的 Web Server，比如 Apache、Tomcat

**反向代理** 是工作在 HTTP 上的，一般都是 Nginx。全国各地访问 baidu.com 就肯定要通过代理访问，不可能都访问百度的那台服务器。 （VPN 正向代理，代理客户端）

**浏览器解析渲染过程** 返回的 html 传递到浏览器后，如果有 gzip 会先解压，找出文件编码格式，外链资源的加载 html 从上往下解析，遇到 js，css 停止解析渲染，直到 js 执行完成。解析 HTML，构建 DOM 树 解析 CSS，生成 CSS 规则树 合并 DOM 树和 CSS 规则，生成 render 树去渲染

不会引起 DOM 树变化，页面布局变化，改变元素样式的行为叫重绘

引起 DOM 树结构变化，页面布局变化的行为叫回流

**GUI 渲染线程**负责渲染浏览器界面 HTML 元素,当界面需要 重绘(Repaint) 或由于某种操作引发 回流(reflow) 时,该线程就会执行。在 Javascript 引擎运行脚本期间,GUI 渲染线程都是处于挂起状态的,也就是说被”冻结”了. 直到 JS 程序执行完成，才会接着执行。因此如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。JavaScript 是可操纵 DOM 的，如果在修改这些元素属性同时渲染界面，渲染前后元素数据可能不一致

**GPU 绘制多进程的浏览器** 主控进程，插件进程，GPU，tab 页（浏览器内核）多线程的浏览器内核：每一个 tab 页面可以看作是浏览器内核进程，然后这个进程是多线程的。

它有几大类子线程：

- GUI 线程
- JS 引擎线程
- 事件触发线程
- 定时器线程
- HTTP 请求线程

## HTTP1, HTTP2, HTTP3

http2 多路复用：相同域名多个请求，共享同一个 TCP 连接，降低了延迟

请求优先级：给每个 request 设置优先级

二进制传输；之前是用纯文本传输

数据流：数据包不是按顺序发送，对数据包做标记。每个请求或回应的所有数据包成为一个数据流，

服务端推送：可以主动向客户端发送消息。

头部压缩：减少包的大小跟数量

HTTP/1.1 中的管道（ pipeline）传输中如果有一个请求阻塞了，那么队列后请求也统统被阻塞住了 HTTP/2 多请求复用一个 TCP 连接，一旦发生丢包，就会阻塞住所有的 HTTP 请求。HTTP/3 把 HTTP 下层的 TCP 协议改成了 UDP！http1 keep alive 串行传输

## http 中的 keep-alive 有什么作用

响应头中设置 keep-alive 可以在一个 TCP 连接上发送多个 http 请求

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
