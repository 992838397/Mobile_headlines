// 专门处理文件上传
import axios from '@/utils/request.js'

export const uploadFile = (data) => {
    return axios({
        url: '/upload',
        method: 'post',
        data
    })
}