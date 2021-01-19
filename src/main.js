import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Highlight from './util/highlight'

Vue.config.productionTip = false
Vue.use(Highlight);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
