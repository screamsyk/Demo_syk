//生产环境配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Uglifyjs = require('uglifyjs-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new Uglifyjs()//打包时压缩文件
    ]
});