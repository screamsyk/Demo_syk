
//==========================AngularJS=============================

//(1)AngularJS是由Google公司开发的前端MVVM框架Angular的1.x版本，由于Angular 2.0及以后的版本与1.x版本的差异太大，两者就完全分开了

//(2)Angular 1.x版本称为AngularJS，Angular2.0版本及以后都称为Angular

//(3)可以通过npm下载安装AngularJS（npm install angular@1.4.0 --save）注意版本一定要是1.x版本

//(4)在html引入angular.min.js后就可以开始使用了


//------------------------最基础的AngularJS应用（index1.html）----------------------------

//(1)最基础的就是只用ng-app指令，指定从某个元素开始，这里就是angular应用了，可以用angular的一些方法策略了


//------------------------带控制器的AngularJS应用（index2.html）-----------------------------------

//(1)创建AngularJS应用
//---用angular.module()方法创建AngularJS应用时，第一个参数就是ng-app的值，并且必须传第二个参数，表示依赖的模块的数组
//---如果不传第二个参数，则代表获取一个已存在的名称为"myApp"的AngularJS应用
var myApp = angular.module('myApp', []);

//(2)创建控制器
//---用controller()方法创建的控制器，第一个参数就是控制器名称（即ng-controller的值）
//---第二个参数是依赖的服务的名称数组，而数组的最后一个元素就是对应的控制器
myApp.controller('myController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.behavior = "hello!";//$scope是一个对象，代表数据模型，也代表作用域，存储控制器的数据，用于绑定到html上
    $rootScope.root = "hello! $rootScope";//$rootScope是AngularJS应用的根作用域，其他每个控制器的作用域中都可以用$rootScope中的东西
}]);

//(3)每个AngularJS应用只有一个ng-app，但可以有多个ng-controller，而且controller可以层层嵌套
myApp.controller('myController2', ['$scope', function ($scope) {
    $scope.behavior = "bye bye";
}])

//(4)ng-modal实现双向数据绑定
myApp.controller('myController3', ['$scope', function ($scope) {
    $scope.inputText = "bye bye";//用ng-init可以初始化值，也可以在对应的控制器中初始化值，但ng-init优秀级更高
    $scope.list = ["元素1", "元素2", "元素3", "元素4"];
}])

//(5)AngularJS过滤器（有很多自带的如时间date，还可以自定义过滤器）
myApp.controller('myController4', ['$scope', function ($scope) {
    $scope.time = new Date().getTime();//获取当前时间，可以用AngularJS只带的时间过滤器，进行显示过滤
    $scope.str = "AbCd";//字符串过滤
    $scope.age = [12, 13, 14, 18, 20, 21];
}])
myApp.filter('isAdult', function () {//自定义过滤器，判断年龄大小，是否成年
    return function (value) {
        if (value >= 18) {
            return '成年了';
        } else {
            return '未成年';
        }
    }
})

//(6)AngularJS服务（service是一个函数或者对象，提供特定的方法供使用，AngularJS内置了30多个服务）
myApp.controller('myController5', ['$scope', '$location', 'myService1', function ($scope, $location, myService1) {
    $scope.windowUrl = location.href;
    $scope.url = $location.url();//$location就是AngularJS内置的服务，用于获取路由信息，其他还有很多如$http、$timeout、$interval、
    $scope.service = myService1.getName();//用自定义服务的方法
}])
myApp.service('myService1', function () {//自定义服务，方法一：service()方法，类似构造函数，得到一个对象名称为myService
    this.getName = function () {
        return "用service自定义的服务";
    }
});
myApp.provider('myService2', function () {//自定义服务，方法二：provider()方法
    this.$get = {};
    this.init = function () {

    }
})