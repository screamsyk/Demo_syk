
//========================JavaScript模块化编程思想==================================

//--------------------------基本的js模块化编程的历程----------------------------------

//(1)js本身是不支持类和模块的，所以人们利用js的某些特性来实现模块化，基本的历程如下：
//---原始写法：认为模块就是函数的集合，写几个函数放在一起，就形成模块，但这样污染的全局作用域window，所以不行
function m1() { }
function m2() { }
//---对象写法：为了解决“原始写法”污染全局作用域的问题，于是把函数和变量等模块成员放到一个对象中，这样调用对象的属性，即相当于调用模块的方法。
//------------但这样又有个问题，就是对象的所有属性都是可见的，这样的话一些不想被别人用的属性（如_count）也会被暴露出去，所以也不行
var obj = {
    _count: 0,
    m1: function () { },
    m2: function () { }
}
//---立即执行函数IIFE写法：将属性和方法封装到函数作用域中，返回一个对象，达到不暴露私有变量的目的，这个就是比较可以的写法了，称为JavaScript模块的基本写法
//-----------------------想到这里不会暴露私有变量，那么我们怎样能得到私有变量呢？答案是：闭包
//-----------------------看到这种形式，是不是很容易想到用js模拟实现类的写法，这里的确也是，所以可以说模块就是js中的类，利用特殊的写法形成（之后ES6是支持类和模块的）。
var module1 = (function () {
    var _count = 0;
    var m1 = function () { };
    var m2 = function () { };
    var m3 = function (count) {//闭包，即在函数内部定义的函数，用于读取函数内部的私有变量
        _count = count;
    }
    return {
        m1: m1,
        m2: m2,
        m3: m3
    };
})();

//(2)知道js中模块的基本写法了，即立即执行函数。接下来可以实现模块的继承，如下就实现了module2继承module1
var module2 = (function (module) {
    module.m4 = function () { }//但这么写很明显影响了module1，直接给module1也新增了一个方法m4
    return module
})(module1 || {});//这里为了防置依赖的模块还没有加载，所以设一个默认的空对象

//(3)模块的独立性是很重要的。所以为了在模块内部调用全局变量，最好显式地将全局变量作为模块参数导入进去
var module3 = (function ($, _) {
    //...
})(jQuery, lodash)


//-----------------------------JavaScript模块化规范--------------------------------------

//(1)为了方便模块的使用，模块的书写方式必须一致，所有要有模块化规范，不然每个人写模块的方式都不一样，又怎么相互使用呢

//(2)ES6之前JavaScript并没有官方的模块化规范，但ES6标准提出里JavaScript的模块化规范（export和import关键字）算官方的了，
//---而非官方但很通行的也有很多，所以目前主要有以下5种模块化规范：
//---ES6
//---commonJS
//---AMD
//---CMD
//---UMD

//(3)ES6
//---ES6是ECMA国际标准化组织于2015年6月提出的JavaScript语法标准，新增特性：module模块化，通过关键字export导出，import导入（可以导入非js文件，但目前大多浏览器不支持）
//---ES6模块化认为，一个模块就是一个文件。
//---假设module-A就是一个文件module-A.js，其中可以用export导出变量和函数供其他模块使用
{
    export var a = 1;//导出变量
    export function b() { }//导出函数
    export default function () { }//导出匿名函数（export default就是专门用于导出没有名字的变量的，在import的时候可以随便指定名字）
    export { a, b }//批量导出
}
//---假设module-B就是一个文件module-B.js和module-A.js在同一目录下，可以用import导入module-A提供的变量和函数，只读不可修改（对象除外，因为是传地址）
{
    import { a } from './module-A.js';//导入变量a
    import { a, b } from './module-A.js';//导入变量a和函数b
    import c from './module-A.js';//导入匿名函数，并随便指定名称为c（这里可以看出import没有名字的变量时没有用{}，并且可以随便指定引入后的名字）
    import * as obj from './module-A.js';//导入全部放入一个对象中，并指定对象名称
    import { b as bFn } from './module-A.js';//用as指定引入的变量的别名
    import c, { a } from './module-A.js';//导出匿名函数和变量a，匿名的必须放在前面
}
//---注意import分为两种，一种是导入外部的文件，并立即执行，一种是导入外部的变量或函数等。
{
    import "./module-A.js";//这种不写from，就像引入js文件一样，立即执行。所以我们只想引入文件时，就采用这种
    import * as all from "./module-A.js"//这种导入外部的变量或函数，并不会执行js文件的内容，而是只生成一个动态的只读引用，等到真的需要用到时，再到模块里面去取值
}

//(4)commonJS
//---commonJS是Node.js采用并实现的模块化规范，由一个团队提出的用于服务器端的模块化规范，具体哪个团队不太清楚~v~
//---Node.js是2009年由美国程序员Ryan Dahl创造的，主要是将JavaScript用于服务端的编程，而服务端必须采用模块化编程，所以Node.js的诞生也标志着JavaScript模块化的诞生。
//---在commonJS中模块的加载采用同步的方式，即必须加载好了才能执行之后的代码，所以主要用于服务器端（本地资源加载快），而不是浏览器端（需要网络请求）
//---commonJS认为，每个文件就是一个模块，和ES6的想法一样，不过是通过module.exports对象导出，通过require()函数导入，而且可以加载非JS文件
//---假设module-A就是一个文件module-A.js，模块必须通过module.exports对象导出对外的变量或接口
{
    var a = 1;
    var b = function () { }
    module.exports = {//导出对象
        a: a,
        b: b
    }
}
//---假设module-B就是一个文件module-B.js，与module-A.js在同一目录，可以用全局函数require()来加载模块module-A.js，即加载其中的module.exports对象
{
    var A = require('./module-A.js');//导入对象，这个方法是同步的，这里加载好后，下面的代码才会执行
    A.a;
    A.b();
}
//---这里需要特别说明下require()的用法，因为虽然只有一个参数，但根据参数字符串形式的不同，怎么查找模块是不一样的
{
    require('/module-A.js');//字符串以“/”开头，代表绝对路径，会去加载一个处于绝对路径的模块文件
    require('./module-A.js');//字符串以“./”或者“../”开头，代表相对路径，会去加载一个处于相对路径的模块文件
    require('module-A');//不以“/”“./”“../”等开头，代表要加载一个默认提供的核心模块（Node.js的内置模块，或者通过npm全局安装或局部安装在node_modules中的模块）
    //为啥加载的核心模块是加载的这些呢？
    //当然是因为commonJS规范是被Node.js实现的，require()就是Node.js提供的全局方法，而npm就是Node.js的模块管理工具，当然可以规定加载这些咯
    //像这种情况也可以写成这样：
    require('module1/module1.min.js');//这个应该就是要去node_module中找了，如果找不到就当做相对路径去找
}

//(5)AMD
//---AMD是异步模块加载的规范，区别于commonJS的同步加载，更适用于浏览器端
//---目前实现了AMD规范的主要是RequireJS和curl.js，我们主要讲解RequireJS，为啥呢？它更流行更好用~v~，官网：http://www.requirejs.cn/docs/api.html
//---AMD规范，认为可以通过define()将代码定义为模块，这意味着模块不一定是一个文件，但最好还是一个文件定义一个模块
//---同commonJS类似，用require()加载模块，不过加载的既可以是用define定义的模块文件，也可以是模块代码
//---首先使用define()定义模块
define('moduleName', [], function () {//三个参数，分别是模块名（可省略，默认模块名为所在文件路径，记住不是文件名）、依赖的其他模块、回调函数（函数返回的就是模块的具体内容）
    return {
        a: function () { }
    };
});
//---再用require()异步加载模块，加载的模块可以是模块文件，也可以是模块代码，如果是模块代码则必须先执行define的操作才行
require(['moduleName'], function (moduleName) {
    moduleName.a();
})
//---require本身既是函数又是对象，可以调用它的一些方法如config进行模块的加载配置
require.config({
    baseUrl: '/js',
    paths: {
        "backbone": "vendor/backbone",//模块名:模块路径，用于指定不在baseUrl下面的模块的加载路径
        "underscore": "vendor/underscore"
    },
    shim: {
        "backbone": {//非AMD规范的模块
            deps: ["underscore"],//依赖的其他模块
            exports: "Backbone"//输出的模块名
        },
        "underscore": {
            exports: "_"
        }
    }
});
//---还有一点需要说明，define()和require()中写依赖的模块时，数组中写的始终是模块名，不过要注意模块是匿名模块还是命名模块，这里不注意的话会有坑的
//---匿名模块：即定义模块时没有写模块名，那么默认的模块名就是从根目录baseUrl到模块文件的路径形成的名称（推荐使用匿名模块）
//---命名模块：即定义模块时指定了模块名，那么加载模块时，必须写指定的模块名，而不能写什么相对路径等，如果在不同目录必须在paths中配置路径
//---所以如果看到require(['src/module-A'],function(a){});则说明模块的名称是‘src/module-A’
//---requreJS的模块加载机制是通过添加<script>标签去加载的模块文件，证明可以跨域加载，并且加载即执行，而且只能加载js文件
//---requireJS的具体用法，强烈推荐慕课网：https://www.imooc.com/learn/787

//(6)CMD
//---CMD和AMD很相似，都是用define和require，不过推崇在过程中引入依赖，是为了推广sea.js而提出来的
//---CMD模块写法
define(function (require, exports, module) {
    var a = require('./a');//在过程中引入依赖，依赖就近
    a.doSomething();
    var b = require('./b');
    b.doSomething();
})
//---AMD模块写法
define(['a', 'b'], function (a, b) {//必须在开头写好依赖
    a.doSomething();
    b.doSomething();
});

//(7)UMD
//---UMD规范，主要是用于兼容上面提及的规范，在写模块时，要判断到底采用哪种规范进行写
//---如下，按照UMD规范进行编写模块，那么这个模块就可以兼容各种加载规范了。
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    // 方法
    function a() { }; // 私有方法，因为它没被返回 (见下面)
    function b() { }; // 公共方法，因为被返回了
    function c() { }; // 公共方法，因为被返回了
    // 暴露公共方法
    return {
        b: b,
        c: c
    }
}));
