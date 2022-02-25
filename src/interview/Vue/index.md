---
order: 1
toc: menu
title: TODO
---

# Vue 框架

![范围](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a44f18af182434d901b74df18491dea~tplv-k3u1fbpfcp-watermark.awebp)

## 双向数据绑定的原理是什么？vue2 和 vue3 在响应式原理上的区别是什么？

> Object.defineProperty 和 Proxy

## Vue3 Composition API

### reactive、ref 与 toRefs、isRef

```javascript
// props 传入组件对属性
// context 一个上下文对象,包含了一些有用的属性:attrs,parent,refs
setup(props, context) {
  // ref 定义数据
  const year = ref(0);
  // reactive 处理对象的双向绑定
  const user = reactive({
    nickname: "xiaofan",
    age: 26,
    gender: "女"
  });
  setInterval(() => {
    year.value++;
    user.age++;
  }, 1000);
  return {
    year,
    // 使用toRefs,结构解构
    ...toRefs(user),
  };
},
// 提供isRef，用于检查一个对象是否是ref对象
```

### watchEffect 监听函数

- watchEffect 监听函数
- watchEffect 不需要手动传入依赖
- watchEffect 会先执行一次用来自动收集依赖
- watchEffect 无法获取到变化前的值， 只能获取变化后的值

### computed 可传入 get 和 set

用于定义可更改的计算属性

```javascript
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});
```

## nextTick 的原理以及运行机制？

## Vue 实现一个高阶组件

```javascript
// 高阶组件(HOC)接收到的 props 应该透传给被包装组件即直接将原组件prop传给包装组件
// 高阶组件完全可以添加、删除、修改 props
export default function Console(BaseComponent) {
  return {
    props: BaseComponent.props,
    mounted() {
      console.log('高阶组件');
    },
    render(h) {
      console.log(this);
      // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map((vnode) => {
          vnode.context = this._self; // 绑定到高阶组件上，vm：解决具名插槽被作为默认插槽进行渲染
          return vnode;
        });

      // 透传props、透传事件、透传slots
      return h(
        BaseComponent,
        {
          on: this.$listeners,
          attrs: this.$attrs, // attrs 指的是那些没有被声明为 props 的属性
          props: this.$props,
        },
        slots,
      );
    },
  };
}
```

## Vue 父组件传递 props 数据，子组件修改参数

- 父子组件传值时，父组件传递的参数，数组和对象，子组件接受之后可以直接进行修改，并且父组件相应的值也会修改。控制台中发出警告。
- 如果传递的值是字符串，直接修改会报错。单向数据流，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。

如果子组件想修改 prop 中数据：

- 定义一个局部变量，使用 prop 的值赋值
- 定义一个计算属性，处理 prop 的值并返回

## Vue 父子组件生命周期执行顺序

加载渲染过程

```shell
父beforeCreate -> 父created -> 父beforeMount-> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
```

子组件更新过程

```shell
父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
```

父组件更新过程

```shell
父beforeUpdate -> 父updated
```

销毁过程

```shell
父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
```

## Vue 自定义指令

自定义指令提供了几个钩子函数：bind：指令第一次绑定到元素时调用 inserted：被绑定元素插入父节点时调用 update：所在组件的 VNode 更新时调用

使用 slot 后可以在子组件内显示插入的新标签
