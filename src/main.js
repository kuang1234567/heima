import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// import '@/styles/icon.less'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
// 重置基础样式
// import '@/styles/reset.less'
import '@/styles/index.less'
// 一次将所有的filters/index.js中的所有过滤导出
import * as obj from '@/filters'
console.log(obj)
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
