# Vue-router 页面动态变化

在Vue开发中，如果在一个组件或者一个页面内直接修改Url路径上的参数，这个组件或者这个页面可能不会发生变化，是因为Vue会直接认为组件或者页面的渲染没有直接变化所以不重新加载这个组件或者页面。所以组件或页面的created或者mounted等方法都不会执行。


但是可以使用$router来执行动态监听router上的参数变化
```javascript
watch:{
  //或者写$router()
	'$router':{
  	handler:'xxxx', //xxx是你自定义的方法，不用指定this
    immediate:true,
  }
}
```
上诉的代码就可以解决修改router路由上的参数页面或者组件并没有发生变化或者重新渲染的问题。


但是如果为了再简化，还有另外一个种写法
> 可以参考[https://segmentfault.com/a/1190000014085613](https://segmentfault.com/a/1190000014085613)

```javascript
created(){
	this.getPost(this.$route.params.id)
}
```
```html
<router-view :key="$route.fullpath">
	
</router-view>
```
上诉代码中，直接给router-view定义一个完整路径的参数的一个key值，如果路径发生变化的时候，那么router-view的key值也会将发生变化，顺带刷新了router-view。
