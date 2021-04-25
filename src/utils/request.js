// 引入
import axios from 'axios'
axios.defaults.baseURL = 'http://157.122.54.189:9083'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 统一发送headers,不用我们一次又一次的发送,
    let token = localStorage.getItem('my_token')
    if (token) {
        config.headers.Authorization = token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.message == '用户信息验证失败!' || response.data.message == '用户信息验证失败') {
        window.location.href = '#/login'
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 暴露
export default axios