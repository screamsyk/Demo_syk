//--------------类型批注-------------------
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
