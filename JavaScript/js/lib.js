
//===========标准库==============

//总览：JS标准库中对象类似于Java中的类，如下：（“=>”表示“类似”）
//(1)标准库中的对象=>Java中的类
//(2)标准库中的对象本身=>Java的类的构造方法
//(3)标准库中的对象的静态方法=>Java的类的静态方法
//(4)标准库中的对象的实例方法=>Java的类的公共方法
//(5)标准库中的对象的实例=>Java的类的实例，即对象


//--------------------Object对象（准确来说是Object函数，当然在JS中函数也是对象）-------------------------

//(1)JS中的所有对象都继承自Object对象，包括Object对象自己，都是Object对象的实例
console.log("-----------------Object对象-----------------------");
console.log(typeof Object);//function
console.log(Array instanceof Object);//true
console.log(Object instanceof Object);//true
console.log(window instanceof Object);//true

//(2)Object本身的方法（静态方法）
Object.print = function (o) { console.log(o) };
Object.keys(obj);//遍历对象obj的属性名（只是本身的可枚举的属性名，更常用）
Object.getOwnPropertyNames(obj);//遍历对象obj的属性名（包括不可枚举的属性名如length）


//(3)Object的实例方法（可以被Object对象的实例继承）
Object.prototype.print = function () {
    console.log(this);
};
Object.prototype.valueOf()//返回当前对象对应的值。
Object.prototype.toString()//返回当前对象对应的字符串形式。
Object.prototype.toLocaleString()//返回当前对象对应的本地字符串形式。
Object.prototype.hasOwnProperty()//判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
Object.prototype.isPrototypeOf()//判断当前对象是否为另一个对象的原型。
Object.prototype.propertyIsEnumerable()//判断某个属性是否可枚举。

//(4)Object作为普通函数（Object本身是一个函数，可以将任意值转成对象，如果参数是原始类型的值，则转成对应的包装对象）
var obj = Object();
var obj = Object(undefined);
var obj = Object(null);
obj instanceof Object // true
var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true

//(5)Object作为构造函数，用法类似作为普通函数
var obj = new Object();
//等价于
var obj = {};


//---------------------------Array对象（准确来说也是函数）-----------------------------------

//(1)Array是JS原生对象，同时也是一个构造函数，可以用它来生成新数组
var arr = new Array(1, 2);
//等同于
var arr = [1, 2];

//(2)Array对象的静态方法，即Array的方法
typeof arr // "object"
Array.isArray(arr) // true，判断是不是数组

//(3)Array对象的实例方法，即Array.prototype的方法
arr.join(' | ');//更多可以看菜鸟教程的参考手册


//---------------------包装对象（即原始类型对应的对象Number String Boolean，准确来说也是函数）---------------------------------

//(1)包装类型的实例方法（）
new Number(123).valueOf()  // 123，valueOf转换成对应的原始类型的值
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true
new Number(123).toString() // "123",toString返回对应的字符串形式
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"


//------------------------属性描述对象-----------------------------

//(1)JS为对象的属性提供了一个属性描述对象，每个属性都有对应的描述对象，保存属性的基本信息（属性描述对象的属性称为元属性）
var a = {
    value: 123,//该属性的属性值
    writable: false,//属性值是否可改变
    enumerable: true,//是否可遍历，即枚举（如for...in...   Object.keys()等会跳过不可遍历的属性）
    configurable: false,//是否可以删除、修改该属性，以及该属性的属性描述对象
    get: undefined,//该属性的取值函数
    set: undefined//该属性的存值函数
}

//(2)获取属性的属性描述对象
Object.getOwnPropertyDescriptor(obj, '属性名');//只能获取obj本身的属性，不能获取继承的

//(3)Object.defineProperty方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象
var obj = Object.defineProperty({}, 'p', {
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false
});

//(4)实例对象的propertyIsEnumerable方法返回一个布尔值，用来判断某个属性是否可遍历
var obj = {};
obj.p = 123;
obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false

//(5)控制一个对象的状态，以下方法能实现，但通过增加对象的原型的属性则可以修改
Object.preventExtensions(obj);//方法可以使得一个对象无法再添加新的属性
Object.seal(obj);//方法使得一个对象既无法添加新属性，也无法删除旧属性
Object.freeze(obj);//方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量