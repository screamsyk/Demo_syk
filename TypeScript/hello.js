"use strict";
//============================TypeScript===================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//(1)TypeScript是微软开发的编程语言，是JavaScript的超集，用法上完全兼容JavaScript，而且ES6规定的JS语法也能在TypeScript中用
//(2)TypeScript遵循ES6的语法，同时添加了基于类的面向对象编程的特性，以及其他一些语法
//(3)Google于2016年9月底发布的Angular2框架（Angular1.0称为AngularJS，Angular2.0及以后称为Angular）也是由TypeScript开发的
//(3)可以说JavaScript实现了ES5的语法，而TypeScript实现了ES6的语法
//(4)TypeScript的优点：
//---遵循ES6规范，是浏览器支持的趋势
//---强大的IDE支持，就是有了类型批注（类型检查）、语法提示、重构（方便修改方法名字等）
//---是Angular2框架的开发语言
//-----------------------------TypeScript编译器compiler-----------------------------------
//(1)之前说了TypeScript遵循ES6规范，由于ES6是2015年发布的，而大多数浏览器并不支持，所以需要转成ES5规范，于是需要一个编译器
//(2)通过TypeScript编译器compiler（之后都简称tsc），将TypeScript代码转成符合ES5规范的JavaScript代码，这样浏览器就能识别了
//(3)在线tsc：http://www.typescriptlang.org/play/index.html（官网上的在线tsc）
//(4)本地tsc：通过Node.js的npm全局安装TypeScript（npm install typescript -g），通过tsc -v检测是否安装成功
//(5)通过tsc命令就能使用typescript 编译器了，如tsc hello.ts就能在hello.ts所在目录下得到一个hello.js文件
//(6)虽然能用tsc转.ts文件为.js文件，但每次都输入命令多麻烦呀，在VScode中就可以用【运行任务】的方式集成下：
//---当然最开始我们使用TypeScript需要创建工程的配置文件，通过tsc --init就可以创建对应的tsconfig.json文件了
//---"查看"-"命令面板"（ctrl+shift+p）-输入"configure task"-选择"构建--对应的tsconfig.json"
//---这时会在工作区.vscode文件夹自动生成一个tasks.json文件
//---"任务"-"运行任务"-选择配置任务时的"构建--对应的tsconfig.json"，就可以把所有的.ts文件都转成对应的.js文件了
//----------------------TS特性：类型批注（编译时类型检测到错误后，只有.ts文件会报错，对于转成的弱类型的.js文件是没有影响的）------------------------------
//(1)基本的类型批注（用冒号:，前面是变量名，后面是类型）
var a = 'sting';
var b = 12;
var c = 13; //默认类型是any，代表任意类型，和js中一样的动态类型
var isMan = true;
function fn(name) {
}
//(2)将自定义类型作为类型批注
{
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        return Person;
    }());
    var person = {
        name: '张三',
        age: 12
    };
}
//------------------------------TS中的数据类型（支持js中所有的，同时有新增）-------------------------------
//(1)TS中的数据类型（下面也用到了“类型批注”）
{
    var isDone = true; //boolean，布尔类型
    var num = 12; //number，数值类型（和JS一样都是浮点数存储）
    var str = "字符串"; //string，字符串
    var ms = "\u6570\u91CF\u4E3A\uFF1A" + num; //string，模板字符串（ES6新增，反引号）
    var list1 = [1, 2, 3, 4]; //数组
    var list2 = [1, 2, 3, 4]; //数组的另一种定义方式
    var tu = ["字符串", 12]; //tuple，元组（代表已知元素个数和类型的数组，类型和顺序是一致的，之后还有一个联合类型string|number）
    var Color = void 0;
    (function (Color) {
        Color[Color["green"] = 1] = "green";
        Color[Color["orange"] = 2] = "orange";
        Color[Color["balck"] = 4] = "balck";
    })(Color || (Color = {}));
    ; //enum，枚举（enum关键字表明Color是一个枚举类型，为一组数值赋好名字）
    var c_1 = Color.orange;
    var a_1 = 4; //any，任意类型值（不进行类型检查，一般使用了类型批注的都会在编译阶段进行类型检查，any类型不检查）
    var v = undefined; //void，空值（只能赋值undefined和null），普通函数没有返回值会返回undefined，所以没有返回值的函数也可以用void类型批注
    var un = undefined; //undefined
    var nu = null; //null
}
//(2)类型断言（告诉编译器，数据准确的类型，编译器就不必再进行类型检查了，有点类似类型转换）
{
    var someValue = "this is a string"; //any任意值
    var num1 = someValue.length; //<string>这种尖括号<>写法就是一种类型断言
    var num2 = someValue.length; //用关键字as是类型断言的另一种形式，而JSX中只支持as，不支持<>
}
//(3)TypeScript中的变量声明可以用ES6中新增的特性let、const、解构赋值等，用法和ES6中的一样
//---------------------------------TS特性：接口interface-------------------------------
//(1)TypeScript的核心原则之一：对值的结构进行类型检查（结构性子类型化），接口的作用就是为这些类型命名。（类型化）
function test1(obj) {
    console.log(obj.name);
}
function test2(obj) {
    console.log(obj.name);
}
{
    var o = { name: "张三", height: 172 };
    test1(o);
    test2(o);
}
{
    var p = { x: 10, y: 20 };
    //p.x=5;//会报错，因为不可修改
    var arr_1 = [1, 2, 3];
    //arr[0]=3;//会报错，因为ReadonlyArray把数组置为只读，不可修改
}
function add3(shape) {
    var area = shape.width * shape.height;
    return "I'm a " + shape.type + " with an area of " + area + " cm squared.3";
}
var shape1 = {
    type: 'rectangle1',
    width: 20,
    height: 30
};
var shape2 = {
    type: 'rectangle2',
    width: 40,
    height: 60,
    color: '#016dcf'
};
document.write(add3(shape1) + '<br/>');
document.write(add3(shape2) + '<br/>');
var fn3;
fn3 = function (name, height) {
    return false;
};
var arr;
arr = ["bob", "tom"];
//(6)类实现接口（接口interface描述类的公共部分）
{
    var Animal = /** @class */ (function () {
        function Animal() {
            this.type = "animal"; //接口中的属性必须在构造方法中初始化
        }
        Animal.prototype.run = function () {
            console.log("Animal can run!");
        };
        return Animal;
    }());
}
//(7)接口的继承
{
}
//-------------------TS实现ES6规范：Lambda表达式，即箭头函数表达式=>------------------------
//(1)传统函数定义
var fn1 = function (x) {
    return x * x;
};
//(2)箭头函数
var fn2 = function (x) { return x * x; }; //箭头前的：代表传递进去的参数，箭头后的：代表函数体
//(3)函数中this的指向（箭头函数修复了this的指向）
var obj = {
    objName: '对象名称',
    fn1: function () {
        setTimeout(function () {
            console.log(this.objName); //传统函数中this指向：执行该函数的对象
        }, 10);
    },
    fn2: function () {
        var _this = this;
        setTimeout(function () { return console.log(_this.objName); }, 10); //箭头函数中this指向：定义时的对象
    }
};
obj.fn1(); //此时this指向window对象
obj.fn2(); //此时this指向obj对象
//-----------------------TS实现ES6规范：类class（实际上也是基于原型prototype的实现方式进行了进一步封装）---------------------------
//(1)定义一个叫animal的类（使用访问控制符public、private、protected）
var animal = /** @class */ (function () {
    //类的构造方法（必须有），this指向实例化后的对象，在构造方法中可以定义属性
    function animal(name, color, type, weight) {
        this.name = name;
        this.color = color;
        this.type = type;
        this.weight = weight;
    }
    //定义方法
    animal.prototype.run = function () {
        return "the " + this.color + " dog called " + this.name + " is running with " + this.weight + " weight!";
    };
    return animal;
}());
//(2)基于类实例化dog对象
var dog = new animal('旺财', "black", "dog", 40);
console.log(dog.run());
console.log(dog.name);
//console.log(dog.color);私有属性不可访问
console.log(dog.weight);
//(3)继承类（关键字extends）
var cat = /** @class */ (function (_super) {
    __extends(cat, _super);
    function cat(name, color, type, weight, sex) {
        var _this = _super.call(this, name, color, type, weight) || this;
        _this.sex = sex;
        return _this;
    }
    cat.prototype.eat = function () {
        return "I like to eat mouse";
    };
    return cat;
}(animal));
var tomCat = new cat('tomcat', "black", "hasDog", 1000, "server");
console.log(tomCat.name);
//console.log(tomCat.color);私有属性不可访问
console.log(tomCat.weight);
//console.log(tomCat.type);受保护的属性不可访问
//----------------------------------TS新特性：函数---------------------------------
//(1)函数的参数可以使用类型批注，指定类型
function fun(name, age) {
    console.log(name + "\u7684\u5E74\u9F84\u662F" + age);
}
fun('小王', 12); //函数调用时，声明了的参数都必须传，而且类型必须一致（如果传的参数数量不对，或者类型不对，就会报错）
//(2)函数的参数可以指定默认值，表示是否必传
function fun2(name, age) {
    if (age === void 0) { age = 0; }
    console.log(name + "\u7684\u5E74\u9F84\u662F" + age);
}
fun2('小米'); //指定了默认值的参数，就可以不必须传了
//(3)用问号?表示参数是否可选，即是否必传（可选参数必须在必填参数后面）
function fun3(a, b, c) {
    if (c === void 0) { c = 12; }
    console.log(a);
}
fun3('hello world'); //这里?和指定默认值，这两种方式，都可以让函数的参数变成不必传
//(4)rset参数和spread操作符（即ES6中的扩展运算符...），可以给函数指定任意参数
function fun4() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    arr.forEach(function (v) { return console.log(v); });
}
fun4(1, 2, 3, 4);
//(5)generator函数（ES6中的生成器函数，但目前TS还不支持）
//--------------------------TS实现ES6规范：模块Module---------------------------
//(1)在TypeScript中，一个文件就是一个模块（这里建立module-A.ts、module-B.ts）
//(2)使用export和import关键字，来导出模块的内容和导入模块的内容
//---------------------------TS新特性：注解（修饰器）-----------------------------------------
//(1)注解与程序逻辑无关，只是用于加上一些说明，供指定的工具和框架使用
//(2)比如Angular2框架中的注解
/* @component({
    selector: 'app-root',
    templateUrl: './app-component.html',
    styleUrl: ['./app-component.css']
})
class AppComponent{//当声明这个类时，注解就告诉angular框架要去加载对应的html和css
    title="Angular framework"
} */
//----------------------------TS新特性：类型定义文件.d.ts文件--------------------------------------
//(1)类型定义文件（.d.ts文件），用来将已有的JavaScript工具包，如jQuery作为模块供TypeScript使用
//(2)可以从github上下载类型定义文件：https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
//(3)也可以通过工具Typings安装类型定义文件：https://github.com/typings/typings
//---使用npm install typings -g，安装typings
//---使用typings search jquery，查找想找的类型定义文件，如jquery
//---使用typings install jquery --save --source dt --global，安装jquery的类型定义文件
