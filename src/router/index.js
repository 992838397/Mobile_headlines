// 1.路由工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//2.创建路由对象
const router = new VueRouter({
    // 配置路由对象
    routes: [
        // 配置单个对象
        {
            name: "login",
            path: '/login',
            // 异步加载
            component: () => import('@/views/login.vue')
        }
    ]
})

//3.暴露
export default router