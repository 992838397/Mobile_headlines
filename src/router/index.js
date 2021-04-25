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
            path: '/',
            redirect: 'index'
        },
        {
            name: "login",
            path: '/login',
            // 异步加载
            component: () => import('@/views/user/login.vue')
        },
        {
            name: "register",
            path: '/register',
            // 异步加载
            component: () => import('@/views/user/register.vue')
        },
        {
            name: "persondal",
            path: '/persondal/:id',
            // 异步加载
            component: () => import('@/views/user/persondal.vue')
        },
        {
            name: "edit_profile",
            path: '/edit_profile/:id',
            // 异步加载
            component: () => import('@/views/user/edit_profile.vue')
        },
        {
            name: "index",
            path: '/index',
            // 异步加载
            component: () => import('@/views/index.vue')
        }
    ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/persondal/') !== -1) {
        next()
        let token = localStorage.getItem('my_token')
        if (token) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }

})



//3.暴露
export default router