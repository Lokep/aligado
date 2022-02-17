# Vuex

## Vuex 实现原理：

Vue.use(vuex)会调用 vuex 的 install 方法

在 beforeCreate 钩子前混入 vuexInit 方法，vuexInit 方法实现了 store 注入 vue 组件实例，并注册了 vuex store 的引用属性$store。

Vuex 的 state 状态是响应式，是借助 vue 的 data 是响应式，将 state 存入 vue 实例组件的 data 中；

Vuex 的 getters 则是借助 vue 的计算属性 computed 实现数据实时监听。
