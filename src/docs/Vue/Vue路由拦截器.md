# Vue路由拦截器

vue拦截器写在router.js内
```javascript
{
            path: '/textDialog',  //弹窗测试页面
            component: textDialog,
            name: 'textDialog',
            meta: {
                title: '弹窗测试页面',
                requireAuth: true
            }
 },
```
上述路由添加了一个meta、requireAuth参数<br />然后在下述代码中判断路由跳转是否含有这个参数
```javascript
//拦截器
router.beforeEach((to, from, next) => {
    //路由中写了requireAuth是需要登录验证的路由
    if (to.matched.some(record => record.meta.requireAuth)) {
        let userPapaerCode = store.state.myCard;
        //未登录，身份证为空
        if (userPapaerCode == '') {
            next({path: '/inputID'})
        } else {
            next(); //有登录，可以通过
        }
    } else {
        next(); //没有配置参数，无需过滤
    }
});
```
