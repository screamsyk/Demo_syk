
//开发环境
const merge = require('webpack-merge');//用于合并配置的工具
const common = require('./webpack.common.js');//公用配置
module.exports = merge(common, {
    mode:'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8090
    }
});