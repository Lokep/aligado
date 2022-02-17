---
order: 1
toc: menu
title: webpack 及工程化
---

# webpack 及工程化

## webpack 的生命周期，及钩子

compiler（整个生命周期 [kəmˈpaɪlər]） 钩子 https://webpack.docschina.org/api/compiler-hooks/compilation（编译 [ˌkɑːmpɪˈleɪʃn]） 钩子

compiler 对象包含了 Webpack 环境所有的的配置信息。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

compiler 代表了整个 webpack 从启动到关闭的生命周期，而 compilation 只是代表了一次新的编译过程

## webpack 编译过程

Webpack 的编译流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

## 优化项目的 webpack 打包编译过程

1. 构建打点：构建过程中，每一个 Loader 和 Plugin 的执行时长，在编译 JS、CSS 的 Loader 以及对这两类代码执行压缩操作的 Plugin 上消耗时长 。一款工具：speed-measure-webpack-plugin

2. 缓存：大部分 Loader 都提供了 cache 配置项。cache-loader ，将 loader 的编译结果写入硬盘缓存

3. 多核编译，happypack 项目接入多核编译，理解为 happypack 将编译工作灌满所有线程

4. 抽离，webpack-dll-plugin 将这些静态依赖从每一次的构建逻辑中抽离出去，静态依赖单独打包，Externals 将不需要打包的静态资源从构建逻辑中剔除出去，使用 CDN 引用

5. tree-shaking，虽然依赖了某个模块，但其实只使用其中的某些功能。通过 tree-shaking，将没有使用的模块剔除，来达到删除无用代码的目的。

## 首屏加载优化

1. 路由懒加载：改为用 import 引用，以函数的形式动态引入，可以把各自的路由文件分别打包，只有在解析给定的路由时，才会下载路由组件；

2. element-ui 按需加载：引用实际上用到的组件 ；

3. 组件重复打包：CommonsChunkPlugin 配置来拆包，把使用 2 次及以上的包抽离出来，放进公共依赖文件，首页也有复用的组件，也会下载这个公共依赖文件；

4. gzip: 拆完包之后，再用 gzip 做一下压缩，关闭 sourcemap。

5. UglifyJsPlugin: 生产环境，压缩混淆代码，移除 console 代码

6. CDN 部署静态资源：静态请求打在 nginx 时，将获取静态资源的地址进行重定向 CDN 内容分发网络

7. 移动端首屏加载可以使用骨架屏，自定义 loading，首页单独做服务端渲染。

8. 如何进行前端性能优化(21 种优化+7 种定位方式)

## webpack 热更新机制

热更新流程总结:

1. 启动本地 server，让浏览器可以请求本地的静态资源

2. 页面首次打开后，服务端与客户端通过 websocket 建立通信渠道，把下一次的 hash 返回前端

3. 客户端获取到 hash，这个 hash 将作为下一次请求服务端 hot-update.js 和 hot-update.json 的 hash

4. 修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端

5. 客户端获取到 hash，成功后客户端构造 hot-update.js script 链接，然后插入主文档

6. hot-update.js 插入成功后，执行 hotAPI 的 createRecord 和 reload 方法，获取到 Vue 组件的 render 方法，重新 render 组件， 继而实现 UI 无刷新更新。

## webpack 的 loader 和 plugin 介绍，css-loader，style-loader 的区别

loader 它就是一个转换器，将 A 文件进行编译形成 B 文件

plugin ，它就是一个扩展器，来操作的是文件，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，会监听 webpack 打包过程中的某些节点（run, build-module, program）

Babel 能把 ES6/ES7 的代码转化成指定浏览器能支持的代码。

css-loader 的作用是把 css 文件进行转码 style-loader: 使用<style>将 css-loader 内部样式注入到我们的 HTML 页面

先使用 css-loader 转码，然后再使用 style-loader 插入到文件

## 如何编写一个 webpack 的 plugin？

[https://segmentfault.com/a/1190000037513682](https://segmentfault.com/a/1190000037513682)

webpack 插件的组成：

- 一个 JS 命名函数或一个类（可以想下我们平时使用插件就是 new XXXPlugin()的方式）
- 在插件类/函数的 (prototype) 上定义一个 apply 方法。
- 通过 apply 函数中传入 compiler 并插入指定的事件钩子，在钩子回调中取到 compilation 对象
- 通过 compilation 处理 webpack 内部特定的实例数据
- 如果是插件是异步的，在插件的逻辑编写完后调用 webpack 提供的 callback

## 为什么 Vite 启动这么快

Webpack 会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。

而 Vite 是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。

Vite 将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像 Webpack 那样进行打包合并。

由于 Vite 在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译。因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。

## 你的脚手架是怎么做的

使用 download-git-repo 下载仓库代码 democommander：完整的 node.js 命令行解决方案。声明 program，使用.option() 方法来定义选项 Inquirer.js：命令行用户界面的集合。
