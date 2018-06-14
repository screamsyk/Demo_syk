define(['angular'], function (angular) {
    var app=angular.module('app');
    app.provider('appRouter', ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        this.$get = function () {
            return {};//空服务
        };
        this.initRouter = function () {

            //定义重定向，详细用法参考官网：https://ui-router.github.io/ng1/docs/0.3.1/index.html#/api/ui.router
            $urlRouterProvider
                .when('', '/login')
                .when('/', '/login')
                .when('/main', '/main/homePage')
                .otherwise('/error');

            //定义路由规则
            $stateProvider.state('login', {//登录
                url: '/login',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/login/loginController']);
                    }]
                },
                views: {
                    '': {
                        templateUrl: 'components/login/loginTemplate.html',
                        controller: 'loginController'
                    }
                }
            }).state('main', {//主界面
                url: '/main',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/main/mainController']);
                    }]
                },
                views: {
                    '': {
                        templateUrl: 'components/main/mainTemplate.html',
                        controller: 'mainController'
                    }
                }
            }).state('error', {//访问错误
                url: '/error',
                resolve: {

                },
                views: {
                    '': {
                        templateUrl: 'error.html'
                    }
                }
            }).state('main.homePage', {//首页
                url: '/homePage',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/homePage/homePageController']);
                    }]
                },
                views: {
                    'content': {
                        templateUrl: 'components/homePage/homePageTemplate.html',
                        controller: 'homePageController'
                    }
                }
            }).state('main.newBook', {//新书推荐
                url: '/newBook',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/newBook/newBookController']);
                    }]
                },
                views: {
                    'content': {
                        templateUrl: 'components/newBook/newBookTemplate.html',
                        controller: 'newBookController'
                    }
                }
            }).state('main.personalInfo', {//个人中心
                url: '/personalInfo',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/personalInfo/personalInfoController']);
                    }]
                },
                views: {
                    'content': {
                        templateUrl: 'components/personalInfo/personalInfoTemplate.html',
                        controller: 'personalInfoController'
                    }
                }
            }).state('main.interestOption', {//兴趣选项
                url: '/interestOption',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/interestOption/interestOptionController']);
                    }]
                },
                views: {
                    'content': {
                        templateUrl: 'components/interestOption/interestOptionTemplate.html',
                        controller: 'interestOptionController'
                    }
                }
            }).state('main.pushSet', {//推送设置
                url: '/pushSet',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['components/pushSet/pushSetController']);
                    }]
                },
                views: {
                    'content': {
                        templateUrl: 'components/pushSet/pushSetTemplate.html',
                        controller: 'pushSetController'
                    }
                }
            });
        };
    }]);
});
