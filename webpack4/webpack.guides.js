
//===================webpack指南：https://www.webpackjs.com/guides/ ======================


//-------------------webpack的安装--------------------------

//(1)我们采用Node.js的包管理工具npm来安装webpack，所以先去Node.js的官网（https://nodejs.org/en/）下载安装Node.js，这样就可以用npm来安装webpack了（在Node.js学习中也能了解到如何使用npm）

//(2)安装命令：npm install webpack --save-dev（--save-dev或者写-D代表安装时在对应的package.json中的devDependencies，即开发依赖中写入webpack的版本信息，方便下次直接运行npm install就可以安装）

//(3)根据webpack官网说明，安装的webpack如果版本在4.0及以上，则还需要安装webpack-cli，即命令行接口

//(4)安装命令：npm install webpack-cli --save-dev


//--------------------webpack打包基本应用程序：利用npx webpack命令----------------------

//(1)为了防止我们打包的应用程序不小心通过npm发布了（也就是发布到了npm中，别人就可以下载了），可以在package.json中设置private为true，并移除main属性，即程序入口

//(2)<script>标签引入的js文件之间存在“隐式依赖”，比如index.html中的index.js就依赖于lodash.js，因为用到了全局变量 _ 。

//(3)“隐式依赖”并不好。
//---无法立即显式体现依赖关系
//---如果依赖引入顺序错误，或者依赖不存在，则程序无法运行
//---如果没有使用依赖，则浏览器会被迫下载无用的代码

//(4)所以我们要采用显式依赖的方式如import _ from 'lodash'，这样webpack就能利用这些信息去构建依赖图，最好用npm安装lodash。

//(5)安装命令：npm install lodash --save

//(6)先重新划分下目录结构
/*
|-/dist
  |-index.html（在dist/index.html中引入main.js，因为webpack打包后生成的脚本默认是dist/main.js）
|-/src
  |-index.js
*/

//(7)构建命令：npx webpack（Node.js 8.2+版本支持），会自动查找命令执行时所在目录下的src文件夹中的脚本，即js文件，作为打包的入口entry