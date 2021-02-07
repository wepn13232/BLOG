# JavaScript使用递归造成内存溢出

```javascript
	var num = 0;

	function text() {
		num++;
		if (num > 10) {
			console.log('执行完毕');
			return;
		} else {
			text();
		}
	}
```
上述代码中，很明显是一个递归函数，只要条件不满足就会不断得调用自己。<br />但是如果条件设置得比较大的时候，可能会造成内存溢出或者泄露，导致页面卡死等问题。<br />
<br />所以我们在开发的时候，要经常注意一下程序是否使用了递归函数，那么这个递归函数是否会对浏览器或者页面造成性能的影响，我们需要进行优化。<br />

> 如果想了解在JavaScript中其他的优化性能方法，可以参考一下这篇文章


<br />回到正题，如果我们使用了递归且逻辑业务量比较大的时候，我们需要使用下面的优化方式：

- 尾调用递归
- 闭包
- 事件驱动 




---

<a name="rYMuY"></a>
### 尾调用函数
什么是尾调用？简单来说就是在函数的最后一步调用另外一个函数
```javascript
function wdg() {
		return anotherFunc(); //在最后一步执行了另外的函数
	}
```
但是下面的func都不属于尾调用优化
```javascript
/ 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}
```

<br />为什么尾调用会有优化效果？下面是阮一峰的解释：
```javascript

function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f() 的调用记录，只保留 g(3) 的调用记录。<br />
<br />这就叫做"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义。

所以尾递归也比较容易理解了，就是在函数的最后一步进行自身的调用，且不用记录之前的任何数据
```javascript
//非尾递归函数
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}


//尾递归函数
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
```
> 上面的代码中很容易看出，非尾递归函数还需要记录n的信息和调用记录




---

<a name="Od1dd"></a>
### 闭包
闭包，简单易懂就是在函数内包裹多一层函数进行递归
```javascript
function isEven(num) {
		if (num === 0) {
			return true;
		}
		return function () {
			return isEven(Math.abs(num) - 2);
		}
	}
```



---

<a name="Iykow"></a>
### 事件驱动
在JS中，setTimeout这种方式的函数调用，实际上是将该函数的引用（指针）储存起来，并在适当的时候调用，而且setTimeout是宏任务，可以对递归有一定的优化作用。
```javascript
function factorial (number, result = 1) {
  if (number === 1) {
    console.log('result', result)
    return result
  }
  setTimeout(() => {
    factorial(number - 1, number * result)
  }, 0)
}
```
上面的代码说明，将函数递归放到宏任务中，下一次函数调用时，上一个 “父” 函数的调用已经执行完毕，就不会存在堆栈溢出的风险。
