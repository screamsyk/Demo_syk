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
//(1)TypeScript是JavaScript的超集，用法上完全兼容JavaScript，而且ES6规定的JS语法也能在TypeScript中用
//---------------------------TS特性：类型批注（编译时类型检测）------------------------------
//(1)不带类型批注的函数
function add1(shape, width, height) {
    var area = width * height;
    return "I'm a " + shape + " with an area of " + area + " cm squared.1";
}
document.write(add1("rectangle1", 20, 30) + '<br/>');
//(2)带类型批注的函数
function add2(shape, width, height) {
    var area = width * height;
    return "I'm a " + shape + " with an area of " + area + " cm squared.2";
}
document.write(add2("rectangle2", 40, 60) + '<br/>');
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
    var c = Color.orange;
    var a = 4; //any，任意类型值（不进行类型检查，一般使用了类型批注的都会在编译阶段进行类型检查，any类型不检查）
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
//(1)TypeScript的核心原则之一：对值的结构进行类型检查（结构性子类型化），接口的作用就是为这些类型命名。
{
    function test(obj) {
        console.log(obj.name);
    }
    var o = { name: "张三", height: 172 };
    test(o);
} //等同于用interface写
{
    function test(obj) {
        console.log(obj.name);
    }
    var o = { name: "张三", height: 172 };
    test(o);
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
//(4)类实现接口（接口interface描述类的公共部分）
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
//(5)接口的继承
{
}
//-------------------Lambda表达式，即箭头函数表达式=>------------------------
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
//-----------------------类：typescript支持了ES6中新增的class（实际上也是基于原型prototype的实现方式进行了进一步封装）---------------------------
//(1)定义一个叫animal的类
var animal = /** @class */ (function () {
    //类的构造方法（必须有），this指向实例化后的对象，在构造方法中可以定义属性
    function animal(name, color, weight) {
        this.name = name;
        this.color = color;
        this.weight = weight;
    }
    //定义方法
    animal.prototype.run = function () {
        return "the " + this.color + " dog called " + this.name + " is running with " + this.weight + " weight!";
    };
    return animal;
}());
//(2)基于类实例化dog对象
var dog = new animal('旺财', "black", 40);
console.log(dog.run());
console.log(dog.name);
console.log(dog.color);
console.log(dog.weight);
//(3)继承类（关键字extends）
var cat = /** @class */ (function (_super) {
    __extends(cat, _super);
    function cat(name, color, weight, type) {
        var _this = _super.call(this, name, color, weight) || this;
        _this.type = type;
        return _this;
    }
    cat.prototype.eat = function () {
        return "I like to eat mouse";
    };
    return cat;
}(animal));
var tomCat = new cat('tomcat', "black", 1000, "server");
console.log(tomCat.name);
console.log(tomCat.color);
console.log(tomCat.weight);
console.log(tomCat.type);
//()
