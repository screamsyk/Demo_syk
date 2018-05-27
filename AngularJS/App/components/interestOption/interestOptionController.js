define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('interestOptionController', ['$scope', '$cookies', '$http', function ($scope, $cookies, $http) {

        //初始化数据
        $scope.title = "兴趣选项";
        $scope.interestThemes = []; //保存所有兴趣主题
        $scope.userInterests = []; //保存用户已选的兴趣主题
        var url = "../WebData/USL_interestOption.ashx?"; //后台地址
        searchAll(); //查询所有兴趣主题
        searchUserInterest(); //查询用户已选的兴趣主题

        //广播“操作列表选项改变”事件
        $scope.$root.$broadcast('optionChange', { 'option': 'interestOption' });

        //检查兴趣主题是不是用户已选的兴趣主题
        $scope.isSelected = function (interestTheme) {
            for (var i in $scope.userInterests) {
                if (interestTheme.ID == $scope.userInterests[i].ID) {
                    return true;
                }
            }
            return false;
        }

        //处理已选项点击，isClick属性用于保存时判断要不要删除该用户兴趣
        $scope.dealSelected = function (userInterest) {
            if (userInterest.isClick) {
                userInterest.isClick = false;
            } else {
                userInterest.isClick = true;
            }
        }

        //处理待选项点击，isClick属性用于保存时判断要不要添加该用户兴趣
        $scope.dealNotSelected = function (interestTheme) {
            if (interestTheme.isClick) {
                interestTheme.isClick = false;
            } else {
                interestTheme.isClick = true;
            }

        }

        //点击保存，保存用户兴趣主题
        $scope.saveUserInterest = function () {
            var userInterestsDel = []; //保存即将删除的用户兴趣对应的ID
            var userInterestsAdd = []; //保存即将添加的用户兴趣对应的ID

            //获取即将删除的用户兴趣对应的ID，并用数组保存
            for (var i in $scope.userInterests) {
                if ($scope.userInterests[i].isClick) {
                    userInterestsDel.push($scope.userInterests[i].ID);
                }
            }
            //获取即将添加的用户兴趣对应的ID，并用数组保存
            for (var i in $scope.interestThemes) {
                if ($scope.interestThemes[i].isClick) {
                    userInterestsAdd.push($scope.interestThemes[i].ID);
                }
            }

            //参数
            var requestParams = { action: "SaveUserInterest" };
            requestParams.userInterestsDel = JSON.stringify(userInterestsDel);
            requestParams.userInterestsAdd = JSON.stringify(userInterestsAdd);
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }

            //开始请求
            $http.post(url + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    searchAll(); //查询所有兴趣主题
                    searchUserInterest(); //查询用户已选的兴趣主题
                    sweetAlert("success", jsonObj.msg);
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //查询所有兴趣主题选项
        function searchAll() {
            //参数
            var requestParams = { action: "GetAllInterestTheme" };

            //开始请求
            $http.post(url + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    $scope.interestThemes = jsonObj.data; //兴趣主题赋值
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }

        //查询用户的已选的兴趣选项
        function searchUserInterest() {
            //参数
            var requestParams = { action: "GetUserInterest" };
            if ($cookies.get("userId")) {
                requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }

            //开始请求
            $http.post(url + $.param(requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    $scope.userInterests = jsonObj.data; //用户已选兴趣主题赋值
                    if ($scope.userInterests.length == 0) {//用户未选兴趣主题，则广播消息
                        $scope.$root.$broadcast('isSelect', { 'msg': '请选择您的兴趣选项并开启推送，便于系统推送您感兴趣的图书信息。', 'num': 1 });
                    } else {
                        $scope.$root.$broadcast('isSelect', { 'msg': '暂无相关提醒。','num':0 });
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