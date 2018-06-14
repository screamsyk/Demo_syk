//开发环境配置
const merge = require('webpack-merge');//合并配置
const common = require('./webpack.common.js');//公用配置
module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        port: 8081
    }
});