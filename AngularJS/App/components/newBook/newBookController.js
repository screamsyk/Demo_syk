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

            //默认
            $scope.totalItems = 7;
            $scope.currentPage = pageNo;
            var data = [
                { NVC_BOOKNAME: '红与黑', VC_BOOKCOVER: 'book001', NVC_AUTHOR: '司汤达', NVC_THEME: '长篇小说/法国', DT_WRITEDATE: '1828-2-29', NVC_INTRODUCTION: '《红与黑》是法国作家司汤达创作的长篇小说，也是其代表作。作品讲述主人公于连是小业主的儿子，凭着聪明才智，在当地市长家当家庭教师时与市长夫人勾搭成奸，事情败露后逃离市长家，进了神学院。经神学院院长举荐，到巴黎给极端保王党中坚人物拉莫尔侯爵当私人秘书，很快得到侯爵的赏识和重用。与此同时，于连又与侯爵的女儿有了私情。最后在教会的策划下，市长夫人被逼写了一封告密信揭发他，使他的飞黄腾达毁于一旦。他在气愤之下，开枪击伤市长夫人，被判处死刑，上了断头台。' },
                { NVC_BOOKNAME: '万历十五年', VC_BOOKCOVER: 'book002', NVC_AUTHOR: '黄仁宇', NVC_THEME: '历史/中国', DT_WRITEDATE: '1997-5-15', NVC_INTRODUCTION: '万历十五年，亦即公元1587年，在西欧历史上为西班牙舰队全部出动征英的前一年；而在中国，这平平淡淡的一年中，发生了若干为历史学家所易于忽视的事件。这些事件，表面看来虽似末端小节，但实质上却是以前发生大事的症结，也是将在以后掀起波澜的机缘。在历史学家黄仁宇的眼中，其间的关系因果，恰为历史的重点，而我们的大历史之旅，也自此开始……' },
                { NVC_BOOKNAME: '苏菲的世界', VC_BOOKCOVER: 'book003', NVC_AUTHOR: '乔斯坦·贾德', NVC_THEME: '长篇小说/西方哲学/挪威', DT_WRITEDATE: '1991-1-21', NVC_INTRODUCTION: '《苏菲的世界》是挪威作家乔斯坦·贾德创作的一本关于西方哲学史的长篇小说，它以小说的形式，通过一名哲学导师向一个叫苏菲的女孩传授哲学知识的经过，揭示了西方哲学史发展的历程。《苏菲的世界》被誉为20世纪百部经典著作之一。《苏菲的世界》1991年首次以挪威文在挪威出版，1996年中国作家出版社推出中译本。' },
                { NVC_BOOKNAME: '人间词话', VC_BOOKCOVER: 'book004', NVC_AUTHOR: '王国维', NVC_THEME: '文学批评/中国', DT_WRITEDATE: '1907-1-11', NVC_INTRODUCTION: '《人间词话》与中国相袭已久之诗话，词话一类作品之体例，格式，并无显著的差别，实际上，它已初具理论体系，在旧日诗词论著中，称得上一部屈指可数的作品。甚至在以往词论界里，许多人把它奉为圭臬，把它的论点作为词学，美学的根据，影响深远。王国维的《人间词话》是晚清以来最有影响的著作之一。 [1]  王国维以“温飞卿之词，句秀也；韦端己之词，骨秀也；李重光之词，神秀也”高度评价了李煜的词，说它“神秀”，韦庄的词被称为“骨秀”，温庭筠的词称作“句秀”。' },
                { NVC_BOOKNAME: '美的历程', VC_BOOKCOVER: 'book005', NVC_AUTHOR: '李泽厚', NVC_THEME: '文艺理论/中国', DT_WRITEDATE: '1981-2-29', NVC_INTRODUCTION: '谈起创作动机，李泽厚解释称：“在很长时间里，大部分的论著把很活泼的文艺创作僵化成了死板的东西，许多文学史与艺术史把文艺创作割碎了。我认为不管是艺术、文学还是美学，都离不开人的命运，也离不开历史。目睹‘文革’的浩劫，更不满足于当时‘僵化’的、被割裂得七零八碎的哲学史、思想史、文学史、艺术史。”...' },
                { NVC_BOOKNAME: '怎样教英语', VC_BOOKCOVER: 'book006', NVC_AUTHOR: '哈默', NVC_THEME: '当代国外语言学与应用语言学文库', DT_WRITEDATE: '2000-1-29', NVC_INTRODUCTION: 'An introduction to the practice of English language teaching How to Teach English is for teachers at an early stage in their careers and for teachers preparing for examinations such as The Certificate in English Language Teaching to Adults or The Certificate in TESOL. This book gives clear examples and explanations of current teaching practice which teachers can put into immediate use. How to Teach English offers: ideas on what makes a good teacher and what makes a good learner descriptions and examples of language teaching methods. and a new model of good leaching practice-the \'ESA\'model an essential introduction to grammar teaching sequences for grammar, vocabulary, and the individual language skills ideas on the exploitation of textbooks and the planning of lessons a \'What if?\' review of common problems in the classroom a Task File of photocopiable training tasks appendices on equipment, further reading and phonetic symbols.' },
                { NVC_BOOKNAME: '实用软件工程', VC_BOOKCOVER: 'book007', NVC_AUTHOR: '孙玮', NVC_THEME: '社科书籍 ， 出版物 ， 书籍', DT_WRITEDATE: '2011-1-1', NVC_INTRODUCTION: '《实用软件工程（第3版）》是普通高等教育“十一五”国家级规划教材的修订版，根据教学反馈和学时要求，对内容做了较大的调整，以期更好地适应教学的需要。《实用软件工程（第3版）》面向工程实践，按照IT企业工作流程安排章节顺序，新版教材共10章，包括软件工程的内容与方法、软件生命周期与开发模型、软件立项与合同、软件需求、软件策划、软件建模、软件设计、软件测试、软件实施与维护和软件管理。《实用软件工程（第3版）》为任课老师免费提供电子课件，并出版有配套实践教材《软件工程实践教程》。《实用软件工程（第3版）》内容新颖、实用性强，案例丰富且教学资源配套，适合作为高校计算机、软件工程、电子信息、信息与计算科学、信息管理与信息系统等专业大学教材，也可作为IT企业培训教材和软件工程师参考读物。' }
            ]
            assignBookInfo(data);

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


    }]);
});