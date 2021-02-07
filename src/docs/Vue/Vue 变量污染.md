# Vue 变量污染

在Vue开发中遇到了一个问题，如果将一个本地data里面的变量直接赋值给另外一个变量，那么修改“接受”变量的时候，也会直接影响到“授予”变量，这就是一个变量污染问题
> 目前是出现在一个数组赋值的情况下，经测试，单纯的String赋值并没有改变原数值

```javascript
data(){
	return{
  	newVal:[],
    oldVal:['123','234'],
  }
},
methods:{
	 changeVal() {
            this.newVal = this.oldVal;
            console.log(this.newVal)
        },
   change() {
       this.newVal.splice(0,1)
       this.$nextTick(() => {
          console.log(this.oldVal); //会输出234,第一个数据被删除了
           });
       }
}
```
上面的代码中，可以直接表明如果将一个数组赋值到一个新的变量中，修改新变量会直接影响到之前的数组<br />解决方法：
```javascript
this.newVal = JSON.parse(JSON.stringify(this.oldVal))
```
同时也可以使用es6的新特性进行赋值
```javascript
this.newVal = [...this.oldVal];
```
另外，如果变量是对象的话，可以使用this.newVal = Object.assign({},this.oldVal)进行赋值<br />

