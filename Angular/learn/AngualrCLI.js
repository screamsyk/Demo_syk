
//========Angular CLI：好的工具让开发更加简单快捷==========

//-------------------Angular CLI----------------------

//(1)Angular CLI是一个命令行工具，用于创建Angular应用、添加文件以及测试等等任务，方便我们的操作

//(2)全局安装：npm install @angular/cli -g

//(3)创建Angular应用：ng new my-app，这时Angular CLI会去安装相应的依赖，创建项目文件，会有点慢哦

//(4)切换到创建好的项目路径下，执行ng serve --port 4201 --open，启动服务，自动打开浏览器，默认端口是4200，可以用--port指定端口

//(5)这样我们就利用Angular CLI这一命令行工具创建好了我们的Angular应用，超简单快捷


//--------------------项目结构-----------------------------

//(1)通过ng new my-app创建Angular应用，我们会看到生成了很多文件夹和文件，形成了我们的项目结构

//(2)my-app子结构：
//---e2e/：端到端测试
//---node_modules/：存放Node.js通过npm安装的包
//---src/：我们写的应用程序代码都放在src中，比如图片、Angular组件、样式等等
//---.editorconfig：编辑器配置
//---.gitignore：用于忽略不需要git管理的特殊文件
//---angular.json：Angular CLI的配置文件
//---package.json：npm的配置文件
//---package-lock.json：npm安装的包的路径缓存配置文件
//---README.md：markdown文件，项目说明
//---tsconfig.json：TypeScript编译器的配置文件
//---tslint.json：代码风格配置

//(3)src子结构
//---app/：存放Angular组件
//---app/app.component.{css,html,spec.ts,ts}：根组件
//---app/app.module.ts：定义AppModule根模块，为Angular描述如何用组件来组装应用
//---assets/：存放图片等静态资源
//---environments/：存放各个环境（如开发环境和生成环境）所需要的配置
//---browserslist：一个目标浏览器的配置文件，用来在不同的前端工具之间共享目标浏览器
//---favicon.ico：网站图标，这样我们就不需要自己手动在html中添加网站图标了，把这个替换掉就行了
//---index.html：网站主页面的html，我们通常不需要怎么编辑它，Angular CLI在构建时会自动把我们写的应用代码和样式等加载到里面
//---karma.conf.js：给karma的单元测试配置，ng test时会用到
//---main.ts：应用程序入口，用JIT 编译器启动根模块AppModule，通常不需要改
//---polyfills.ts：浏览器兼容性处理
//---style.css：全局样式
//---test.ts：单元测试的主入口
//---tsconfig.{app,spec}.json：TypeScript编译器的配置文件，tsconfig.app.json是为应用程序准备的，tsconfig.spec.json是为单元测试准备的
//---tslint.json：代码风格配置