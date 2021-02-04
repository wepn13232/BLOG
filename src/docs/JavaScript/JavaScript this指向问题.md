# JavaScript this指向问题

> 具体的问题和实例都可以参考[https://www.cnblogs.com/pssp/p/5216085.html](https://www.cnblogs.com/pssp/p/5216085.html)，这里做简化



要弄清楚JavaScript里面的this指向问题，那么需要知道一句话：this的指向永远指向调用它的那一个实例，下面以代码梳理一下。
```javascript
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();
```
上述的代码中，a方法是直接被window所调用，那么this的指向就指向了window，而且window实例里面并没有user字段，所以会输出undefined。
那么我们可以更改一下代码，让this指向本实例
```javascript
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
```
在上面的代码中，func呗o实例所调用，那么this指向了o实例，所以this.user会输出数据。
当然还有一些特殊情况入下：
```javascript
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
window.o.fn();


var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
        }
    }
}
o.b.fn();
```
上述说明了，无论最开头是谁调用的，this指向指指向最近调用它的那一个实例。除了下面的例子外：
```javascript
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j(); //这里调用的还是window
```


那么还有一种情况是，如果func里面出现了return，那么this指向也会改变
```javascript
function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined

===================================

function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined

====================================
  
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子
```
上面说明了，如果返回值是一个对象，那么这个this将指向这个对象，如果返回值不是一个对象那么还是指向该实例。不过null也是对象，但是this也还是会指向该实例，null是一个特例。
