# Vue 使用Object.freeze()优化性能

vue项目渲染数据的时候，特别是大数据，那么页面加载数据的时候可能会有一定的时间拖延。


前端这边可以提供的方法有：

1. 使用Loading加载，提升页面的交互效果（产品方向）
1. 使用分页，和后端沟通，一次性只获取部分数据
1. 或者使用Object.freeze()来冻结数据



这次就根据Object.freeze()来讲一下，为什么这个方法能优化Vue的数据加载问题。


Vue在页面渲染的时候，vue会给data数据加上 getter 和 setter 进行数据的监听。顾名思义，这就是vue源码默认给数据加上的一个计算、监听属性，类似于我们手动添加watch属性，然后监听某一个变量时的设置（watch属性内，也可以自己手动添加get、set方法）。


但是Object.freeze()方法能冻结vue中的数据，即不需要添加vue默认的 getter 和 setter，那么这样能减少vue添加这些属性的时间，同时也可以减少cpu的开销，因为渲染的数据时不要进行监听的。
> 如果使用Object.frezze()冻结数据，那么数据加载的速度能增加4-10倍



需要注意的是，一旦使用了Object.freeze()来冻结数据，那么在代码中就不能直接进行数据的修改，如修改对象内的变量，否则会报错。但是可以给变量赋一个新的值。
```javascript
new Vue({
    data: {
        // vue不会对list里的object做getter、setter绑定
        list: Object.freeze([
            { value: 1 },
            { value: 2 }
        ])
    },
    mounted () {
        // 界面不会有响应
        this.list[0].value = 100;

        // 下面两种做法，界面都会响应
        this.list = [
            { value: 100 },
            { value: 200 }
        ];
        this.list = Object.freeze([
            { value: 100 },
            { value: 200 }
        ]);
    }
})

作者：Mr_Google
链接：https://juejin.im/post/6844903922469961741
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
