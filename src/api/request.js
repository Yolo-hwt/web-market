//对axios二次封装
import axios from 'axios'
//引入进度条组件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//引入仓库
import store from '@/store'
//创建axios实例
const requests = axios.create({
    //请求基础路径
    baseURL: "/api",
    //响应超时时间
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        //此字段和后台定义协商过
        //请求头设置uuid
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.userToken) {
        //请求头设置token
        config.headers.token = store.state.user.userToken;
    }
    //进度条开始
    nprogress.start();
    return config;
}
)
//响应拦截器
requests.interceptors.response.use((res) => {
    //响应结束
    nprogress.done();
    return res.data
}, (err) => {
    return Promise.reject(new Error('false'))
})




//对外暴露
export default requests;