// 这个模块专门处理user的借口封装
import axios from '@/utils/user/login.js'

export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}