# uni-app 开发小技巧

> 目前，uni-app 跨端框架在团队基本完成落地，且投入多个微信小程序项目中使用。  
> 本文会重点介绍在小程序场景下的一些开发技巧，也非常欢迎各位同学的补充。

## 一、项目配置

```markdown
┌─api 用于请求方法管理 ├─assets  
│ └─styles iconfont/base/var 等样式文件管理  
├─components 符合 vue 组件规范的 uni-app 组件目录 │ └─comp-a.vue 可复用的 a 组件  
├─constant 常量管理 ├─pages 业务页面文件存放的目录 │ ├─index │ │ └─index.vue index 页面 │ └─[subpackage] 分包 │ └─list.vue 分包内子页面 ├─static 存放应用引用的本地静态资源（如图片、视频等）的目录 ├─store vuex 状态管理目录 ├─utils 工具方法管理目录 ├─main.js Vue 初始化入口文件 ├─App.vue 应用配置，用来配置 App 全局样式以及监听 应用生命周期 ├─manifest.json 配置应用名称、appid、logo、版本等打包信息，详见 ├─pages.json 配置页面路由、导航条、选项卡等页面类信息，详见 └─uni.scss 这里是 uni-app 内置的常用样式变量
```

如上是相对合理且适合当下开发场景的项目结构，本文会重点介绍以下几个文件的特殊用法:

- `manifest.json`

- `pages.json`

- `uni.scss`

其余目录不做赘述。

**注意：** 静态资源（图片视频等）只能存放于 `static` 目录，例如 `tabbar` 所使用的 `icon` 。

### 1.1 pages.json

> `pages.json` 文件用来对 `uni-app` 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生 `tabbar` 等。  
> [文档地址](https://uniapp.dcloud.io/collocation/pages.html)

#### 1.1.1 组件注册 easycom

传统 vue 组件，需要 `安装`、`引用`、`注册`，三个步骤后才能使用组件。

`easycom` 将其精简为一步。 只要组件安装在项目的 `components` 目录下，

并符合 `components/组件名称/组件名称.vue` 目录结构，就可以不用引用、注册，直接在页面中使用。

不管 `components` 目录下安装了多少组件，`easycom` 打包后会自动剔除没有使用的组件，

对组件库的使用尤为友好。

```json
// pages.json
{
  ...,
  "easycom": {
    "^jh-(.*)": "justui/packages/jh-$1/jh-$1.vue",
    "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
  },
  ....
}
```

#### 1.1.2 小程序分包

> 分包加载配置，此配置为小程序的分包加载机制。

因小程序有体积和资源加载限制。在小程序启动时，默认会下载主包并启动主包内页面。

当用户进入分包内某个页面时，会把对应分包自动下载下来，下载完成后再进行展示。

所以分包最直接的好处就是 **减小主包体积，提升首屏渲染的速度。**

**注意：**

- `subPackages` 里的 `pages` 的路径是 `root` 下的相对路径，不是全路径；
- 微信小程序每个分包的大小是**2M**，总体积一共不能超过**20M**；
- 在代码包划分的时候，也要注意把控好细粒度。

#### 1.1.3 分包预载配置

配置 `preloadRule` 后，在进入小程序某个页面时，由框架自动预下载可能需要的分包，提升进入后续分包页面时的启动速度

以下为数疗助手小程序案例：

```json
{
  ...,
  "subPackages": [
    {
      "root": "pages/user",
      "pages": [
        {
          "path": "base-info/index",
          "style": {
            "navigationBarTitleText": "基本信息",
            "enablePullDownRefresh": false
          }
        }
      ]
    }
  ],
  "preloadRule": {
    "pages/tabbar/mine/index": {
      // 在指定网络下预下载，可选值为：all（不限网络）、wifi（仅wifi下预下载）
      "network": "all",
      // 进入页面后预下载分包的 root 或 name。__APP__ 表示主包。
      "packages": ["pages/user"]
    }
  }
}
```

### 1.2 manifest.json

> `manifest.json` 文件是应用的配置文件，用于指定应用的名称、图标、权限等  
> [文档地址](https://uniapp.dcloud.io/collocation/manifest.html)

#### 开启分包优化

```json
/*
* manifest.json文件中，在mp-weixin对象中添加以下配置
* "optimization":{"subPackages":true}
*/

{
  ...,
  "mp-weixin": {

    "appid": "",
    "setting": {
      "urlCheck": false
    },
    "usingComponents": true,
    "optimization":{
      "subPackages":true
    }

  },
  ...
}

```

- 目前只支持`mp-weixin`、`mp-qq`、`mp-baidu`、`mp-toutiao`的分包优化
- 分包优化具体逻辑：

  - 静态文件：分包下支持 `static` 等静态资源拷贝  
    (即分包目录内放置的静态资源不会被打包到主包中，也不可在主包中使用)

  - `js` 文件：当某个 `js` 仅被一个分包引用时，该 `js` 会被打包到该分包内，否则仍打到主包  
    (即被主包引用，或被超过 1 个分包引用)

  - 自定义组件：若某个自定义组件仅被一个分包引用时，且未放入到分包内，编译时会输出提示信息

关于介绍 `optimization` 字段的目的我们留到第三段再展开说。

### 1.3 其他配置（组件配置）

当我们进行微信小程序组件开发，但又需要对组件样式进行隔离时，我们通常会用 `styleIsolation` 来进行配置，那我们在使用 uni-app 的时候，应该怎么做呢？

```javascript
export default {
  options: {
    /**
     * 微信小程序中 options 选项,
     * 在组件定义时的选项中启动多slot支持，默认启用
     */
    multipleSlots: true,
    /**
     * 启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。
     * 具体配置选项参见：微信小程序自定义组件的样式
     */
    styleIsolation: 'isolated',
    /**
     * 表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。
     * 这个选项等价于设置 styleIsolation: apply-shared
     */
    addGlobalClass: true,
    /**
     * 将自定义节点设置成虚拟的，更加接近Vue组件的表现
     * 我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等
     * 而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
     */
    virtualHost: true,
  },
};
```

## 二、代码 Coding

### 2.1 页面组件

- `Class`与`Styl`e 绑定

```vue
<template>
  // bad
  <span
    :class="item1.score === 'N/A' || item1.score === -1 || !item1.score ? 'number-mini' : 'number'"
  >
    {{ item1.score !== -1 && item1.score ? item1.score : 'N/A' }}
  </span>

  <span :class="cls">
    {{ item1.score !== -1 && item1.score ? item1.score : 'N/A' }}
  </span>
</template>

<script>
export default {
  computed: {
    cls() {
      return {
        [`jh-button--${this.type}`]: true,
        [`jh-button--${this.size}`]: true,
        'jh-button--plain': this.plain,
        'jh-button--disabled': this.disabled,
        'jh-button--round': this.round,
        'jh-button--block': this.block,
      };
    },
  },
};
</script>
```

- 页面通信

  我们可以设想这样两个场景:  
   a. 一个小程序的 tabbar 页面，在每一次进入的时候请求数据，页面会因为数据的清空刷新而闪烁；  
   b. 当我们从一个列表页进入一个详情页，且这个详情页中请求较慢时

  以上两个场景无疑都影响到了用户的使用体验。

  那我们可以怎么解决呢？

  - `eventchannel` 页面间事件通信通道
  - `uni.$emit` 触发全局的自定义事件 [跨页面通讯](https://uniapp.dcloud.io/api/window/communication.html#emit)

  如场景 a 那样，页面之间存在前后链接关系，我们就可以通过 `eventChannel` 进行数据传递，当页面栈中，跨越了多个页面时，我们就可以尝试着用 `uni.$emit` 来更新数据

- `v-html` 微信小程序会被转成 `rich-text`

- `webview` 体验优化

  `webview` 中可以进行 `onLoad` 、 `onError` 监听，展示 `Loading` 、 `Empty` 等

- 插槽 `Slot`

  在微信小程序中, 插槽无法通过 `$slots.default` 进行判断。

  当我们无法用 `js` 来解决时，我们可以试着换换思路，比如 `css`

  ```scss
  &__slot {
    & + .jh-badge__content {
      display: none;
    }
    &:empty {
      & + .jh-badge__content {
        display: block;
      }
    }
  }
  ```

- 兼容性

  支持页面组件内的过滤器，但是小程序中无法使用全局过滤器、自定义指令

![uni-app](@/assets/uni-app-global-api.png)

### 2.2 路由

> 虽然我们需要获取当前 route 信息的场景不是很多，但是我们还是需要对路由要有一定的了解

#### 2.2.1 [getCurrentPages](https://uniapp.dcloud.io/tutorial/page.html#getcurrentpages)

这是我们常用的做法：

```javascript
const pages = getCurrentPages();
const [firstRoute] = pages;

/**
 * firstRoute: {
 *  onHide: Function
 *  onLoad: Function
 *  onReady: Function
 *  onResize: Function
 *  onRouteEnd: Function
 *  onShow: Function
 *  onUnload: Function
 *  options: {}
 *  route: "pages/tabbar/patient-manage/index"
 * }
 */
```

#### 2.2.2 隐藏 API

在做小程序页面自动化埋点需求时，发现了两个小程序隐藏的 API，分别是：

- onAppRoute
- onAppRouteDone

```javascript
wx.onAppRoute((res) => {
  const { path = '', query } = res;
  console.log('[onAppRoute]: ', path, query);
});
```

感兴趣的同学可以复制这几行代码，放到小程序开发工具的 console 里尝试一下。

当然了，这两个 api 我们只能用来监听路由的变化，并不能作为路由守卫来使用。

### 2.3 [条件编译](https://uniapp.dcloud.io/tutorial/platform.html#preprocessor)

就如上一条所说，我们在使用 `onAppRoute` 这个 `api` 时，只有小程序平台能够支持，并且 `uni-app` 也没有开放这个 `api`。这个时候就可以向大家介绍 `uni-app` 的条件编译。

> 条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

```vue
<template>
  <!--  #ifdef  MP-WEIXIN -->
  平台特有的组件
  <!--  #endif -->
</template>
<script>
// #ifdef MP-WEIXIN
平台特有的API实现;
// #endif
</script>
<style>
/*  #ifdef MP-WEIXIN  */
  平台特有样式
/*  #endif  */
</style>
```

下面的页面，只有运行至 微信小程序 时才会编译进去。

```json
{
  "pages": [
    // #ifdef MP-WEIXIN
    {
      "path": "pages/index/index",
      "style": {}
    }
    // #endif
  ]
}
```

## 三、Devtools 使用

### 3.1 性能自检

![wechat-dev-tools](@/assets/wechat-dev-tools.png)

我们可以通过 `Audits` 进行小程序的性能和体验等的评分，最终的评分结果中也会给出相应修改的建议。

[评分标准](https://developers.weixin.qq.com/miniprogram/dev/framework/audits/audits.html) 有兴趣的同学可以点击链接，自行查看，就不占用本文篇幅了。

### 3.2 依赖分析

工具提供代码静态依赖分析插件，方便开发者查看代码包的文件构成和依赖关系，以此优化代码包大小和内容。

这个问题真正引起我的重视，是在小程序端开发`Echarts`图表时发现小程序无法真机预览、无法提交到微信公众平台。

在经过依赖分析后发现，是主包大小超过了**2M**的限制。

![dependence-analysis](@/assets/dependence-analysis-1.png)

搓搓小手不要慌，优化措施如下：

- `Echarts.js` 文件压缩，文件体积降低 **43%**
- 对使用了图表的页面进行代码包划分，降低主包体积
- 进行了以上两个步骤还不够 ———— 这里就要用上本文第一段中的 `optimization`

现在，再来看一下我们的依赖分析：

![dependence-analysis](@/assets/dependence-analysis-2.png)

完美！手工！加鸡腿！

## 结尾

以上就是我在 `uni-app` 框架使用过程中所有的探索发现和实践所得，再次欢迎各位同学的阅读指导和补充。
