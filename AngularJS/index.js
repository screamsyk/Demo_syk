
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
//---如果在页面中没有写ng-app="myApp"，也可以通过如angular.bootstrap(document.body,['myApp'])来启动

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
myApp.controller('myController4', ['$scope', '$filter', function ($scope, $filter) {
    $scope.time = new Date().getTime();//获取当前时间，可以用AngularJS只带的时间过滤器，进行显示过滤
    $scope.str = "AbCd";//字符串过滤
    $scope.age = [12, 13, 14, 18, 20, 21];
    $scope.str_lower = $filter('lowercase')($scope.str);//这里可以用$filter在控制器中直接调用过滤器
}])
myApp.filter('isAdult', function () {//自定义过滤器，判断年龄大小，是否成年
    return function (value) {//value就是要过滤的值
        if (value >= 18) {
            return '成年了';//return的值就是过滤后得到的值
        } else {
            return '未成年';
        }
    }
})

//(6)AngularJS服务（主要用来存储在AngularJS整个生命周期都需要存在的数据，service是一个值或者对象，提供特定的方法供使用，AngularJS内置了30多个服务，）
myApp.controller('myController5', ['$scope', '$location', 'myService1', 'myService2', function ($scope, $location, myService1, myService2) {
    $scope.windowUrl = location.href;
    $scope.url = $location.url();//$location就是AngularJS内置的服务，用于获取路由信息，其他还有很多如$http、$timeout、$interval、
    $scope.service = myService1.getName();//用自定义服务的方法
    $scope.service2 = myService2.name;
}])
myApp.service('myService1', function () {//自定义服务，方法一：service()方法，类似构造函数，得到一个对象名称为myService
    this.getName = function () {
        return "用service自定义的服务";
    }
});
myApp.factory('myService2', function () {//自定义服务，方法二：factory()方法，return的对象就是服务
    return {
        name: '用factory自定义的服务'
    }
});
myApp.provider('myService3', function () {//自定义服务，方法三：provider()方法，利用提供者的$get()方法创建服务，第二个参数可以是对象、函数、数组，创建提供者，
    this.$get = function () {//提供者是一个具有$get()方法的对象
        return {};//$get()方法return的对象就是服务myService3，而服务的提供者则是“myService3Provider”，服务名加上“Provider”
    };
    this.init = function () {

    }
})
myApp.constant('myService4', '常量');//自定义服务，方法四：constant()方法，这个服务就只是一个值，在Angluar的整个生命周期都存在
myApp.value('myService5', '值');//自定义服务，方法五：value()方法，与constant()方法的区别在与，constant定义的可以在配置config()方法中使用

//(7)AngularJS指令（有很多内置指令，如ng-app ng-click等，我们也可以自定义指令，函数返回一个对象）
myApp.directive('myDirective1', function () {//指令一：作为html元素使用，使用时，采用标签名为my-directive1的形式
    return {
        restrict: 'E',//‘E’代表作为html元素使用
        template: '<div>这是一个自定义指令，检查element时还看得到my-directive1标签名</div>',//指令的显示内容
    }
})
myApp.directive('myDirective2', function () {//指令二：作为html元素使用，而且看不到指令标签名称
    return {
        restrict: 'E',//‘E’代表作为html元素使用
        replace: true,//要不要用template完全替换掉指令，即看不到指令标签名了
        template: '<div>这是一个自定义指令，检查element时看不到到my-directive2标签名</div>',//指令的显示内容
    }
})
myApp.directive('myDirective3', function () {//指令三：作为不同的效果使用
    return {
        restrict: 'EACM',//E:元素,A:属性,C:类,M注释（推荐A属性，因为它有更好的浏览器兼容性）（M注释基本不用，我也没看懂，用不来）
        replace: true,
        template: '<div>这是一个自定义指令，作为不同的效果使用</div>',
    }
})
myApp.directive('myDirective4', function () {//指令四：向指令中传递参数
    return {
        restrict: 'E',
        replace: true,
        template: '<div>带参数的指令，参数一：{{argOne}}，参数二：{{argTwo}}</div>',
        scope: {
            argOne: '@attrOne',//最好都用驼峰式命名，这样表明指令作用域中的变量argOne的值，就是attr-one属性对应的值
            argTwo: '@attrTwo',//用@，默认属性名和变量名一致，但这里指定了属性名，指令作用域于父作用域存在双向数据绑定
        }
    }
})
myApp.directive('myDirective5', function () {//指令五：完整的配置项说明
    return {
        restrict: 'EACM',//sting：使用方式：E:元素,A:属性,C:类,M注释
        replace: true,//boolean/string：默认false，是否完全不显示指令标签，或者用指定的内容替换指令标签，如用'<div></div>'替换<my-directive></my-directive>
        priority: 1,//number：优先级，默认0，声明了同名的指令时，谁先被调用
        terminal: true,//boolean：是否只运行优先级大于等于本身的指令
        template: '<div>带参数的指令，参数一：{{argOne}}，参数二：{{argTwo}}</div>',//string/function，html模板
        templateUrl: '',//string，html模板路径
        scope: {//boolean/object：指令作用域，默认false，公用父作用域，为true时代表从父作用域继承并创建新的作用域
            a: '@',//隔离作用域，就是scope对应一个对象，而对象的属性就是指令作用域中的变量，$scope.a的值也就为属性a对应的值
            b: '@attrTwo',//绑定策略：@，将值绑定到指令作用域中
            c: '=attrThree',//绑定策略：=，将值绑定到父作用域中，实现指令作用域和父作用域数据双向绑定
            d: '&attrFour',//绑定策略：&，将方法绑定到父作用域中，实现使用父作用域中的方法
        },
        transclude: false,//boolean，默认false，嵌入通常用来复用组件，但基本不用
        constroller: function ($scope, $element, $attrs, $transclude) {//function/string，控制器，可以是定义了的控制器的名称

        },
        constrollerAs: '',//string，设置控制器的别名，并以此名注册控制器
        require: 'ngModal',//string/array，字符串代表另一个指令的名字，会将控制器注入到对应的指令中，并作为link的第四个参数，如这里指令就之后看指令作用域中ng-modal属性，而不会去看angular内置的
        link: function (scope, iElement, iAttrs) {//function（scope:指令作用域,iElement:指令这个html元素对象,iAttrs:指令的html属性）
            //使用link可以创建操作DOM的函数
        },
        compile: function (tElement, tAttrs, transclude) {//function（返回一个对象或者链接函数）

        }
    }
})

//(8)AngularJS应用的加载配置（主要体现在路由配置）
myApp.config([function ($routerProvider) {//配置必须使用提供者provider，所以要配置服务，必须用myApp.provider()方法创建服务

}]);

//(9)AngularJS应用运行
myApp.run(function () {//当配置好后，run()方法是最先执行的，所以经常用来验证用户是否登录

});
