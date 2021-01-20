import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Highlight from './util/highlight'

Vue.config.productionTip = false
Vue.use(Highlight);

//页面跳转 默认显示顶部
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
