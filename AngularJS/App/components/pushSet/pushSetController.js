define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('pushSetController', ['$scope', '$cookies', '$http', function ($scope, $cookies, $http) {

        //初始化数据
        $scope.title = "推送设置";
        $scope.pushSet = {}; //推送设置信息集合
        $scope.isExitTelephone = true; //用户是否有手机号
        $scope.isExitEmail = true; //用户是否有邮箱
        $scope.pushSet.pushCycle = "每周一"; //推送周期
        $scope.pushCycles = [//推送周期选项
        {"value": "每周一", "name": "每周一" },
        { "value": "每周二", "name": "每周二" },
        { "value": "每周三", "name": "每周三" },
        { "value": "每周四", "name": "每周四" },
        { "value": "每周五", "name": "每周五" },
        { "value": "每周六", "name": "每周六" },
        { "value": "每周日", "name": "每周日" }
        ];
        var url = "../WebData/USL_pushSet.ashx?"; //后台地址
        var isFirstSet = true; //是否第一次设置，即用户是否进行了推送设置，便于保存时判断要更新还是添加
        //searchPushSet(); //开始查询用户的推送设置信息
        //searchUserInfo(); //查询用户的邮箱和手机号等信息，即用户信息

        //广播“操作列表选项改变”事件
        $scope.$root.$broadcast('optionChange', { 'option': 'pushSet' });

        //定期推送开关事件
        /* $("#setTimeId").bootstrapSwitch({
            onSwitchChange: function (event, state) {
                $scope.pushSet.isUseSetTime = state;
            }
        }); */

        //实时推送开关事件
        /* $("#realTimeId").bootstrapSwitch({
            onSwitchChange: function (event, state) {
                $scope.pushSet.isUseRealTime = state;
            }
        }); */

        //时间选择控件
        $scope.pushSet.pushTime = new Date("2017-04-01 12:00:00");
        $scope.clear = function () {
            $scope.pushSet.pushTime = new Date("2017-04-01 00:00:00");
        }

        //保存推送设置信息
        $scope.savePushSet = function () {
            //参数处理
            var requestParams = {}; //请求参数
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId"); //用户ID
            } else {
                return;
            }
            if (isFirstSet) {
                requestParams.action = "AddPushSet"; //添加
            } else {
                requestParams.action = "UpdatePushSet"; //修改
            }
            switch ($scope.pushSet.isUseSms) {//是否使用手机短信形式（0：否；1：是）
                case true:
                    requestParams.isUseSms = 1;
                    break;
                case false:
                    requestParams.isUseSms = 0;
                    break;
                default:
                    requestParams.isUseSms = 0;
                    break;
            }
            switch ($scope.pushSet.isUseEmail) {//是否使用电子邮件形式（0：否；1：是）
                case true:
                    requestParams.isUseEmail = 1;
                    break;
                case false:
                    requestParams.isUseEmail = 0;
                    break;
                default:
                    requestParams.isUseEmail = 0;
                    break;
            }
            switch ($scope.pushSet.isUseRealTime) {//是否开启实时推送（0：否；1：是）
                case true:
                    requestParams.isUseRealTime = 1;
                    break;
                case false:
                    requestParams.isUseRealTime = 0;
                    break;
                default:
                    requestParams.isUseRealTime = 0;
                    break;
            }
            switch ($scope.pushSet.isUseSetTime) {//是否开启定期推送（0：否；1：是）
                case true:
                    requestParams.isUseSetTime = 1;
                    break;
                case false:
                    requestParams.isUseSetTime = 0;
                    break;
                default:
                    requestParams.isUseSetTime = 0;
                    break;
            }
            requestParams.pushCycle = $scope.pushSet.pushCycle; //推送周期
            requestParams.pushTime = dateFormat($scope.pushSet.pushTime); //推送时间

            //开始请求后台处理
            $http.post(url + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    sweetAlert("success", jsonObj.msg);
                } else {
                    sweetAlert("error", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //查询用户的推送设置信息
        function searchPushSet() {
            var requestParams = { action: "GetPushSet" }; //请求参数
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }
            $http.post(url + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    isFirstSet = false;
                    assignPushSet(jsonObj.data); //给界面的推送信息赋值
                } else {
                    isFirstSet = true; //还未进行设置
                    console.log(jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //查询用户的邮箱和手机号等信息，即用户信息
        function searchUserInfo() {
            var requestParams = { action: "GetUserInfo" }; //请求参数
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }
            $http.post("../WebData/USL_personalInfo.ashx?" + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    if (jsonObj.data.VC_TELEPHONE != null) {
                        $scope.isExitTelephone = true;
                    } else {
                        $scope.isExitTelephone = false;
                    }
                    if (jsonObj.data.VC_EMAIL != null) {
                        $scope.isExitEmail = true;
                    } else {
                        $scope.isExitEmail = false;
                    }
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //给界面的推送信息赋值
        function assignPushSet(data) {
            switch (data.I_SMS) {//是否使用手机短信（0：否；1：是）
                case 0:
                    $scope.pushSet.isUseSms = false;
                    break;
                case 1:
                    $scope.pushSet.isUseSms = true;
                    break;
                default:
                    $scope.pushSet.isUseSms = false;
                    break;
            }
            switch (data.I_EMAIL) {//是否使用电子邮件（0：否；1：是）
                case 0:
                    $scope.pushSet.isUseEmail = false;
                    break;
                case 1:
                    $scope.pushSet.isUseEmail = true;
                    break;
                default:
                    $scope.pushSet.isUseEmail = false;
                    break;
            }
            switch (data.I_REALTIME) {//是否开启实时推送（0：否；1：是）
                case 0:
                    $scope.pushSet.isUseRealTime = false;
                    $("#realTimeId").bootstrapSwitch('state', false); //设置开关关闭
                    break;
                case 1:
                    $scope.pushSet.isUseRealTime = true;
                    $("#realTimeId").bootstrapSwitch('state', true); //设置开关开启
                    break;
                default:
                    $scope.pushSet.isUseRealTime = false;
                    $("#realTimeId").bootstrapSwitch('state', false); //设置开关关闭
                    break;
            }
            switch (data.I_SETTIME) {//是否开启定期推送（0：否；1：是）
                case 0:
                    $scope.pushSet.isUseSetTime = false;
                    $("#setTimeId").bootstrapSwitch('state', false); //设置开关关闭
                    break;
                case 1:
                    $scope.pushSet.isUseSetTime = true;
                    $("#setTimeId").bootstrapSwitch('state', true); //设置开关开启
                    break;
                default:
                    $scope.pushSet.isUseSetTime = false;
                    $("#setTimeId").bootstrapSwitch('state', false); //设置开关关闭
                    break;
            }
            $scope.pushSet.pushCycle = data.NVC_PUSHCYCLE; //推送周期
            $scope.pushSet.pushTime = new Date(data.DT_PUSHTIME.replace("T", " ")); //推送时间，去除日期字符串中的T，以避免小时因时区的关系增加了8小时
        }

        //日期格式化为yy-MM-dd hh24:mm:ss格式
        function dateFormat(newDate) {
            var year = newDate.getFullYear() + "-";
            var month = newDate.getMonth() + 1;
            month = (month < 10) ? ("0" + month + "-") : (month + "-");
            var day = newDate.getDate();
            day = (day < 10) ? ("0" + day) : (day + "");
            var hours = newDate.getHours();
            hours = (hours < 10) ? ("0" + hours + ":") : (hours + ":");
            var minutes = newDate.getMinutes();
            minutes = (minutes < 10) ? ("0" + minutes + ":") : (minutes + ":");
            var seconds = newDate.getSeconds();
            seconds = (seconds < 10) ? ("0" + seconds) : (seconds + "");
            return year + month + day + " " + hours + minutes + seconds;
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