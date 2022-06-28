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

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
