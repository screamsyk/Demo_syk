//公用配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        vendors: './vendors.js',//第三方依赖以及样式文件
        app: './index.js',//应用程序入口
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
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
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
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
        new CopyWebpackPlugin([
            { from: './images', to: 'images' }
        ])
    ],
    resolve: {//解析
        modules: [//告诉webpack该去哪里找依赖的文件
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../images'),
            path.resolve(__dirname, '../components')
        ],
        alias: {//设定文件路径的别名，这样使用时就方便很多
            images: path.resolve(__dirname, '../images'),
            components: path.resolve(__dirname, '../components')
        }
    }
}