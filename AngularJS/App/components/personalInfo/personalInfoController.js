define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('personalInfoController', ['$scope', '$cookies', '$http', function ($scope, $cookies, $http) {

        //初始化数据
        $scope.title = "个人中心";
        $scope.contentTitle = "个人信息阅览";
        $scope.isEdit = false;
        $scope.user = {}; //保存用户信息
        $scope.requestParams = {}; //保存请求参数
        var url = "../WebData/USL_personalInfo.ashx?"; //后台地址
        searchUserInfo(); //根据用户id查询用户信息

        //广播“操作列表选项改变”事件
        $scope.$root.$broadcast('optionChange', { 'option': 'personalInfo' });

        //点击编辑
        $scope.startEdit = function () {
            $scope.isEdit = true;
            $scope.contentTitle = "个人信息编辑";
            if ($scope.user.telephone == null) {
                $scope.requestParams.telephone = "";
            } else {
                $scope.requestParams.telephone = $scope.user.telephone; //给手机号编辑框赋值
            }
            if ($scope.user.email == null) {
                $scope.requestParams.email = "";
            } else {
                $scope.requestParams.email = $scope.user.email; //给邮箱编辑框赋值
            }
        }

        //点击取消
        $scope.cancelEdit = function () {
            $scope.isEdit = false;
            $scope.contentTitle = "个人信息阅览";
        }

        //点击保存
        $scope.startSave = function () {

            if (check() == false) {
                return;
            }

            $scope.requestParams.action = "UpdateUserInfo";
            if ($cookies.get("userId")) {
                $scope.requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }
            $http.post(url + $.param($scope.requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    $scope.contentTitle = "个人信息阅览";
                    $scope.isEdit = false;
                    searchUserInfo();
                    sweetAlert("success", "保存成功");
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //根据用户id查询用户信息
        function searchUserInfo() {
            var requestParams = { action: "GetUserInfo" }; //请求参数
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }
            $http.post(url + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    assignUserInfo(jsonObj.data); //给用户信息赋值
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //给用户信息赋值
        function assignUserInfo(data) {
            $scope.user.name = data.NVC_NAME;
            $scope.user.nation = data.NVC_NATION;
            $scope.user.birthplace = data.NVC_BIRTHPLACE;
            $scope.user.education = data.NVC_EDUCATION;
            $scope.user.grade = data.I_GRADE;
            $scope.user.profession = data.NVC_PROFESSION;
            $scope.user.telephone = data.VC_TELEPHONE;
            $scope.user.email = data.VC_EMAIL;
            $scope.user.sex = data.I_SEX;
        }

        //检测手机号和邮箱
        function check() {
            if ($scope.requestParams.telephone != "" && $scope.requestParams.telephone.match(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/) == null) {
                layer.open({
                    type: 4,
                    tips: [3, "#ff9911"],
                    time: 3000,
                    content: ["手机号格式不正确", "#telephoneId"],
                    closeBtn: 0,
                    shade: 0
                });
                return false;
            }
            if ($scope.requestParams.email == null) {
                layer.open({
                    type: 4,
                    tips: [3, "#ff9911"],
                    time: 3000,
                    content: ["邮箱格式不正确", "#emailId"],
                    closeBtn: 0,
                    shade: 0
                });
                return false;
            } else if ($scope.requestParams.email != "" && $scope.requestParams.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) == null) {
                layer.open({
                    type: 4,
                    tips: [3, "#ff9911"],
                    time: 3000,
                    content: ["邮箱格式不正确", "#remindId"],
                    closeBtn: 0,
                    shade: 0
                });
                return false;
            }
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