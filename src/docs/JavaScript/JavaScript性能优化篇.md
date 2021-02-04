# JavaScript性能优化篇

### 闭包的性能优化
所谓闭包，即在一个functionA内定义了另外一个functionB，然后functionB内执行完的值return回functionA，那么functionB即为一个闭包，这个闭包functionB将会一直存在functionA中不会清除。
换一种说法，既是**函数a的内部函数b被函数a外的一个变量引用的时候，就创建了一个闭包**
```javascript
function a (){
	var i = 0;
  
  function B(){
  	console.log(++i);
  }
  
  return B();
}

var c = a();  //c变量调用了A函数内的B函数
```
> 这里清楚机制涉及到了JavaScript的垃圾回收机制
> 虽然像V8等优化后的JavaScript引擎会尝试回收闭包内的内存，但还是要谨慎使用

所以建议还是减少使用闭包，要不然会导致网页性能的下降，因为闭包内变量内存一直存在。
例如下面的函数（柯里化函数，可参考另外一篇文章[柯里化函数（Sev3n元）](https://www.yuque.com/u1169848/iw662u/gch552)）
```javascript
function add(x) {
			return function (y) {
				return x + y
			}
		}

		var add5 = add(5);
		var add10 = add(10);
		console.log(add5(2));
		console.log(add10(2));
```
释放对闭包的使用  add5 = null ; add10 = null;
什么情况下会引起内存泄露：

- 意外的全局变量
- 闭包函数引起的内存泄露
- 没有清理的dom元素引用
```javascript
//未优化的函数
function assignHandler(){
	var element = document.getElementById("someElement"); 
  element.onclick = function(){
  	alert(element.id);
  }
}


//优化后的函数（回收机制）
function assignHandler(){
	var element = document.getElementById("someElement"); 
  var id = element.id;
  element.onclick = function(){
			alert(id);
		};
  element = null;
}
```

- 被遗忘的定时器或者回调
- 子元素存在引用



不过在新的JavaScript执行机制中，系统会自动进行垃圾回收，回收那些已经没有再进行调用的函数或者变量。
```javascript
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

checkscope()();  //执行完之后，系统回直接进行垃圾回收f()中引用的scope变量
```
```javascript
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope(); 
foo(); //执行完之后，因为还存在foo变量，所以系统不会对f()中引用的scope变量执行垃圾回收
```


### 事件优化
在js、vue开发中，我们可能会用到定时器、循环和监听等，这些事件是不会自己销毁的（vue组件销毁的时候也会销毁事件，但如果在不销毁组件的情况下是不会自动销毁事件的），如果不进行销毁的话，如同上面所说，会照成内存泄露等问题。
所以一般在组件内进行手动销毁来进行性能的优化。
```javascript
removeEventListener('click', this.click, false); //js销毁监听事件

let timer = setTimeout({},1000);
timer = null; //时间器的销毁;
```


### 事件代理
JavaScript开发中，如果子dom节点是动态生成（如vue的v-for循环生成或者js的append生成）并且每一个子节点都需要添加事件处理，建议将事件添加到父节点上面。（当然是建议在子节点数据、dom节点基本一致的情况下）
```javascript
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
<script>
  let ul = document.querySelector('##ul')
  ul.addEventListener('click', event => {
    console.log(event.target)
  })
</script>
```
这样做的好处是 1.节省内存 2.不需要给子节点注销事件
