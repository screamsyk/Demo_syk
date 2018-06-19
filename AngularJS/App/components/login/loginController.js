define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('loginController', ['$scope', function ($scope) {

        //动画效果处理
        $(function () {
            $('#login #password').focus(function () {
                $('#owl-login').addClass('password');
            }).blur(function () {
                $('#owl-login').removeClass('password');
            });
        });

    }]);
});