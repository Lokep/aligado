---
title: watch与watchEffect的区别
order: 4
toc: menu
---

# watch 与 watchEffect 的区别

1. `watch` 是惰性执行，也就是只有监听的值发生变化的时候才会执行，但是 `watchEffect` 不同，每次代码加载 `watchEffect` 都会执行（忽略 `watch` 第三个参数的配置，如果修改配置项也可以实现立即执行）

2. `watch` 需要传递监听的对象，`watchEffect`不需要

3. `watch` 只能监听响应式数据：`ref` 定义的属性和`reactive`定义的对象，如果直接监听`reactive`定义对象中的属性是不允许的，除非使用函数转换一下

4. `watchEffect` 如果监听 `reactive` 定义的对象是不起作用的，只能监听对象中的属性。

<br>

```javascript
let count = ref(0);
let countObj = reactive({
  count: 0,
});

// 惰性，首次加载不执行
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});

/**
 * watch 不能直接监听reactive里面的属性，只能监听ref、reactiveObject， function， array,
 * 如果想监听reactive的某个属性，那么需要转换成函数
 */
watch(
  () => countObj.count,
  (newVal, oldVal) => {
    console.log(oldVal, newVal);
  },
  {},
);

watch(countObj, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});

// 监听多个值，前面是监听数据的数组，后面的参数是两个数组，前面数组是变化后监听对象值的数组，后面是变化前监听对象值的数组
watch([countObj, count], ([oneNewName, twoNewName], [oneOldName, twoOldName]) => {
  console.log(oneNewName, oneOldName, twoNewName, twoOldName);
});

/**
 * watchEffect，和watch不一样，
 * 1、会立即执行，只要定义了就会执行。
 * 2、他只能监听某个值，监听对象不管用。
 * 3、不需要传递参数，会自动管制代码中的变量。
 * 4、没法获取newVal和oldVal
 */
const watchEf = watchEffect(() => {
  console.log(countObj.count);
});
```
