# HTML + Css

## 什么是 BFC（块级格式化上下文）、IFC（内联格式化上下文 ）、FFC（弹性盒模型）

BFC（Block formatting context），即块级格式化上下文，它作为 HTML 页面上的一个独立渲染区域，只有区域内元素参与渲染，且不会影响其外部元素。简单来说，可以将 BFC 看做是一个“围城”，外面的元素进不来，里面的元素出不去（互不干扰）。

一个决定如何渲染元素的容器 ，渲染规则 ：

1. 内部的块级元素会在垂直方向，一个接一个地放置。
2. 块级元素垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻块级元素的 margin 会发生重叠。
3. 对于从左往右的格式化，每个元素（块级元素与行内元素）的左边缘，与包含块的左边缘相接触，(对于从右往左的格式化则相反)。即使包含块中的元素存在浮动也是如此，除非其中元素再生成一个 BFC。
4. BFC 的区域不会与浮动元素重叠。
5. BFC 是一个隔离的独立容器，容器里面的子元素和外面的元素互不影响。
6. 计算 BFC 容器的高度时，浮动元素也参与计算。

形成 BFC 的条件:

1、浮动元素，float 除 none 以外的值；

2、定位元素，position（absolute，fixed）；

3、display 为以下其中之一的值 inline-block，table-cell，table-caption；

4、overflow 除了 visible 以外的值（hidden，auto，scroll）；

BFC 一般用来解决以下几个问题

- 边距重叠问题
- 消除浮动问题
- 自适应布局问题

## flex: 0 1 auto; 是什么意思？

元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器 。水平的主轴（main axis）和垂直的交叉轴（cross axis）几个属性决定按哪个轴的排列方向

flex-grow: 0 一个无单位数(): 它会被当作<flex-grow>的值。 flex-shrink: 1 一个有效的**宽度(width)**值: 它会被当作 <flex-basis>的值。 flex-basis: auto 关键字 none，auto 或 initial. 放大比例、缩小比例、分配多余空间之前占据的主轴空间。

## 避免 CSS 全局污染

- scoped 属性
- css in js

```javascript
const styles = {
  bar: {
    backgroundColor: '#000',
  },
};
const example = (props) => {
  <div style={styles.bar} />;
};
```

- CSS Modules
- 使用 less，尽量少使用全局对选择器

```less
// 选择器上＞要记得写，免得污染所有ul下面的li
ul｛
  ＞li｛
    color：red；
  }
}
```

## CSS Modules

阮一峰 CSS Modules

CSS Modules 是一种构建步骤中的一个进程。通过构建工具来使指定 class 达到 scope 的过程。

CSS Modules 允许使用::global(.className)的语法，声明一个全局规则。凡是这样声明的 class，都不会被编译成哈希字符串。:local(className): 做 localIdentName 规则处理, 编译唯一哈希类名。

CSS Modules 使用特点:

- 不使用选择器，只使用 class 名来定义样式
- 不层叠多个 class，只使用一个 class 把所有样式定义好
- 不嵌套 class

## 盒子模型和 box-sizing 属性

width: 160px; padding: 20px; border: 8px solid orange; 标准 box-sizing: content-box; 元素的总宽度 = 160 + 202 + 82; IE 的 border-box：总宽度 160

margin/padding 取百分比的值时 ，基于父元素的宽度和高度的。

## css 绘制三角形

1. 通过 border 处理

```css
// border 处理
.class {
  width: 0;
  height: 0;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
  border-left: 50px solid transparent;
}

// 宽高+border
div {
  width: 50px;
  height: 50px;
  border: 2px solid orange;
}
```

2. clip-path 裁剪获得

```css
div {
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}
```

3. 渐变 linear-gradient 实现

```css
div {
  width: 200px;
  height: 200px;
  background: linear-gradient(
    to bottom right,
    #fff 0%,
    #fff 49.9%,
    rgba(148, 88, 255, 1) 50%,
    rgba(185, 88, 255, 1) 100%
  );
}
```
