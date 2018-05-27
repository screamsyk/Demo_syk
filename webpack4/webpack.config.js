
//====================webpack配置文件======================

//(1)webpack的四大核心概念：入口（entry）、输出（output）、加载器（loader）、插件（plugins）

//(2)这些都是module.exports对象的属性，所以在module.exports中定义

//(3)webpack根据require()或者import等语句查找依赖关系


//--------------------webpack四大核心概念-------------------------

//(1)入口（entry），用于指示webpack应该从哪个文件开始，构建其依赖图（依赖如使用了require、import等关键字），方便打包
module.exports = {
    entry: './js/index.js',//这里选index.js作为入口文件，webpack从这里开始查找依赖关系
}

//(2)输出（output），用于指示webpack在哪里输出打包后的文件，以及如何命名，默认是./dist路径下
const path = require('path');//这里是webpack用的node.js中的path模块，用于处理路径
module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),//打包的文件所放置的目录路径（__dirname代表当前文件所在目录的完整路径）
        filename: 'bundle.js',//打包后的文件名称
    }
}

//(3)加载器（loader），用于指示webpack如何处理那些非JavaScript文件，如.html、.css、.png等文件
module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {//加载器loader在module.rules中配置，主要含test和use两个属性，表明遇到什么文件采用什么加载器loader
        rules: [
            {
                test: '/\.txt$/',//正则表达式，表示遇到以.txt结尾的文件
                use: 'raw-loader'//就用加载器raw-loader去加载
            }//这里就告诉webpack，当遇到在require()或者import语句中，解析出.txt的路径时，先用raw-loader转一下
        ]
    }
}

//(4)插件（plugins），可以执行很复杂的任务，只需要require一下，然后在plugins数组new一下实例就基本可以了
const HtmlWebpackPlugin = require('html-webpack-plugin');//通过npm安装插件，再通过require引入
module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: '/\.txt$/', use: 'raw-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),//该插件用于生成一个html5文件，所有打包好后的文件都在该html5文件中引入，便于访问，默认是index.html
    ]
}

//(5)还有一个小的：模式（mode）这是个小技巧，用于优化
module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: '/\.txt$/', use: 'raw-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'production'//选用相应的启用webpack内置的优化。可选‘production’（生产环境，即部署用的），或者“development”（开发环境，即本地运行用的）
}


//-----------------------基本配置好后，就可以使用webpack打包了--------------------------

//(1)为了方便，可以在通过npm init --yes命令生成的package.json的script中可以写npm脚本命令用于执行

//(2)在其中写入"start": "webpack --config ./webpack.config.js"，就可以通过npm run start执行webpack打包命令了


//-----------------------------入口（entry）的更多用法------------------------------------

{
    //单入口文件
    let config1 = {
        entry: './js/index.js'//entry是字符串
    }
    //多入口文件（用途一：单页面应用中，用于分离应用程序app和第三方库vendor）
    let config2 = {
        entry: {//entry是对象，表示分别从两个文件建立依赖图，彼此完全分离，相互独立
            app: './js/index.js',
            vendor: './js/vendor.js'//可以用CommonsChunkPlugin从app中提取公用部分到vendor中，实现复用（后面又出了个DllPlugin效果更好）
        }
    }
    //多入口文件（用途二：多页面应用）
    let config3 = {
        entry: {
            pageOne: './js/pageOne.js',
            pageTwo: './js/pageTwo.js',
            pageThree: './js/pageThree.js'//也可以用CommonsChunkPlugin提取公用部分进行单独打包
        }
    }
}


//-------------------------------输出（output）的更多用法---------------------------------------

//(1)输出（output）指定打包后文件名称以及在磁盘的位置，即使存在多个入口（entry是对象），也只配置一个输出（output）
{
    //基本使用
    let config1 = {
        output: {
            path: path.resolve(__dirname, 'dist'),//打包后文件存放的路径
            filename: 'bundle.js'//打包后文件的名称
        }
    }
    //有多个入口，打包出来就有多个文件，所以指定文件名时可以用占位符[name]、[hash]等
    let config2 = {
        entry: {
            app: './js/index.js',
            vendor: './js/vendor.js'
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name][hash].chunk.js'//使用占位符，[name]对应入口文件的属性名，[hash]代表hash编码
        }
    }
}


//------------------------------加载器（loader）的更多用法-------------------------------------