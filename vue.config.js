module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "127.0.0.1",
        port: '8080',
        disableHostCheck: true,
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8081/acfun-api', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}