//================JavaScript面向对象编程======================

//---------------------面向对象------------------------------

//(1)对象是单个实体的抽象表示。

//(2)对象是个容器，封装了属性和方法

//(3)C、Java、C++中的面向对象编程，都有“类class”的概念，“类”是对象的模板，描述对象的公共特征和行为，“对象”是“类”的实例

//(4)JavaScript中的面向对象体系中没有“类class”，而是基于“原型链prototype”和“构造函数constructor”。（ES6中新增了class，但本质上还是基于后者再封装了下）


//---------------------构造函数constructor---------------------------------

//(1)JS用“构造函数”作为对象的模板，相当于Java中的类，用来描述对象的基本特征，并生成对象。

//(2)构造函数就是普通的函数，不过有自己的特征和用法，为了区别于其他普通函数，一般开头字母大写
var Vehicle = function (name) {
    this.name = name || '无名';
    this.price = 1000;
}

//(3)使用构造函数生成对象，必须要用new命令，执行构造函数，返回一个实例对象
var v = new Vehicle('T-shirt');
v.name;//T-shirt
v.price;//1000
var v2 = new Vehicle;//new命令本身可以执行构造函数，所以不加()也可以，但为了表明这是在调用函数，所以推荐加上()
v2.name;//无名
v2.price;//1000
var v3 = Vehicle();//如果不写new，就会当做普通函数执行，而普通函数没写返回值时，默认返回undefined
v3;//undefined

//(4)new命令的原理
//---先创建一个空对象，作为将要返回的实例对象
//---再将空对象的原型，指向构造函数的prototype属性
//---然后将空对象赋值给构造函数中的this
//---最后执行构造函数内的代码

//(5)构造函数中有return
var Vehicle = function () {
    this.price = 1000;
    return 1000;
};
(new Vehicle()) === 1000;//false,如果return的是一个对象，则new命令也返回这个对象，否则还是返回this对应的对象

//(6)new.target在使用new执行函数时，代表执行的函数，通过它，可以判断是否是在用new调用函数
function newf() {
    console.log(new.target === f);
}
newf() // false
new newf() // true

//(7)用Object.create(obj);使用现有的对象，创建对象
var person1 = {
    name: '张三',
    age: 38,
    greeting: function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
};
var person2 = Object.create(person1);//person2就继承了person1的属性和方法
person2.name // 张三
person2.greeting() // Hi! I'm 张三.


//---------------------------this关键字-------------------------------

//(1)this的含义（this.property=>this代表属性property当前所在的对象，即运行时所属的对象）（ES6新增的箭头函数，其中的this就指向定义时的对象）
//---this只存在于三种位置：全局作用域下（指向window）、构造函数中（指向构造函数生成的对象）、对象的方法中（指向对象的方法被调用时，方法所属的对象）
//---判断this的指向先要看this处于什么位置
function f() {
    return '姓名：' + this.name;
}
var A = {
    name: '张三',
    describe: f
};
var B = {
    name: '李四',
    describe: f
};
A.describe() // "姓名：张三"
B.describe() // "姓名：李四"

//(2)全局作用域下运行，this就指window对象
this === window;//true
function f() {
    console.log(this === window);
}
f() // true

//(3)构造函数中的this，指向实例对象
var Obj = function (p) {
    this.p = p;
};
var o = new Obj('Hello World!');
o.p;// "Hello World!"

//(4)对象中的方法中的this，如果在运行对象的方法时，所在环境不是该对象，则this不指向该对象（ES6新增的箭头函数，其中的this就指向定义时的对象）
// 情况一
(obj.foo = function () {
    console.log(this);
})();
// 等同于
(function () {
    console.log(this);
})();

// 情况二
(false || function () {
    console.log(this);
})();

// 情况三
(1, function () {
    console.log(this);
})();

//(5)避免使用多层this，因为this的指向不定
var o = {
    f1: function () {
        console.log(this);//这里指向对象o（因为这个this在对象o的方法中）
        var that = this;
        var f2 = function () {
            console.log(this);//这里指向对象window（因为这个this只是在一个普通函数中，而不是对象的方法中，普通函数中的this指向顶层对象window）
            console.log(that);//用that固定指向外层this，这样that就指向对象o了（很常用的做法，在vue的使用中就经常用到）
        }();
    }
}
o.f1();

//(6)由于this的指向不定，有时需要固定this的指向，所以可以用函数的call、apply、bind这些方法
var n = 123;
var obj = { n: 456 };

function a(name) {
    console.log(name);
    console.log(this.n);
}
a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj, '你好') // 456，call方法第一个参数代表this指向的对象，之后的代表执行a函数时需要的参数
a.apply(obj, ['你好'])//456，apply方法和call方法类似，唯一区别就是apply用数组传入执行a函数时需要的参数
var d = new Date();
d.getTime() // 1481869925657
var print = d.getTime.bind(d);//bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数，如果不绑定，下面代码由于this指向的对象不是Date就会报错了
print() // 1481869925657


//---------------------------------prototype对象------------------------------------

//(1)大部分面向对象的编程语言，都是通过“类”（class）来实现对象的继承。JavaScript 语言的继承则是通过“原型对象”（prototype）

//(2)由于在构造函数中写对象的属性和方法的话，每次构造对象，都会去新建对应的属性和方法，造成系统资源浪费，应该共享才对，所以就用原型对象prototype来实现共享属性和方法

//(3)JavaScript规定，每个函数都有一个prototype属性，用来表示实例对象的原型对象prototype，原型对象的所有属性和方法都能被“构造函数”生成的实例对象所共享（对于普通函数来说prototype也就没啥用）
function Animal(name) {
    this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'

//(4)原型链（JavaScript规定每个对象都有其原型对象，同时任何对象都可以当做其他对象的原型对象，所以原型对象也有原型对象，这样依次下去就形成了原型链）

//(5)原型链的尽头是null（之前说过JS中的所有对象都继承自Object对象，所以所有对象的原型最终都可以上溯到Object.prototype，而Object.prototype的原型对象是null）
Object.getPrototypeOf(Object.prototype);//null

//(6)每个函数都有prototype属性，指向prototype对象，反过来prototype对象也有属性constructor指向对应的函数
function P() { }
P.prototype.constructor === P // true

//(7)instanceof关键字（判断对象是不是某个构造函数的实例）（原理：检查右边构建函数的prototype属性对应的prototype对象，是否在左边对象的原型链上）
var v = new Vehicle();
v instanceof Vehicle // true
// 等同于
Vehicle.prototype.isPrototypeOf(v)

//(8)Object对象的相关方法（详见阮一峰JavaScript标准参考教程）
var proto = Object.getPrototypeOf(v);//Object.getPrototypeOf方法返回参数对象的原型。这是获取原型对象的标准方法
proto.isPrototypeOf(v) // true,判断该对象是否为参数对象的原型。
var proto2 = v.__proto__;//实例对象的__proto__属性（前后各两个下划线），也可以返回该对象的原型对象


//---------------------------面向对象编程的模式----------------------------

//(1)构造函数的继承（很常见的需求）
function Super() {
    this.lastName = "姓舒"
}
function sub() {
    Super.call(this);//第一步，让子构造方法去调用父构造方法，利用函数的call方法绑定this指向
    this.firstName = "叫运凯"
}
Sub.prototype = Object.create(Super.prototype);//第二步，让子构造方法的prototype属性指向一个空对象，而空对象的原型对象是Super的prototype属性指向的原型对象
Sub.prototype.constructor = Sub;

//(2)JS的模块编程：利用立即执行函数IIFE，将属性和方法封装到函数作用域中，达到不暴露私有变量的目的
var module1 = (function () {
    var _count = 0;
    var m1 = function () {
        //...
    };
    var m2 = function () {
        //...
    };
    return {
        m1: m1,
        m2: m2
    };
})();
