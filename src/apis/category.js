//  专门处理栏目

import axios from '@/utils/request'

export const getCatelist = () => {
    return axios({
        url: '/category'
    })
}