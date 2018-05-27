define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('mainController', ['$scope', '$cookies', '$http', '$state', function ($scope, $cookies, $http, $state) {

        //判断是否登录
        if ($cookies.get("userId")) {//已登录
            $scope.name = $cookies.get("name"); //姓名
            $scope.sex = $cookies.get("sex"); //性别（0：男；1：女）
        } else {
            $state.go("login"); //未登录则跳转到登录界面
        }

        //初始化数据
        $scope.option = "homePage";
        $scope.isFullScreen = false; //是否全屏
        $scope.remindNum = 0; //消息提醒的个数
        var remindMsg = "暂无相关提醒。"; //提醒的消息
        var remindContent = ""; //提醒的内容框架html

        searchUserInterest(); //查询用户的已选的兴趣选项，以确定是否提醒用户进行兴趣选项配置

        //广播事件处理
        $scope.$on('optionChange', function (scope, data) {//接收"操作列表选项改变"事件，从而修改对应class和颜色
            $scope.option = data.option;
        });

        $scope.$on('isSelect', function (scope, data) {//接收"是否选择兴趣主题"事件，从而在提醒框中显示提醒消息
            remindMsg = data.msg;
            $scope.remindNum = data.num;
        });

        //退出登录
        $scope.logout = function () {
            $cookies.remove('name');
            $cookies.remove('userId');
            $cookies.remove('sex');
            $state.go("login");
        }

        //点击提醒，查看消息
        $scope.remind = function () {
            setRemindContent(remindMsg);
            layer.open({
                type: 4,
                tips: [3, "#ffffff"],
                area: "200px",
                content: [remindContent, "#remindId"],
                closeBtn: 2,
                shade: 0
            })
        }

        //开启全屏
        $scope.launchFullScreen = function () {
            $scope.isFullScreen = true;
            var element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
        }

        //退出全屏
        $scope.exitFullScreen = function () {
            $scope.isFullScreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        //监测全屏的变化
        window.onresize = function () {
            var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
            if (fullscreenEnabled && fullscreenElement) {
                $scope.$apply(function () {//使用$apply手动告诉angularJS数据发生改变
                    console.log('进入全屏');
                    $scope.isFullScreen = true;
                });
            } else {
                $scope.$apply(function () {
                    console.log('退出全屏');
                    $scope.isFullScreen = false;
                });
            }
        }

        //设置提醒的内容框架html和提醒的消息
        function setRemindContent(remindMsg) {
            remindContent = "<div style='font-family:微软雅黑;color:#000;margin-bottom:10px'>\
                                 <div style='border-bottom:1px solid #eef1f5;padding:5px 0;color:#32c5d2'>操作提示</div>\
                                 <div style='border-bottom:1px solid #eef1f5;padding:10px'>" + remindMsg + "</div>\
                             </div>";
        }

        //查询用户的已选的兴趣选项，以确定是否提醒用户进行兴趣选项配置
        function searchUserInterest() {
            //参数
            var requestParams = { action: "GetUserInterest" };
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }

            //开始请求
            $http.post("../WebData/USL_interestOption.ashx?" + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    if (jsonObj.data.length == 0) {//用户未选兴趣主题
                        remindMsg = "请选择您的兴趣选项并开启推送，便于系统推送您感兴趣的图书信息。";
                        $scope.remindNum = 1;
                    } else {//用户选了兴趣主题
                        remindMsg = "暂无相关提醒。";
                        $scope.remindNum = 0;
                    }
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //提示弹框
        function sweetAlert(type, text) {
            swal({
                title: "",
                text: text,
                type: type,
                showCancelButton: false,
                confirmButtonText: "确认"
            });
        }

    } ]);
});
