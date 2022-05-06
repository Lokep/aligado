## HTTP 缓存

## 常见问题

### http 响应头中的 ETag 值是如何生成的

关于 etag 的生成需要满足几个条件

当文件不会更改时，etag 值保持不变。所以不能单纯使用 inode 便于计算，不会特别耗 CPU。这样子 hash 不是特别合适便于横向扩展，多个 node 上生成的 etag 值一致。这样子 inode 就排除了

### Last-Modified，ETag 与协商缓存

### 如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改

### http 服务中静态文件的 Last-Modified 是根据什么生成的

### 既然 http 是无状态协议，那它是如何保持登录状态

### 我们如何从 http 的报文中得知该服务使用的技术栈

### 在发送 http 请求报文时，Host 是必要的吗

### http 响应头中如果 content-type 为 application/octet-stream，则代表什么意思

### http 向 https 做重定向应该使用哪个状态码

### http 响应头中的 Date 与 Last-Modified 有什么不同，网站部署时需要注意什么

### http 1.1 中的 keep-alive 有什么作用

---

https://juejin.cn/post/6844903517702848526 https://juejin.cn/post/6844903634002509832 https://juejin.cn/post/6993358764481085453
