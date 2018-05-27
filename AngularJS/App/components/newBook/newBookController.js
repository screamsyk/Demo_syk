define(['angular'], function (angular) {
    var app = angular.module('app');
    app.controller('newBookController', ['$scope', '$cookies', '$http', function ($scope, $cookies, $http) {

        //初始化数据
        $scope.title = "图书推荐";
        $scope.isExistBook = false; //是否查询出图书信息
        $scope.bookInfosOne = []; //保存图书信息集合一，即前三本图书
        $scope.bookInfosTwo = []; //保存图书信息集合二，即后三本图书，这样是为了前端页面的显示不会上下交错
        $scope.requestParams = {}; //请求参数
        var url = "../WebData/USL_newBook.ashx?"; //后台地址

        //广播“操作列表选项改变”事件
        $scope.$root.$broadcast('optionChange', { 'option': 'newBook' });

        //分页条
        $scope.totalItems = 6;
        $scope.currentPage = 1;


        //查询图书列表
        $scope.search = function (pageNo) {
            //参数
            $scope.requestParams.action = "GetBookInfo";
            $scope.requestParams.pageNo = pageNo;
            if ($cookies.get("userId")) {
                $scope.requestParams.userId = $cookies.get("userId");
            } else {
                return;
            }

            //调整页面显示
            $scope.currentPage = pageNo;

            //开始请求
            $http.post(url + $.param($scope.requestParams)).then(
            function success(response) {
                var jsonObj = response.data;
                if (jsonObj.success == true) {
                    $scope.totalItems = jsonObj.data.totalItems; //总数
                    assignBookInfo(jsonObj.data.data); //图书信息集合赋值
                } else {
                    sweetAlert("warning", jsonObj.msg);
                }
            },
            function error(data) {
                sweetAlert("error", "网络出错");
            });
        }
        $scope.search(1); //开始查询图书信息列表

        //回车键搜索
        $scope.myKeyup = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.search(1);
            }
        }

        //日期格式化为yy-MM-dd格式
        $scope.dateFormat = function (str_date) {
            var newDate = new Date(str_date);
            var year = newDate.getFullYear() + "-";
            var month = newDate.getMonth() + 1;
            month = (month < 10) ? ("0" + month + "-") : (month + "-");
            var day = newDate.getDate();
            day = (day < 10) ? ("0" + day) : (day + "");
            return year + month + day;
        }

        //图书信息集合赋值
        function assignBookInfo(bookList) {
            $scope.bookInfosOne = [];
            $scope.bookInfosTwo = [];
            if (bookList.length > 0) {
                $scope.isExistBook = true;//存在图书
            } else {
                $scope.isExistBook = false;//不存在图书
            }
            if (bookList.length <= 3) {
                for (var i in bookList) {
                    $scope.bookInfosOne[i] = bookList[i]; //图书集合一，前三本图书
                }
            } else {
                for (var i = 0; i < 3; i++) {
                    $scope.bookInfosOne[i] = bookList[i]; //图书集合一，前三本图书
                }
                for (var i = 3; i < bookList.length; i++) {
                    $scope.bookInfosTwo[i - 3] = bookList[i]; //图书集合二，后三本图书
                }
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