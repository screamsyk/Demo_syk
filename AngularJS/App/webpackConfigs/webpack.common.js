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
        new webpack.ProvidePlugin({//使用时自动加载第三方库，并设定全局变量
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyWebpackPlugin([
            { from: './images', to: 'images' },//复制文件
            { from: './css', to: 'css' },
            { from: './fonts', to: 'fonts' }
        ])
    ],
    resolve: {//解析
        modules: [//告诉webpack该去哪里找依赖的文件
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../images'),
            path.resolve(__dirname, '../components')
        ],
        alias: {//设定文件路径的别名，这样使用时就方便很多
            //注意特殊的一点：如果是在html中通过<img src='...'>或者在css中用background:url()引入静态图片资源，需要用~images/来告诉webpack要使用别名路径，而不是相对路径
            images: path.resolve(__dirname, '../images'),
            components: path.resolve(__dirname, '../components')
        }
    }
}