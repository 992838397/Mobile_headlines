import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/reset.less'


import { toast } from 'vant';
Vue.use(toast);

// 引入路由
// import router from '@/router/index.js'
import router from '@/router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
