# webpack 构建性能

## 如何优化 Webpack 的构建速度？

- 使用高版本的 Webpack 和 Node.js

- 合理使用 sourceMap

- 多进程/多实例构建：HappyPack(不维护了)、thread-loader

- 压缩代码

  - webpack-paralle-uglify-plugin
  - uglifyjs-webpack-plugin 开启 parallel 参数 (不支持 ES6)
  - terser-webpack-plugin 开启 parallel 参数
  - 多进程并行压缩
  - 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

- 图片压缩

  - 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
  - 配置 image-webpack-loader

- 缩小打包作用域：

  - exclude/include (确定 loader 规则范围)
  - resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)，优化 resolve.modules
  - resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
  - resolve.extensions 尽可能减少后缀尝试的可能性
  - noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
  - IgnorePlugin (完全排除模块)
  - 合理使用 alias， 优化 resolve.alias

- 提取页面公共资源：

  - 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
  - 使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件

- DLL：

  - 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
  - HashedModuleIdsPlugin 可以解决模块数字 id 问题

- 充分利用缓存提升二次构建速度：

  - babel-loader 开启缓存
  - terser-webpack-plugin 开启缓存
  - 使用 cache-loader 或者 hard-source-webpack-plugin

- Tree shaking

  - purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用(建议)
  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
  - 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
  - 使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码

- Scope hoisting

  - 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
  - 必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法

- 动态 Polyfill

建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。(部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill) 更多优化请参考官网-构建性能

https://www.webpackjs.com/guides/build-performance

### 优化 loader 配置

在使用 loader 时，可以通过配置 include、exclude、test 属性来匹配文件，接触 include、exclude 规定哪些匹配应用 loader

````

```JS
module.exports = {
  module: {
    rules: [{
      // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
      test: /\.js$/,
      // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      use: ['babel-loader?cacheDirectory'],
      // 只对项目根目录下的 src 目录中的文件采用 babel-loader
      include: path.resolve(__dirname, 'src'),
    }, ]
  },
};
````

### 合理使用 resolve.extensions

在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库， resolve 可以帮助 webpack 从每个 require/import 语句中，找到需要引入到合适的模块代码

通过 resolve.extensions 是解析到文件时自动添加拓展名，默认情况如下：

```JS
module.exports = {
  extensions: [".warm", ".mjs", ".js", ".json"]
}
```

当我们引入文件的时候，若没有文件后缀名，则会根据数组内的值依次查找

当我们配置的时候，则不要随便把所有后缀都写在里面，这会调用多次文件的查找，这样就会减慢打包速度

### 优化 resolve.modules

resolve.modules 用于配置 webpack 去哪些目录下寻找第三方模块。默认值为['node_modules']，所以默认会从 node_modules 中查找文件 当安装的第三方模块都放在项目根目录下的 ./node_modules 目录下时，所以可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：

```JS
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};
```

### 优化 resolve.alias

alias 给一些常用的路径起一个别名，特别当我们的项目目录结构比较深的时候，一个文件的路径可能是./../../的形式

通过配置 alias 以减少查找过程

```JS
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
}
```

### 使用 DLLPlugin 插件

DLL 全称是 动态链接库，是为软件在 winodw 中实现共享函数库的一种实现方式，而 Webpack 也内置了 DLL 的功能，为的就是可以共享，不经常改变的代码，抽成一个共享的库。这个库在之后的编译过程中，会被引入到其他项目的代码中

使用步骤分成两部分：

- 打包一个 DLL 库
- 引入 DLL 库

#### 打包一个 DLL 库

webpack 内置了一个 DllPlugin 可以帮助我们打包一个 DLL 的库文件

```JS
module.exports = {
  ...
  plugins: [
    new webpack.DllPlugin({
      name: 'dll_[name]',
      path: path.resolve(__dirname, "./dll/[name].mainfest.json")
    })
  ]
}
```

#### 引入 DLL 库

使用 webpack 自带的 DllReferencePlugin 插件对 mainfest.json 映射文件进行分析，获取要使用的 DLL 库

然后再通过 AddAssetHtmlPlugin 插件，将我们打包的 DLL 库引入到 Html 模块中

```JS
module.exports = {
  new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, "./dll/dll_react.js"),
    mainfest: path.resolve(__dirname, "./dll/react.mainfest.json")
  }),
  new AddAssetHtmlPlugin({
    outputPath: "./auto",
    filepath: path.resolve(__dirname, "./dll/dll_react.js")
  })
}
```

### 使用 cache-loader

在一些性能开销较大的 loader 之前添加 cache-loader，以将结果缓存到磁盘里，显著提升二次构建速度

保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader

```JS
module.exports = {
  module: {
    rules: [{
      test: /\.ext$/,
      use: ['cache-loader', ...loaders],
      include: path.resolve('src'),
    }, ],
  },
};
```

### terser 启动多线程

使用多进程并行运行来提高构建速度

```JS
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
```

### 合理使用 sourceMap

打包生成 sourceMap 的时候，如果信息越详细，打包速度就会越慢。对应属性取值如下所示：

![sourceMap](https://mmbiz.qpic.cn/mmbiz_png/gH31uF9VIibSoI6FCtsF6SziaHgoXmNoJWMe5nRClcCXugv8nGP1wfjMgia2rc2libVx74kOYnS2g6IK7IdSSTTW6A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 参考文献

https://github.com/ly2011/blog/issues/44 https://xie.infoq.cn/article/541418eb82a674741a0ad8865 https://zhuanlan.zhihu.com/p/139498741 https://vue3js.cn/interview
