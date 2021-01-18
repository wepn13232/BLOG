# JavaScript 柯里化函数

<a name="tlSmG"></a>
### 柯里化函数定义
所谓柯里化函数，就是将一个多传参的函数封装成一个可以分开传参的函数，并且可以多次调用、复用
> _维基百科_的[解释](https://links.jianshu.com/go?to=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E6%259F%25AF%25E9%2587%258C%25E5%258C%2596)是：把接收多个参数的函数变换成接收一个单一参数（最初函数的第一个参数）的函数，并返回接受剩余的参数而且返回结果的新函数的技术。其由数学家Haskell Brooks Curry提出，并以curry命名。
> 

> 作者：南宫__
> 链接：[https://www.jianshu.com/p/7fa99a4bee8b](https://www.jianshu.com/p/7fa99a4bee8b)
> 来源：简书

> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


<br />下面这个是一个简单的例子，如果需要两个参数相加
```javascript
function add(a,b){
	return a+b;
}
//add(2,5)输出出来的结果是7
```
如果使用柯里化函数进行封装编写的话
```javascript
function add(a){
	return function(b){
  	return a+b;
  }
}
//那么可以执行add(2)(5),也是得到同样的结果

//或者使用es6语法编写
function add(a){
 return (b)=>{
 	return a+b;
 }
}
```
上述代码可以看到，我们将add(2,5)拆分成了add(2)(5)使用
> **柯里化背后的逻辑就是获取一个函数并派生出一个返回特殊函数的函数**，它实际上是一种思想，或者说是一种程序设计模式。



<a name="CEW93"></a>
### 下面是柯里化的一个应用
> 引用来自[https://www.jianshu.com/p/7fa99a4bee8b](https://www.jianshu.com/p/7fa99a4bee8b)

举个例子，你有一家商店，然后你想给你的优惠顾客10%的折扣：<br />正常写法
```javascript
function discount (price, discount) {
  return price * discount
}
// 当一个顾客消费了500元
const price = discount(500, 0.1) // $50

// 从长远看，你的每一笔生意都要计算10%的折扣
const price = discount(1500, 0.1) // $150
const price = discount(2000, 0.1) // $200
const price = discount(50, 0.1) // $5
const price = discount(300, 0.1) // $30

```
使用柯里化函数
```javascript
// 将这个函数柯里化，然后我们就不用每次都写那0.1了
function discount (discount) {
  return (price) => {
    return price * discount
  }
}
const tenPercentDiscount = discount(0.1)

// 现在，我们只需用商品价格来计算就可以了：
tenPercentDiscount(500) // $50

// 接下来，有些优惠顾客越来越重要，让我们称为vip顾客，然后我们要给20%的折扣，我们这样来使用柯里化了的discount函数：
const twentyPercentDiscount = discount(0.2)

// 我们为vip顾客使用0.2调用柯里化discount函数来配置了一个新的函数。这个twentyPercentDiscount函数会被用来计算vip顾客的折扣：
twentyPercentDiscount(500) // $100
twentyPercentDiscount(3000) // $600
twentyPercentDiscount(80000) // $16000
```
从上述的函数我们可以得知，如果一个方法设计我们只能确定一个参数，另外一个参数是可变的时候，我们可以使用柯里化函数进行封装，从而达到代码设计的高效、便捷，达到性能的一个提升。
