# Plugin

## 有哪些常见的 Plugin？你用过哪些 Plugin？

define-plugin：定义环境变量 (Webpack4 之后指定 mode 会自动配置)

ignore-plugin：忽略部分文件

html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)

web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用

uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)

terser-webpack-plugin: 支持压缩 ES6 (Webpack4)

webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度

mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代 extract-text-webpack-plugin)

serviceworker-webpack-plugin：为网页应用增加离线缓存功能

clean-webpack-plugin: 目录清理

ModuleConcatenationPlugin: 开启 Scope Hoisting

speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)

webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

更多 Plugin 请参考官网

https://webpack.docschina.org/plugins

## 使用 webpack 开发时，你用过哪些可以提高效率的插件？

webpack-dashboard：可以更友好的展示相关打包信息。

webpack-merge：提取公共配置，减少重复配置代码

speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。

size-plugin：监控资源体积变化，尽早发现问题

HotModuleReplacementPlugin：模块热替换

## 编写 Plugin 的思路

webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。

Plugin 的 API 可以去官网查阅

https://www.webpackjs.com/api/plugins

- compiler 暴露了和 Webpack 整个生命周期相关的钩子
- compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
- 插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件
- 找出合适的事件点去完成想要的功能
  - emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)
  - watch-run 当依赖的文件发生变化时会触发
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住
