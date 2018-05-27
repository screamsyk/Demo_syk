const path = require('path');
module.exports = {
    entry: './index.js',//配置入口文件
    output: {//配置要输出到哪个文件
        filename: 'bundle.js',//文件名
        path: path.resolve(__dirname, 'dist')//文件路径：项目根目录+dist中
    }
}