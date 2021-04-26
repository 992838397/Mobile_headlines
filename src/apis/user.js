// 这个模块专门处理user的借口封装
// import axios from '@/utils/request.js'
import axios from '@/utils/request'


// 用户登入
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
// 用户注册
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data00
    })
}
// 获取当前用户信息
export const getUserinfo = (id) => {
    return axios({
        url: `/user/${id}`,
        // headers: { Authorization: localStorage.getItem('my_token') }
    })
}

// 编辑用户信息
export const editUserinfo = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}
// 关注
export const followUser = id => {
    return axios({
        url: `/user_follows/${id}`
    })
}
// 取消关注用户
export const upfollowUser = id => {
    return axios({
        url: `/user_unfollow/${id}`
    })
}

// 收藏列表
export const getUserStars = () => {
    return axios({
        url: '/user_star'
    })
}

// 我的关注列表
export const getUserfollow = () => {
    return axios({
        url: '/user_follows'
    })
}