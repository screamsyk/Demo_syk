
//-------------------------模块化代码（采用requireJS实现的AMD规范）-----------------------------

//(1)将angualr作为一个模块
define('angular', function () {
    return angular//返回值就是当其他模块依赖该模块时，可以调用的变量（这里的angular是引入的angular.min.js提供的全局对象）
});

//(2)将AngularJS应用作为一个模块
define('app', ['angular'], function (angular) {//这里就依赖了我们上面定义的angular模块
    var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngCookies', 'ui.bootstrap','oitozero.ngSweetAlert']);//创建AngularJS应用，依赖于angualr的module（ui.router）等
    return app;
});

//(3)将AngularJS应用的配置（主要是路由配置）作为一个模块
define('appConfig', ['app', './router'], function (app) {

    //配置ocLazyLoad懒加载，js的加载方式，以及问题显示
    app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            jsLoader: 'requirejs',
            debug: true
        });
    }]);

    //配置webpack+ocLazyLoad懒加载，动态注册下面的定义，不然像控制器controller在懒加载时会说未注册
    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    }]);

    //配置AngularJS路由
    app.config(['$locationProvider', 'appRouterProvider', function ($locationProvider, appRouterProvider) {
        $locationProvider.hashPrefix('');//避免地址栏url中出现#!
        appRouterProvider.initRouter();//appRouterProvider就是在模块router中创建的服务appRouter的提供者，可以加入config中进行配置
    }]);

    //在AngularJS应用启动成功时输出
    app.run(function () {
        console.log('启动AngularJS应用成功！');
    });
});


//-------------------------启动Angular应用-------------------------------

require(['angular', 'app', 'appConfig'], function (angular) {
    console.log('开始启动');
    angular.bootstrap(document.body, ['app']);//可以用angular.bootstrap指定angularJS应用入口，也可以用ng-app指定
});