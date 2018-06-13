
//===================webpack指南：https://www.webpackjs.com/guides/ ======================


//-------------------webpack的安装--------------------------

//(1)我们采用Node.js的包管理工具npm来安装webpack，所以先去Node.js的官网（https://nodejs.org/en/）下载安装Node.js，这样就可以用npm来安装webpack了（在Node.js学习中也能了解到如何使用npm）

//(2)安装命令：npm install webpack --save-dev（--save-dev或者写-D代表安装时在对应的package.json中的devDependencies，即开发依赖中写入webpack的版本信息，方便下次直接运行npm install就可以安装）

//(3)根据webpack官网说明，安装的webpack如果版本在4.0及以上，则还需要安装webpack-cli，即命令行接口

//(4)安装命令：npm install webpack-cli --save-dev


//--------------------webpack打包基本应用程序：利用npx webpack命令（Node.js 8.2+版本支持）----------------------

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

//(7)构建命令：npx webpack（Node.js 8.2+版本支持）
//---使用该命令时，webpack会自动查找命令执行时所在目录下的src文件夹中的index.js（固定是./src/index.js，名称和路径什么的变了都不行），作为打包的入口entry
//---然后输出output也是固定的为main.js，路径为./dist文件夹下

//(8)注意：
//---像import export等ES6标准提供的模块语句，大多数浏览器不支持，通过webpack打包后，webpack会对其进行转换，从而可以使用
//---但ES6中其他的语法特性，webpack并不会进行处理，如果要使用，则必须在webpack的加载器loader用到如babel-loader等转换工具


//---------------------webpack打包基本应用程序：利用配置文件（这里的配置文件就是该文件webpack.guides.js）-------------------------------

//(1)所有的配置信息都在module.exports对象中生效，因为webpack打包就是将应用程序打包成一个模块，然后导出。
const path = require('path');//通过webpack使用Node.js的require()方法去加载Node.js的path模块，用于处理各种路径信息
const HtmlWebpackPlugin = require('html-webpack-plugin');//通过Node.js的require从node_modules中引入此插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webapck = require('webpack');
module.exports = {//入口。注意入口指的是脚本js文件，而不是html文件，webpack打包后只有一个html文件，而且是在打包后webpack通过htmlWebpackPlugins插件自动添加的，或者我们手动放置到打包后的目录的
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),//打包后的文件所放置的目录。__dirname代表配置文件所在目录的路径，path.resolve()用于拼接两个字符串
    //filename: 'bundle.js'//单个入口文件打包后得到的文件的名称。注意要带.js
    filename: '[name][hash].js'//多个入口文件命名采用占位符
  },
  mode: 'production',//开发模式
  module: {
    rules: [
      {
        test: /\.css$/,//表明用css-loader和style-loader去解析依赖的.css文件
        use: ['style-loader', 'css-loader']//注意必须要两个都有，而且顺序必须style-loader在前，css-loader在后，不然会报错
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,//表明遇到这些图片时，用file-loader加载
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,//表明这些字体时，用file-loader加载。file-loader 和 url-loader 可以接收并加载任何文件
        use: 'file-loader'
      },
      {
        test: /\.(csv|tsv)$/,//用csv-loader加载.csv或.tsv文件
        use: 'csv-loader'
      },
      {
        test: /\.xml$/,//用xml-loader加载.xml文件（webpack内置是支持.json文件的，所以不用配置.json，配置了会报错哦）
        use: 'xml-loader'
      },
      {
        test: /\.(html|htm)/,//用html-loader来加载html文件，同时会调用file-loader和css-loader等处理里面所用的图片，样式等
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({//在plugins中进行插件的配置，这样就会webpack打包的时候就会去自动生成index.html文件了，当然有的可以通过配置进行修改
      template: './index.html'
    }),
    new CleanWebpackPlugin(['dist']),//每次构建时清理dist
    new webapck.HotModuleReplacementPlugin(),//模块热替换，无需完全刷新
  ],
  devtool: 'source-map',//这表明打包后仍保留原始源代码，具体有哪些值可选：https://www.webpackjs.com/configuration/devtool/
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),//代表提供内容的目录
    port: 8090,//web服务器端口号，这样运行webpack-dev-server --open就会启动web服务器localhost:8090，读取的内容就是dist文件夹中的内容，默认显示index.html
    hot: true
  }
}

//(2)打包命令：npx webpack --config webpack.guides.js

//(3)也可以使用npm脚本，在package.json的scripts中写入要执行的命令，这样就可以简写命令，方便打包了

//(4)打包命令：npm run build


//------------------------webpack利用加载器loader打包各种资源-------------------------------

//(1)如果不指定对应的loader，就会报错，如Module not found: Error: Can't resolve 'index.css' in 'E:\workspaces\My_workspace\Demo_syk\webpack4\src'

//(2)所以要先安装对应的资源loader，再在配置文件中配置

//(3)安装css文件的loader，命令：npm install css-loader style-loader --save-dev（必须两个都安装，有时候安装失败或者卡住，可以先用npm uninstall卸载下，再安装）

//(4)这样就可以在配置文件中进行加载器loader的配置了

//(5)webpack处理依赖，如样式background:url(...)和<img src='...'>中的图片链接时，需要用file-loader来加载

//(6)安装命令：npm install file-loader --save-dev

//(7)像一些数据文件，如.json  .xml  .csv .tsv等，可以用对应的xml-loader csv-loader等加载器。
//---注意json是内置支持的，不需要在配置加载器，配置了的话会报错

//(8)安装命令：npm install xml-loader csv-loader --save-dev

//(9)如果是直接在html中写入<img src="...">来加载图片，这样就得用html-loader来加载html文件

//(10)安装命令：npm install html-loader --save-dev


//----------------------------webpack管理输出----------------------------------

//(1)从上面的打包过程来看，打包得到的index.html是我们手动添加的，并在里面引入需要打包好的js文件。
//---如果后面打包的js文件的命名采用hash编码，或者有多个打包后的js文件，那么每次都需要去index.html手动修改，很麻烦哦，所以我们要用插件来自动生成index.html

//(2)这里我们增加一个print.js，作为第二个入口，这样就有两个打包后的文件

//(3)通过HtmlWebpackPlugin插件来自动生成index.html，并把打包好后的入口文件通过<script>标签引入到index.html中（同样先安装，再配置）

//(4)安装命令：npm install html-webpack-plugin --save-dev

//(5)配置信息具体看：https://www.webpackjs.com/plugins/html-webpack-plugin/

//(6)又有一个问题，这样生成的index.html文件内容就是包含了打包好后的入口文件，内容很固定。如果想在index.html加些自己的内容，那就可以进行一下配置
//---先创建一个index.html，然后new HtmlWebpackPlugin()时配置其html模板为index.html

//(7)又有个问题，由于打包后的文件命名采用hash编码，所以每次生成都不一样，所以dist里文件越来越多。
//---我们可以用一个额外的插件rimraf（删除文件的插件）来每次打包的时候先删除dist，这样打包后就会得到新的dist了

//(8)安装命令：npm install rimraf --save-dev

//(9)然后在npm脚本中配置webpack打包命令时，在前面加上rimraf dist，&符号连接两个命令，这样就可以每次打包生成新的dist文件夹了 

//(10)除了用额外的插件rimraf移除之前的dist外，难道webpack没想过这个问题，当然想过！
//---我们也可以用clean-webpack-plugin插件来每次打包时清理dist文件夹（同样，先安装再配置），效果和rimraf一样

//(11)安装命令：npm install clean-webpack-plugin --save-dev


//-----------------------webpack开发环境配置----------------------------

//(1)在开发时，每个业务模块的代码都打包到一个压缩后的js文件中了，想要调试就很困难，所以可以采用webpack配置devtool，这样就可以配置打包后仍能调试原业务代码，但仅限开发环境中使用
//---令devtool为'source-map'是保留原始源代码最为详尽的，打包过程比较慢，注意生成环境千万不要这样配，只有开发环境才行。
//---这样明显可以看到打包后目录中出现了.js.map文件，这个就是在网页中观察时，用于显示原始源代码的
//---原本在网页中只看得到top:files://内容，现在可以看到top:webpack://，并且在top:webpack://./文件夹中看到完整的源代码，便于调试

//(2)现在开发环境中，我们打包好了，也能调试了，但是每次修改了代码，又需要在去打包才能看到效果，这样未免太麻烦了。
//---我们可以采用自动编译，webpack提供了以下3个不同的选项，可以在代码修改后自动编译代码：
//---webpack's Watch Mode（观察模式：执行webpack --watch命令，不停监察代码的修改，缺点是需要手动刷新浏览器才能看到效果）
//---webpack-dev-server（最常用）（简单的web服务器：能实时重新加载代码，不需要手动刷新浏览器，浏览器会自动刷新，缺点是全部刷新，并不是局部更新）
//---webapck-dev-middleware（中间件：用于将webpack打包后的文件传给服务器）（webpack-dev-server在内部使用了这个的，也就是把打包后的文件传给的此Web服务器）

//(3)主要用下webpack-dev-server
//---安装命令：npm install webpack-dev-server --save-dev
//---在module.exports中配置devServer，具体配置项：https://www.webpackjs.com/configuration/dev-server/
//---运行命令：webpack-dev-server --config webpack.guides.js --open。也可以写在npm脚本中
//---注意要用--config指定配置文件，不然默认是以8080端口，访问的是命令执行所在目录下的index.html
//---这样就可以根据配置，在localhost:8090启动服务器了，当然端口这些也可以直接通过命令行CLI指定，如--port 8088
//---当代码进行了修改后，浏览器就会自动刷新了


//------------------------webpack模块热替换------------------------------------

//(1)上面也说过使用webpack-dev-server虽然能实时刷新浏览器，但每次都是完全刷新，而不是改的地方局部刷新，导致每次都要重新加载所有的资源
//---于是有了模块热替换

//(2)想要启用模块热替换HMR？很简单
//---配置devServer.hot为true
//---配置webpack内置的HMR插件

//(3)如果是css等样式文件修改了，可以借助style-loader和css-loader很容易实现css的模块热替换，除此之外，像vue-loader等也能很好的支持模块热替换

//(4)但如果是其他的，则需要使用module.hot.accept()方法来绑定模块才能实现模块热替换


//-----------------------webpack tree shaking(移除上下文中未用到的代码)---------------------------------

//(1)tree shaking是啥？
//---专业术语，啊哈，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。
//---当然这必须基于ES6的import和export语法

//(2)上下文？嗯哼
//---上下文在我的理解，就像一个函数用到了函数外部的一个变量，这个变量既在函数外部又在函数内部，这个变量就表示上下文。
//---或者模块之间引用，模块A引用了模块B，那么模块B既在模块A外部，又在模块A内部，模块B就是上下文，即外部变量

//(3)为了将上下文中export了的，但没有import出来的代码删除
//---需要将配置文件中的mode改为“production”，即生产环境，来压缩输出
//---在package.json中配置sideEffects，标记文件无副作用
