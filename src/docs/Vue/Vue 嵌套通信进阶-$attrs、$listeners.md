# Vue 嵌套通信进阶-$attrs、$listeners

vue开发中的父子组件通信的时候，通常都会使用props、$emit等方法进行上下数据通信，但是如果嵌套的层数比较多，那么会导致通信复杂且不易于维护，一旦中间组件或者父组件发生了变化，最后面的子组件都要进行修改，不易于代码的维护。
vue官方文档中，在新版本中推出了$attrs和$listeners这两个api，其目的就是为了解决嵌套通信复杂的问题。




假设在一个嵌套的组件中（最外层父组件A，嵌套子组件B，子组件B中嵌套组件C）
![](https://cdn.nlark.com/yuque/0/2020/png/1416330/1602661720862-a25fec56-521e-4f51-b12d-54d36ebc2eb1.png)如果按照正常的父子组件通信，那么C组件想要获得父组件A的数据等属性，那么A组件的数据需要传给B，然后B组件再次传给C。
```html
//下面代码简化，省略vdata、props等参数

<template>
//这里是A组件
//然后往B组件传值
  <B :A_data="A_data"></B>
</template>


<template>
  //这里是B组件
  <C :B_data="A_data"></C>
</template>


<template>
  //这里是C组件
  {{this.B_data}}
</template>
```
由上可知，一旦其中的B组件发生变化或者需要进行修改，那么C组件就会受到影响


但是如果在B组件中引入的C组件加上$attrs、$listerens就不一样了
```html
<template>
  //这里是B组件
  <C v-bind="$attrs" v-on="$listerens"></C>
</template>
```
如上，那么C组件无需B组件传值便可直接访问到A组件的属性和数据
```javascript
<script>
export default {
  props: { A_data: { String } },
  created() {
    console.log(this.A_data);  // 在组件A中传递过来的属性
    console.info(this.$attrs, this.$listeners);
  },
  methods: {
    hInput() {
      this.$emit("changeMyData", this.myc); // 在组件A中传递过来的事件
      																			// 直接在A组件引入的B组件上@changeMyData即可
    }
  }
};
</script>
```
