
//公用配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webapck = require('webpack');
module.exports = {
    entry: {//入口
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {//出口
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].bundle.js',//非入口文件
    },
    module: {//资源加载器loader
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [//插件
        new HtmlWebpackPlugin({//生成index.html文件
            template: './index.html'
        }),
        new webapck.HotModuleReplacementPlugin(),//模块热替换
    ],
    optimization:{//优化
        splitChunks: {//去重，webpack4开始用splitChunks代替CommonsChunkPlugin
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}