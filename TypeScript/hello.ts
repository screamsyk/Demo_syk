
//============================TypeScript===================================

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

//(6)虽然能用tsc转.ts文件为.js文件，但每次都输入命令多麻烦呀，在VScode中就可以用运行任务的方式，集成下：
//---"查看"-"命令面板"（ctrl+shift+p）-输入"configure task"-选择"构建--对应的tsconfig.json"
//---这时会在工作区.vscode文件夹自动生成一个tasks.json文件


//---------------------------TS特性：类型批注（编译时类型检测）------------------------------

//(1)不带类型批注的函数
function add1(shape, width, height) {
    var area = width * height;
    return "I'm a " + shape + " with an area of " + area + " cm squared.1";
}
document.write(add1("rectangle1", 20, 30) + '<br/>');

//(2)带类型批注的函数
function add2(shape: string, width: number, height: number) {//类型批注用冒号:，前面是变量名，后面是类型（相当于java中的int i这种）
    var area = width * height;
    return "I'm a " + shape + " with an area of " + area + " cm squared.2";
}
document.write(add2("rectangle2", 40, 60) + '<br/>');


//------------------------------TS中的数据类型（支持js中所有的，同时有新增）-------------------------------

//(1)TS中的数据类型（下面也用到了“类型批注”）
{
    let isDone: boolean = true;//boolean，布尔类型
    let num: number = 12;//number，数值类型（和JS一样都是浮点数存储）
    let str: string = "字符串";//string，字符串
    let ms: string = `数量为：${num}`;//string，模板字符串（ES6新增，反引号）
    let list1: number[] = [1, 2, 3, 4];//数组
    let list2: Array<number> = [1, 2, 3, 4];//数组的另一种定义方式
    let tu: [string, number] = ["字符串", 12];//tuple，元组（代表已知元素个数和类型的数组，类型和顺序是一致的，之后还有一个联合类型string|number）
    enum Color { green = 1, orange = 2, balck = 4 };//enum，枚举（enum关键字表明Color是一个枚举类型，为一组数值赋好名字）
    let c: Color = Color.orange;
    let a: any = 4;//any，任意类型值（不进行类型检查，一般使用了类型批注的都会在编译阶段进行类型检查，any类型不检查）
    let v: void = undefined;//void，空值（只能赋值undefined和null），普通函数没有返回值会返回undefined，所以没有返回值的函数也可以用void类型批注
    let un: undefined = undefined;//undefined
    let nu: null = null;//null
}

//(2)类型断言（告诉编译器，数据准确的类型，编译器就不必再进行类型检查了，有点类似类型转换）
{
    let someValue: any = "this is a string";//any任意值
    let num1: number = (<string>someValue).length;//<string>这种尖括号<>写法就是一种类型断言
    let num2: number = (someValue as string).length;//用关键字as是类型断言的另一种形式，而JSX中只支持as，不支持<>
}

//(3)TypeScript中的变量声明可以用ES6中新增的特性let、const、解构赋值等，用法和ES6中的一样


//---------------------------------TS特性：接口interface-------------------------------

//(1)TypeScript的核心原则之一：对值的结构进行类型检查（结构性子类型化），接口的作用就是为这些类型命名。（类型化）
function test1(obj: { name: string }) {//类型批注，可以看出test()函数有个对象参数，而且要求对象参数有一个键为name，类型为string的属性
    console.log(obj.name);
}
//等同于用interface写
interface objType {//接口objType就相当于一个名字，代表含有名称为name且类型为string的属性的对象
    name: string
}
function test2(obj: objType) {//将接口interface作为类型批注
    console.log(obj.name);
}
{
    let o = { name: "张三", height: 172 };
    test1(o);
    test2(o);
}

//(2)interface指定只读属性
interface Point {
    readonly x: number,//用readonly表明属性只读，不可修改
    y: number
}
{
    let p: Point = { x: 10, y: 20 };
    //p.x=5;//会报错，因为不可修改
    let arr: ReadonlyArray<number> = [1, 2, 3];
    //arr[0]=3;//会报错，因为ReadonlyArray把数组置为只读，不可修改
}

//(3)接口interface:作为对象的类型批注
interface Shape {
    type: string,
    width: number,
    readonly height: number,//readonly代表只读属性
    color?: string,//?代表可选属性，这个参数可传可不传
}
function add3(shape: Shape) {
    var area = shape.width * shape.height;
    return "I'm a " + shape.type + " with an area of " + area + " cm squared.3";
}
var shape1 = {
    type: 'rectangle1',
    width: 20,
    height: 30
}
var shape2 = {
    type: 'rectangle2',
    width: 40,
    height: 60,
    color: '#016dcf'
}
document.write(add3(shape1) + '<br/>');
document.write(add3(shape2) + '<br/>');

//(4)接口interface：作为函数的类型批注
interface fnc {
    (name: string, height: number): boolean//描述函数的参数类型和返回值类型
}
let fn3: fnc;
fn3 = function (name: string, height: number) {
    return false;
}

//(5)接口interface：作为数组的类型批注
interface arrType {
    [index: number]: string//b描述索引的类型和值的类型
}
let arr: arrType;
arr = ["bob", "tom"];

//(6)类实现接口（接口interface描述类的公共部分）
{
    interface common {
        type: string;
        run(): any;
    }
    class Animal implements common {//类Animal实现接口common，这样类中必须有接口中的东西
        type: string;
        run() {
            console.log("Animal can run!");
        }
        constructor() {
            this.type = "animal";//接口中的属性必须在构造方法中初始化
        }
    }
}

//(7)接口的继承
{
    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {//一个接口可以继承多个接口
        sideLength: number;
    }

}


//-------------------Lambda表达式，即箭头函数表达式=>------------------------

//(1)传统函数定义
var fn1 = function (x) {
    return x * x;
}

//(2)箭头函数
var fn2 = (x) => x * x;//箭头前的：代表传递进去的参数，箭头后的：代表函数体

//(3)函数中this的指向（箭头函数修复了this的指向）
var obj = {
    objName: '对象名称',
    fn1: function () {
        setTimeout(function () {
            console.log(this.objName)//传统函数中this指向：执行该函数的对象
        }, 10);
    },
    fn2: function () {
        setTimeout(() => console.log(this.objName), 10);//箭头函数中this指向：定义时的对象
    }
}
obj.fn1();//此时this指向window对象
obj.fn2();//此时this指向obj对象


//-----------------------类：typescript支持了ES6中新增的class（实际上也是基于原型prototype的实现方式进行了进一步封装）---------------------------

//(1)定义一个叫animal的类
class animal {

    //以类型批注的形式声明属性，注意是以分号;结束
    public name: string;//公有属性，在任何地方都可以访问
    private color: string;//私有属性，只能在类体中访问
    weight: number;//默认公有

    //定义方法
    run() {
        return "the " + this.color + " dog called " + this.name + " is running with " + this.weight + " weight!";
    }

    //类的构造方法（必须有），this指向实例化后的对象，在构造方法中可以定义属性
    constructor(name, color, weight) {
        this.name = name;
        this.color = color;
        this.weight = weight;
    }
}

//(2)基于类实例化dog对象
var dog = new animal('旺财', "black", 40);
console.log(dog.run());
console.log(dog.name);
console.log(dog.color);
console.log(dog.weight);

//(3)继承类（关键字extends）
class cat extends animal {
    type: string;//新增属性type
    eat() {
        return "I like to eat mouse";
    }
    constructor(name: string, color: string, weight: number, type: string) {
        super(name, color, weight);//super()方法相当于父类的构造方法，而super相当于父类实例this
        this.type = type;
    }
}
var tomCat = new cat('tomcat', "black", 1000, "server");
console.log(tomCat.name);
console.log(tomCat.color);
console.log(tomCat.weight);
console.log(tomCat.type);




//()