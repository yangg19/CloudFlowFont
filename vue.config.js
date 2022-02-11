let proxyObj = {}

proxyObj['/'] = {
    // websocket
    ws: false,
    // 目标地址
    target: 'http://localhost:8081',
    // 发送请求头host会被设置成target
    changeOrigin: true,
    // 不重写请求地址
    pathRewrite: {
        '^/': '/'
    }
}


module.exports = {
    devServer: {
        host: '120.77.71.58',
        port: 8082,
        proxy: proxyObj
    }
}