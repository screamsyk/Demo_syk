//公用配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const root = path.resolve(__dirname, '../');//webpack.common.js所在目录的父级目录，也就是项目的根目录
module.exports = {
    entry: {
        vendors: './vendors.js',//第三方依赖以及样式文件
        app: './index.js',//应用程序入口
    },
    output: {
        path: path.resolve(root, 'dist'),
        filename: 'js_entry/[name].[hash].js',//入口文件
        chunkFilename: 'js_chunk/[name].[chunkhash].js'//非入口文件
    },
    module: {
        rules: [//模块资源加载器
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),//生成index.html文件
        new webpack.HotModuleReplacementPlugin(),//模块热替换
    ]
}