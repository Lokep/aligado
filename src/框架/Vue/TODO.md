---
title: TODO
order: 1
---

## Vue

- [ ] [vue-cli3 从搭建到优化](https://mp.weixin.qq.com/s/gYiVyEmix6IuEH1WH1R56Q)
- [ ] [Vue 3.0 前的 TypeScript 最佳入门实践](https://mp.weixin.qq.com/s/YhM_mOrcdojMKvdAo-ujbQ) - vue2 + TS
- [ ] [学习 vuex 源码整体架构，打造属于自己的状态管理库](https://mp.weixin.qq.com/s/qQxUCbPBYSq9vU7dvDOCzg)
- [ ] [如何精确统计页面停留时长](https://mp.weixin.qq.com/s/vGe4Nqm8oHvFU8vz1ulEAg)
- [ ] [拥抱 Vue 3 系列之 JSX 语法](https://mp.weixin.qq.com/s/QoI9Jdb6phoFsZEjU-P6lw)

- [ ] [前端面试知识点](https://juejin.cn/post/6987549240436195364)

# Vue 基础

## 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为   `Object.defineProperty`   不能拦截到这些操作。

更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。

在 `Vue3.0` 中已经不使用这种方式了，而是通过使用 `Proxy` 对对象进行代理，从而实现数据劫持。

使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 `Proxy` 是 `ES6` 的语法。<br><br><br><br><br><br>

## MVVM、MVC、MVP 的区别

`MVC` 、 `MVP` 和 `MVVM` 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

- MVC

`MVC` 通过分离 `Model` 、 `View` 和 `Controller` 的方式来组织代码结构。  
 其中

- `View` 负责页面的显示逻辑，
- `Model` 负责存储页面的业务数据，以及对相应数据的操作。并且 `View` 和 `Model` 应用了观察者模式，当 `Model` 层发生改变的时候它会通知有关 `View` 层更新页面。
- `Controller` 层是 `View` 层和 `Model` 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，`Controller` 中的事件触发器就开始工作了，通过调用 `Model` 层，来完成对 `Model` 的修改，然后 `Model` 层再去通知 `View` 层更新。

![mvc](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a65e1b9145894647a25788caf12ddd26~tplv-k3u1fbpfcp-watermark.awebp)

- MVP

`MVP` 模式与 `MVC` 唯一不同的在于 `Presenter` 和 `Controller。`

在 `MVC` 模式中使用观察者模式，来实现当 `Model` 层数据发生变化的时候，通知 `View` 层的更新。

这样 `View` 层和 `Model` 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。

`MVP` 的模式通过使用 `Presenter` 来实现对 `View` 层和 `Model` 层的解耦。

`MVC` 中的 `Controller` 只知道 `Model` 的接口，因此它没有办法控制 `View` 层的更新， `MVP` 模式中， `View` 层的接口暴露给了 `Presenter` .

因此可以在 `Presenter` 中将 `Model` 的变化和 `View` 的变化绑定在一起，以此来实现 `View` 和 `Model` 的同步更新。

这样就实现了对 `View` 和 `Model` `的解耦，Presenter` 还包含了其他的响应逻辑。

- MVVM

`MVVM` 分为 `Model` 、 `View` 、 `ViewModel` ：

- `Model`代表数据模型，数据和业务逻辑都在`Model`层中定义；
- `View`代表`UI`视图，负责数据的展示；
- `ViewModel`负责监听`Model`中数据的改变并且控制视图的更新，处理用户交互操作；

`Model` 和 `View` 并无直接关联，而是通过 `ViewModel` 来进行联系的， `Model` 和 `ViewModel` 之间有着双向数据绑定的联系。因此当 `Model` 中的数据改变时会触发 `View` 层的刷新， `View` 中由于用户交互操作而改变的数据也会在 `Model` 中同步。

这种模式实现了 `Model` 和 `View` 的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作 `DOM` 。

![mvvm](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5ce15b7b704483eb91ee1f5d1d64786~tplv-k3u1fbpfcp-watermark.awebp)

<br>
<br>
<br>
<br>
<br>
<br>

## computed 和 Watch 的区别

### 对于 computed

- 它支持缓存，只有依赖的数据发生了变化，才会重新计算

- 不支持异步，当`computed`中有异步操作时，无法监听数据的变化
- `computed`的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于`data`声明过，或者父组件传递过来的 props 中的数据进行计算的。

- 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用`computed`
- 如果`computed`属性的属性值是函数，那么默认使用`get`方法，函数的返回值就是属性的属性值；

  在 `computed` 中，属性有一个 `get` 方法和一个 `set` 方法，当数据发生变化时，会调用 `set` 方法。

### 对于 Watch

- 它不支持缓存，数据变化时，它就会触发相应的操作
- 支持异步监听
- 监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
- 当一个属性发生变化时，就需要执行相应的操作
- 监听数据必须是`data`中声明的或者父组件传递过来的`props`中的数据，当发生变化时，会触发其他操作，函数有两个的参数：

  - `immediate`：组件加载立即触发回调函数（页面首次加载时，是不会执行的。只有值发生改变才会执行）

  - `deep`：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。

  当想要执行异步或者昂贵的操作以响应不断的变化时，就需要使用 watch。

### 总结

- `computed` 计算属性 : 依赖其它属性值，并且 `computed` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 `computed` 的值时才会重新计算 `computed` 的值。

- `watch` 侦听器 : 更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。

### 运用场景

当需要进行数值计算, 并且依赖于其它数据时，应该使用 `computed` ，因为可以利用 `computed` 的缓存特性，避免每次获取值时都要重新计算。

当需要在数据变化时执行异步或开销较大的操作时，应该使用 `watch` ，使用 `watch` 选项允许执行异步操作 ( 访问一个 `API` )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

<br>
<br>
<br>
<br>
<br>
<br>

## Computed 和 Methods 的区别

可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的

- 不同点：

  - `computed` 计算属性是基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值；

  - `method` 调用总会执行该函数。

<br>
<br>
<br>
<br>
<br>
<br>

## slot 是什么？有什么作用？原理是什么？

`slot` 又名插槽，是 `Vue` 的内容分发机制，组件内部的模板引擎使用 slot 元素作为承载分发内容的出口。

插槽 `slot` 是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。

`slot` 又分三类，默认插槽，具名插槽和作用域插槽。

- 默认插槽：又名匿名查抄，当 slot 没有指定 name 属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。

- 具名插槽：带有具体名字的插槽，也就是带有 name 属性的 slot，一个组件可以出现多个具名插槽。

```html
<slot name="demo"></slot>
```

- 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

`slot-scope` 已在 2.6 版本废弃使用

```html
<slot-example>
  <template slot="default" slot-scope="slotProps"> {{ slotProps.msg }} </template>
</slot-example>
```

推荐使用：

```html
<span>
  <slot v-bind:user="user"> {{ user.lastName }} </slot>
</span>

<current-user>
  <template v-slot:default="slotProps"> {{ slotProps.user.firstName }} </template>
</current-user>
```

### 实现原理

当子组件 vm 实例化时，获取到父组件传入的 slot 标签的内容，存放在 vm.$slot 中，

默认插槽为 vm.$slot.default，

具名插槽为 vm.$slot.xxx，xxx 为插槽名，

当组件执行渲染函数时候，遇到 slot 标签，使用$slot 中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

<br>
<br>
<br>
<br>
<br>
<br>

## 过滤器的作用，如何实现一个过滤器

根据过滤器的名称，过滤器是用来过滤数据的，在 `Vue` 中使用 `filters` 来过滤数据， `filters` 不会修改数据，而是过滤数据，改变用户看到的输出（计算属性 `computed` ，方法 `methods` 都是通过修改数据来处理数据格式的输出显示）

### 使用场景

- 需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出`/`显示

- 比如后端返回一个 年月日的日期字符串，前端需要展示为 多少天前 的数据格式，此时就可以用`fliters`过滤器来处理数据。

过滤器是一个函数，它会把表达式中的值始终当作函数的第一个参数。过滤器用在插值表达式 `{{ }}` 和 `v-bind` 表达式 中，然后放在操作符“ | ”后面进行指示。

<br>
<br>
<br>
<br>
<br>
<br>

## 常见的事件修饰符及其作用

- `.stop`：等同于 `JavaScript` 中的 `event.stopPropagation()` ，防止事件冒泡；
- `.prevent` ：等同于 `JavaScript` 中的 `event.preventDefault()` ，防止执行预设的行为

  如果事件可取消，则取消该事件，而不停止事件的进一步传播；

- `.capture` ：与事件冒泡的方向相反，事件捕获由外到内；
- `.self` ：只会触发自己范围内的事件，不包含子元素；
- `.once` ：只会触发一次。

<br>
<br>
<br>
<br>
<br>
<br>

## data 为什么是一个函数而不是对象

JavaScript 中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。

而在 Vue 中，更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。

所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的 data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。

<br>
<br>
<br>
<br>
<br>
<br>

## 对 keep-alive 的理解，它是如何实现的，具体缓存的是什么？

如果需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。

### keep-alive

1. `keep-alive` 有以下三个属性： **keep-alive 包裹动态组件时，会缓存不活动的组件实例**

- `include` 字符串或正则表达式，只有名称匹配的组件会被匹配；

- `exclude` 字符串或正则表达式，任何名称匹配的组件都不会被缓存；

- `max` 数字，最多可以缓存多少组件实例。

2. 主要流程

- 判断组件 `name` ，不在 `include` 或者在 `exclude` 中，直接返回 `vnode，说明该组件不被缓存。`

- 获取组件实例 `key` ，如果有获取实例的 `key`，否则重新生成。

- key 生成规则，`cid +"∶∶"+ tag` ，仅靠`cid`是不够的，因为相同的构造函数可以注册为不同的本地组件。

- 如果缓存对象内存在，则直接从缓存对象中获取组件实例给 `vnode` ，不存在则添加到缓存对象中。
- 最大缓存数量，当缓存组件数量超过 `max` 值时，清除 `keys` 数组内第一个组件。

### 实现

1. 源码：

```javascript
const patternTypes: Array<Function> = [String, RegExp, Array]; // 接收：字符串，正则，数组

export default {
  name: 'keep-alive',

  // 抽象组件，是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
  abstract: true,

  props: {
    include: patternTypes, // 匹配的组件，缓存
    exclude: patternTypes, // 不去匹配的组件，不缓存
    max: [String, Number], // 缓存组件的最大实例数量, 由于缓存的是组件实例（vnode），数量过多的时候，会占用过多的内存，可以用max指定上限
  },

  created() {
    // 用于初始化缓存虚拟DOM数组和vnode的key
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed() {
    // 销毁缓存cache的组件实例
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    // prune 削减精简[v.]
    // 去监控include和exclude的改变，根据最新的include和exclude的内容，来实时削减缓存的组件的内容
    this.$watch('include', (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch('exclude', (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },
};
```

2. render 函数

- 会在 `keep-alive` 组件内部去写自己的内容，所以可以去获取默认 slot 的内容，然后根据这个去获取组件

- `keep-alive` 只对第一个组件有效，所以获取第一个子组件。

- 和 `keep-alive` 搭配使用的一般有：动态组件 和`router-view`

```typescript
render () {

  // 获取第一个子组件
  function getFirstComponentChild (children: ?Array<VNode>): ?VNode {
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        const c = children[i]
        if (
          isDef(c) &&
          (isDef(c.componentOptions) || isAsyncPlaceholder(c))
        ) {
          return c
        }
      }
    }
  }

  const slot = this.$slots.default // 获取默认插槽
  const vnode: VNode = getFirstComponentChild(slot)// 获取第一个子组件
  const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions // 组件参数

  if (componentOptions) { // 是否有组件参数
    // check pattern
    const name: ?string = getComponentName(componentOptions) // 获取组件名
    const { include, exclude } = this
    if (
      // not included
      (include && (!name || !matches(include, name))) ||
      // excluded
      (exclude && name && matches(exclude, name))
    ) {
      // 如果不匹配当前组件的名字和include以及exclude
      // 那么直接返回组件的实例
      return vnode
    }

    const { cache, keys } = this

    // 获取这个组件的key
    const key: ?string = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
      : vnode.key

    if (cache[key]) {
      // LRU缓存策略执行
      vnode.componentInstance = cache[key].componentInstance // 组件初次渲染的时候componentInstance为undefined

      // make current key freshest
      remove(keys, key)
      keys.push(key)
      // 根据LRU缓存策略执行，将key从原来的位置移除，然后将这个key值放到最后面
    } else {
      // 在缓存列表里面没有的话，则加入，同时判断当前加入之后，是否超过了max所设定的范围，如果是，则去除
      // 使用时间间隔最长的一个
      cache[key] = vnode
      keys.push(key)
      // prune oldest entry
      if (this.max && keys.length > parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
      }
    }
    // 将组件的keepAlive属性设置为true
    vnode.data.keepAlive = true // 作用：判断是否要执行组件的created、mounted生命周期函数
  }
  return vnode || (slot && slot[0])
}
```

`keep-alive` 具体是通过 `cache` 数组缓存所有组件的 `vnode` 实例。当 `cache` 内原有组件被使用时会将该组件 `key` 从 `keys` 数组中删除，然后 `push` 到 `keys` 数组最后，以便清除最不常用组件。

3. 实现步骤：

- 获取 keep-alive 下第一个子组件的实例对象，通过他去获取这个组件的组件名

- 通过当前组件名去匹配原来 include 和 exclude，判断当前组件是否需要缓存，不需要缓存，直接返回当前组件的实例 vNode

- 需要缓存，判断他当前是否在缓存数组里面：

  - 存在，则将他原来位置上的 key 给移除，同时将这个组件的 key 放到数组最后面（LRU）

  - 不存在，将组件 key 放入数组，然后判断当前 key 数组是否超过 max 所设置的范围，超过，那么削减未使用时间最长的一个组件的 key

- 最后将这个组件的 keepAlive 设置为 true

[对 keep-alive 的理解，它是如何实现的，具体缓存的是什么？](https://juejin.cn/post/6919373017218809864#heading-17)

<br>
<br>
<br>
<br>
<br>
<br>

## nextTick 原理及作用

`Vue` 的 `nextTick` 其本质是对 `JavaScript` 执行原理 `EventLoop` 的一种应用。

`nextTick` 的核心是利用了如 `Promise` 、 `MutationObserver` 、 `setImmediate` 、 `setTimeout` 的原生 `JavaScript` 方法来模拟对应的微/宏任务的实现，

本质是为了利用 `JavaScript` 的这些异步回调任务队列来实现 `Vue` 框架中自己的异步回调队列。

`nextTick` 不仅是 `Vue` 内部的异步队列的调用方法，同时也允许开发者在实际项目中使用这个方法来满足实际应用中对 `DOM` 更新数据时机的后续逻辑处理

`nextTick` 是典型的将底层 `JavaScript` 执行原理应用到具体案例中的示例，引入异步更新队列机制的原因 ∶

- 如果是同步更新，则多次对一个或多个属性赋值，会频繁触发 `UI/DOM` 的渲染，可以减少一些无用渲染

- 同时由于 `VirtualDOM` 的引入，每一次状态发生变化后，状态变化的信号会发送给组件，组件内部使用 `VirtualDOM` 进行计算得出需要更新的具体的 `DOM` 节点，然后对 `DOM` 进行更新操作，每次更新状态后的渲染过程需要更多的计算，而这种无用功也将浪费更多的性能，所以异步渲染变得更加至关重要

在以下情况下，会用到 nextTick：

- 在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的`DOM`结构的时候，这个操作就需要方法在`nextTick()`的回调函数中。

- 在`vue`生命周期中，如果在`created()`钩子进行`DOM`操作，也一定要放在`nextTick()`的回调函数中。

  因为在 `created()` 钩子函数中，页面的 `DOM` 还未渲染，这时候也没办法操作 `DOM` ，所以，此时如果想要操作 `DOM` ，必须将操作的代码放在 `nextTick()` 的回调函数中

<br>
<br>
<br>
<br>
<br>
<br>

## Vue 中封装的数组方法有哪些，其如何实现页面更新

在 `Vue` 中，对响应式处理利用的是 `Object.defineProperty` 对数据进行拦截，

而这个方法并不能监听到数组内部变化，数组长度变化，数组的截取变化等，所以需要对这些操作进行 `hack` ，让 `Vue` 能监听到其中的变化。

`Vue` 就对以下方法进行了封装：

- push
- pop
- shift
- unshift
- splice
- sort
- reverse

简单来说就是，重写了数组中的那些原生方法，首先获取到这个数组的 `__ob__` ，也就是它的 `Observer` 对象，

如果有新的值，就调用 `observeArray` 继续对新的值观察变化（也就是通过 `target__proto__ == arrayMethods` 来改变了数组实例的型），

然后手动调用 `notify` ，通知渲染 `watcher` ，执行 `update` 。
