const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/model', createProxyMiddleware({
        target: "http://localhost:1337/",
        changeOrigin: true,
        pathRewrite: {
            '^/model': '',
        }
    }))
    app.use('/__vocabulary', createProxyMiddleware({
        target: "https://www.vocabulary.com/dictionary/",
        changeOrigin: true,
        pathRewrite: {
            '^/__vocabulary': ""
        }
    }))
    app.use("/__bing", createProxyMiddleware({
        target: "https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=",
        changeOrigin: true,
        pathRewrite: {
            '^/__bing': '',
        }
    }))
}