import axios from 'axios';
import { showLoading, hideLoading } from './loading';
import { Message } from 'element-ui';
import store from '../store/index'
// 超时设置
axios.defaults.timeout = 10000
// 请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api'


/* 请求拦截器（请求之前的操作） */
axios.interceptors.request.use((req) => {
    // showLoading();
    if (sessionStorage.getItem("userInfo") != null) {
        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        req.headers.Authorization = userInfo.token
    }
    return req;
}, err => {
    Message({
        message: err,
        type: 'error'
    })
    Promise.reject(err)
});

// /* 请求之后的操作 */
// axios.interceptors.response.use((res) => {
//     setTimeout(() => {
//         hideLoading();
//     }, 400);
//     return res;
// }, (err) => {
//     setTimeout(() => {
//         hideLoading();
//         Message({
//             message: err,
//             type: 'error'
//         })
//     }, 2000);
//     return Promise.reject(err);
// });

const api = new Proxy({}, {
    get(target, prop) {
        const method = /^[a-z]+/.exec(prop)[0];
        const path = '/' + prop
            .substring(method.length)
            .replace(/([a-z])([A-Z])/g, '$1/$2')
            .replace(/\$/g, '/$/')
            .toLowerCase();
        return (...args) => { // <------ 返回动态构造的函数！
            const url = path.replace(/\$/g, () => args.shift());
            const options = args.shift() || {};
            console.log('Requesting: ', method, url, options);
            return axios({ method, url, ...options });
        }
    }
});

export default api;