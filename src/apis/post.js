// 这是获取新闻文章 API接口

import axios from '@/utils/request'

// 获取栏目文章
export const getNewslist = (params) => {
    return axios({
        // url: '/post?category' + category
        url: `/post`,
        params
    })
}
// 获取文章详情
export const getArticlelist = (id) => {
    return axios({
        url: '/post/' + id
    })
}

// 获取点赞接口
export const getGood = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}