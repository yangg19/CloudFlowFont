// 封装导出数据工具类
// 本身也是通过 axios 调用后端接口
import axios from 'axios'
// 让 axios 默认带一个响应的类型 arraybuffer 二进制数组 流
const service = axios.create({
  responseType: 'arraybuffer'
})

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
  return config
}, error => {
  console.log(error)
})

// 响应拦截器
service.interceptors.response.use(resp => {
  const headers = resp.headers // 拿到请求头
  const reg = RegExp(/application\/json/) // 判断返回流 还是 Json 字符串
  // 如果请求头 匹配正则 说明是一个普通请求
  if (headers['content-type'].match(reg)) {
    resp.data = unitToString(resp.data) // 拿到 json 字符串对象
  } else {
    const fileDownload = require('js-file-download') // 插件
    let fileName = headers['content-disposition'].split(';')[1].split('filename=')[1]// 文件名
    const contentType = headers['content-type'] // 响应类型
    fileName = decodeURIComponent(fileName) // 格式转换 防止乱码
    fileDownload(resp.data, fileName, contentType) // 通过插件下载文件
  }
}, error => {
  console.log(error)
})

// 处理 json 格式的转换( 编码 解码 ）
function unitToString(unitArray) {
  const encodedString = String.fromCharCode.apply(null, new Uint8Array(unitArray))
  const decodedString = decodeURIComponent(escape(encodedString))
  return JSON.parse(decodedString) // 转对象
}

// 下载文件的请求
const base = ''
export const downloadRequest = (url, params) => {
  return service({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}

// 整体暴露出去，供外界调用
export default service
