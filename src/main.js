import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/reset.less'


import { toast, Icon, Uploader, Dialog, Field, ActionSheet, Tab, Tabs } from 'vant';
Vue.use(toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)

// 引入路由
// import router from '@/router/index.js'
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
