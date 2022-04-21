---
order: 2
title: Loader
---

# Loader

## 有哪些常见的 Loader？你用过哪些 Loader？

raw-loader：加载文件原始内容（utf-8）

file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)

url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值时返回其 publicPath，小于阈值时返回文件 base64 形式编码 (处理图片和字体)

source-map-loader：加载额外的 Source Map 文件，以方便断点调试

svg-inline-loader：将压缩后的 SVG 内容注入代码中

image-loader：加载并且压缩图片文件

json-loader 加载 JSON 文件（默认包含）

handlebars-loader: 将 Handlebars 模版编译成函数并返回

babel-loader：把 ES6 转换成 ES5

ts-loader: 将 TypeScript 转换成 JavaScript

awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader

style-loader：将 CSS 代码注入 JavaScript 中，通过 DOM 操作去加载 CSS

css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS

postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀

eslint-loader：通过 ESLint 检查 JavaScript 代码

tslint-loader：通过 TSLint 检查 TypeScript 代码

mocha-loader：加载 Mocha 测试用例的代码

coverjs-loader：计算测试的覆盖率

vue-loader：加载 Vue.js 单文件组件

i18n-loader: 国际化

cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

更多 Loader 请参考官网

https://webpack.docschina.org/loaders

## 编写 loader 的思路

Loader 支持链式调用，所以开发上需要严格遵循“单一职责”，每个 Loader 只负责自己需要负责的事情。

Loader 的 API 可以去官网查阅

https://www.webpackjs.com/api/loaders

- Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用
- Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据
- 尽可能的异步化 Loader，如果计算量很小，同步也可以
- Loader 是无状态的，我们不应该在 Loader 中保留状态
- 使用 loader-utils 和 schema-utils 为我们提供的实用工具
- 加载本地 Loader 方法
  - Npm link
  - ResolveLoader
