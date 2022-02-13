import axios from "axios";
import {Message} from 'element-ui';
import router from '../router'

// 请求拦截器
axios.interceptors.request.use(config=>{
    // 如果存在token，请求携带这个token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error =>{
    console.log(error);
})

// 响应拦截器
axios.interceptors.response.use(success => {
    // 业务逻辑错误
    // 判断状态是否正确 200表示成功调用到了后端接口，判断是否调用到接口
    if (success.status && success.status === 200) {
        // 判断业务逻辑，data表示后端返回的json对象：code响应码、message相应信息、object携带一些其他需要传递的数据
        if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
            Message.error({message: success.data.message});
            return;
        }
        // 其他的都默认为通过
        if (success.data.message) {
            Message.success({message: success.data.message});
        }
    }
    return success.data;
}, error => {
    // 接口访问失败，拿不到json对象，所以直接通过响应码获取响应码code
    if (error.response.code === 504 || error.response.code === 404) {
        Message.error({message: '服务器故障或页面找不到'});
    } else if (error.response.code === 403) {
        Message.error({message: '权限不足，请联系管理员'});
    } else if (error.response.code === 401) {
        Message.error({message: '尚未登陆，请登录'});
        router.replace('/')
    } else {
        // 如果上述情况都不符合，则打印相应信息
        if (error.response.data.message) {
            Message.error({message: error.response.message});
        } else {
            Message.error({message: '未知错误'});
        }
    }
});

// 请求地址前置路径
let base = '/api/';

// 传送json格式的post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

// 传送json格式的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

// 传送json格式的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

// 传送json格式的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}



