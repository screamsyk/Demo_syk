define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('loginController', ['$scope','$state', function ($scope,$state) {

        //动画效果处理
        $(function () {
            $('#login #password').focus(function () {
                $('#owl-login').addClass('password');
            }).blur(function () {
                $('#owl-login').removeClass('password');
            });
        });

        //登录进主页面
        $scope.login=function(){
            $state.go('main.homePage');
        }

    }]);
});