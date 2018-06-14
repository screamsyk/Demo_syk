//生产环境
const merge = require('webpack-merge');//用于合并配置的工具
const common = require('./webpack.common.js');//公用配置
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//用于压缩的插件
const webpack = require('webpack');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')//指定环境
        })
    ]
});