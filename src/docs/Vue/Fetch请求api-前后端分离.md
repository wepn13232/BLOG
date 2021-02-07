# Fetch请求api-前后端分离

Fetch请求后端接口，无需其他的库，也是vue官方推荐<br />普通Fetch请求
```javascript
fetch（url，{parmas}）.then(res=>
    return res.json()  //返回promise对象
 ).then(data=>{
    return data     //返回真正数据
}).catch(err=>{
   throw new Error(err)
})
```
其中Fetch的Get方法可以直接写在请求的url上面拼接即可<br />Post和Get请求的头部不相同

- post：{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
- get：{'Content-Type': 'application/json;charset=utf-8'}

---

<a name="yKkIm"></a>
### 封装接口
由上面普通的请求可以进一步封装，方便调用<br />引入qsnpm install qs -s
```javascript
import qs from 'qs'
```
在src（或者具体目录下）新建util.js文件用于存储封装的url
```javascript
//获取首页“文章推荐”
export function getIndexEssay(methods, data) {
   return fetch('/api/getIndexEssay',
      {method: methods, headers: header, body: qs.stringify(data)}).then(res=>{
         return res.json();
   }).then(res=>{
   	return res.json();
   })
}
```
在vue中引入js文件，然后调用接口
```javascript
allUrls.dologin({
//所需要的参数
},'post').then(res=>{ //get的话直接拼接参数 后续可以封装get、post一起
    console.log(res); //res即为数据
}).catch(err=>{
    console.log(err);
})
```

---

<a name="RG2No"></a>
### 跨域问题
在Vue请求Fetch中，前后端分离的话需要进行跨域，在vue目录中新建vue.config.js
```javascript
module.exports = {
    //请求代理
    devServer: {
        proxy: {
            '/api': {  //使用"/api"来代替"http://xxxx.cn"
                  target: 'http://localhost:8881', //源地址 （接口域名）
                //target: 'http://192.168.0.104:8881', //源地址 （接口域名）
                ws:true,
                changeOrigin: true, //改变源 （是否跨域）
                pathRewrite: {
                     '^/api': 'localhost:8881' //路径重写 (正常请求接口的简写)
                    //'^/api': 'http://192.168.0.104:8881' //路径重写 (正常请求接口的简写)
                }
            }
        }
    },
}
```


