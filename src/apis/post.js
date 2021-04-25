// 这是获取新闻文章 API接口

import axios from '@/utils/request'

// 获取文章
export const getNewslist = (params) => {
    return axios({
        // url: '/post?category' + category
        url: `/post`,
        params
    })

}