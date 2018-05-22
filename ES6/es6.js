
//-----------------------什么是ECMAScript---------------------------

//(1)ECMAScript是欧洲计算机制造商协会（英文名European Computer ManufacturersAssociation）标准化后的语言规范，规定了Javascript的最基础的部分

//(2)ECMAScript定义了很多Javascript很重要的东西：
//---语法：解析规则、关键字、语句、声明、操作
//---类型：布尔型、数字、字符串、对象等
//---原型链和继承
//---内置对象和函数的标准库：JSON、数字（Math）、数组方法、对象内省的方法等等

//(3)ES6就是ECMAScript 6的缩写，代表ECMAScript的第6个版本
//---ES1：1996年11月，Netscape公司将JavaScript交给国际标准化组织ECMA，第二年，ECMA发布ECMAScript，即ES1
//---ES2：1998年6月，ECMAScript 2.0发布
//---ES3：1999年12月，ECMAScript 3.0发布，成为Javascript的通用标准
//---ES4：2007年10月，ECMAScript 4.0草案发布，由于该版本对3.0做了大幅升级，而Yahoo、Microsoft、Google等公司反对大幅升级，所以ES4的开发中止了
//---ES5：2009年12月，ECMAScript 5.0发布
//---ES6：2015年6月，ECMAScript 6.0发布，成为目前浏览器支持的通用国际标准
//---ES7：2016年，ECMAScript7.0发布
//---ES8：2017年，ECMAScirpt8.0发布

//(4)ECMAScript是JavaScript的基础标准部分，ES6是目前多数浏览器都支持的标准，而ES8是它的最新一代的标准（现在ES9也出来了，但还没有正式发布）


//----------------------------let关键字-----------------------------------

//(1)let用来声明变量，提供块级作用域，以弥补var关键字的不足一：只有全局作用域和函数作用域，没有块级作用域
var arr = []
for (var i = 0; i < 10; i++) {
    arr[i] = function () {
        console.log(i);
    }
}
arr[8]();//10，因为var声明的变量只有全局作用域和函数作用域，所以这里的i是全局变量，会影响到每次循环的i值，因此在执行方法时，i已经是10了，所以输出了10

for (let i = 0; i < 10; i++) {
    arr[i] = function () {
        console.log(i);
    }
}
arr[8]();//8，因为let声明的变量属于块级作用域，即for循环的每个区块{}，所以这里的i，每个都属于循环时的各个块级作用域中，不相互影响，所以还是8

//(2)let不存在变量提升，也算提醒我们平时要养成先定义再使用的好习惯
var a = 1;
(function () {
    console.log(a);//undefined，因为var存在变量提升，所以这里相当于var a;console.log(a);a=2;
    var a = 2;
})();
(function () {
    //console.log(a);//a is not defined，因为let关键字定义的变量属于块级作用域，不受全局作用域的a影响，而且不存在变量提升，所以这里a就报错了
    //可能很多人就觉得奇怪了，就算不存在变量提升，那么console.log(a);也该先于let a=2;执行，这样a也该是全局的1才对呀
    //解释：之前也说过JS引擎会先获取所有变量的声明，并把所有var声明的变量放到代码头部，再执行，而这里也一样，JS引擎也会先获取所有变量的声明，所以let先执行，只是没有变量提升而已
    let a = 2;
})();

//(3)注意：
//---在同个块级作用域中，不允许用let声明已经声明过的变量
//---函数内不能用let重新声明函数的参数

//(4)let总结：
//---用let声明的变量，只在块级作用域中起作用，适合在for循环中使用
//---用let声明的变量不存在变量提升，所以要先定义再使用
//---同个代码块内，不能用let重复声明相同的变量
//---函数内不能用let重新声明函数的参数


//----------------------------const关键字-------------------------------

//(1)const是constant（常量）的缩写，用于声明常量
if (1) {
    const name = "常量";//声明常量时，一定要赋值
    //name="改变常量";//错误：不可再修改
}
//console.log(name);//错误：const声明的常量也属于块级作用域

//(3)const总结：
//---const用于声明常量，并且声明和赋值必须一起，不可修改
//---const和let一样，声明的变量只在块级作用域起作用，不会变量提升，不能重复声明同一个变量等
//---用const声明引用类型的常量时，要注意的是这个是传址赋值，所以只要地址没变，内容变不变都没关系


//----------------------------ES6浏览器兼容性问题---------------------------------------

//(1)浏览器兼容性问题：有很多浏览器先于ES6发布，所以有的浏览器不能解析ES6的语法，这是就需要工具把ES6转成ES5（如babel、jsx、traceur、es6-shim等）

//(2)目前还没有一款工具能把ES6的新特性完美地转换为ES5，但babel还是一个不错的选择，对ES6支持度较高，使用广泛

//(3)安装babel
//---npm install babel-core@5;//使用Node.js的npm工具安装babel很方便，指定版本5，这样更方便找到想要的东西

//(4)安装好后，将里面的browser.min.js引入html文件，并设置<script>标签的type为“text/babel”，这样低版本浏览器也能识别ES6的语法了


//--------------------------------解构赋值-----------------------------------

//(1)解构赋值：ES6允许按照一定模式，从“数组”和“对象”中取值，对变量进行赋值，这称为解构

//(2)数组的解构赋值与传统赋值比较
var arr = [1, 2, 3];
var a = arr[0];
var b = arr[1];
var c = arr[2];//传统赋值
var [a, b, c] = [1, 2, 3];//数组的解构赋值
var [a, b, [c, d]] = [, 2, [3, 4]];//数组的解构赋值可以嵌套
var [a, b, c] = [1, 2];//这里只给a和b赋值了，而c只声明了没有赋值，叫做不完全解构
var [a, b, c = 3] = [1, 2];//允许设定默认值，这里c如果没有赋值，就用默认值3，赋值了就还是用赋的那个值

//(3)对象的解构赋值（和数组的类似）
var { a, b, c } = { "a": 1, "b": 2, "c": 3 };//var a=1,b=2,c=3;
var { a, b, c } = { "a": 1, "c": 3, "b": 2 };//var a=1,b=2,c=3;//这里变换了下对象的属性顺序，但赋值还是没变，说明对象的解构赋值和属性的顺序无关，只要变量名与属性名一致即可
var { a, b, c } = { "a": 1, "b": 2 };//var a=1,b=2,c;//找不到对应的属性名，就不能赋值
var { b: a } = { "b": 2 };//var a=2;//这样的解构赋值也可以，显示指定属性名为b的值为变量a的值
//等同于
var { "b": a } = { "b": 2 }
var { a: { b } } = { "a": { "b": 1 } };//var b=1;//对象的解构赋值也可以嵌套
var { a, b = 2 } = { "a": 1 };//可以设默认值

//(4)字符串的解构赋值（就是把字符串当作字符数组，与数组的解构赋值类似）
var [a, b, c, d, e, f] = "我就是前段君";//var a="我",b="就",c="是",d="前",e="端",f="君";

//(5)解构赋值用途一：交换变量的值
var x = 1;
var y = 2;
var [x, y] = [y, x];//相较于传统的引入第三个变量的方式，这极为简化了

//(6)解构赋值用途二：提取函数的返回值，将返回值分成多个
function demo() {
    return { "name": "张三", "age": 12 };
}
var { name, age } = demo();

//(7)解构赋值用途三：定义函数参数
function test({ a, b, c }) {//对象作为参数，这里就可以把对应的值提取出来
    console.log("姓名：" + a);
    console.log("身高：" + b);
    console.log("体重：" + c);
}
var xiaoming = { a: "小明", b: "172cm", c: "60kg" };
test(xiaoming);

//(8)解构赋值用途四：设定参数默认值（利用解构赋值可以设默认值的原理）
function demo2({ name = "无名" }) {
    console.log("姓名：" + name);//姓名：无名
}
demo2({});


//------------------------ES6扩展字符串string-----------------------------

//(1)模板字符串（反引号`）
{
    let name = "小明";
    let height = "172cm";
    console.log(`${name}的身高为${height}`);//采用反引号`，变量/表达式/函数放入${}中
}
`反引号内的字符
串可以随
意换行`//反引号`内的字符串可以随意换行，但这种方式，在输出字符串时也会换行，所以不想换行的话还是用以前的方式：在字符串换行末尾加反斜杠\

//(2)标签模板（标签函数+模板字符串）（标签：专门处理模板字符串的函数，模板：用反引号`定义的模板字符串）
var name = "张三";
var height = 180;
function tagFn(arr, v1, v2) {//标签函数（处理模板字符串，常用来过滤用户非法输入和多语言转换）
    console.log("------------标签模板--------------");
    console.log(arr);//["他叫","，身高","cm"]，指去掉${模板字符串的变量}后剩下的字符串的集合
    console.log(v1);//张三，模板字符串的变量
    console.log(v2);//180，模板字符串的变量
}
tagFn`他叫${name}，身高${height}cm`;//标签模板，这是种新的语法规范，这里调用tagFn函数不是加()，而是直接加上模板字符串

//(3)repeat函数（将目标字符串重复n次，然后返回新的字符串，不影响之前的）
var name1 = "前端君";
var name2 = name1.repeat(3);//"前端君前端君前端君"

//(4)includes函数（判断字符串中是否含有指定字符串（true/false），作用与indexof函数相同，但更加直观）
name1.includes('前');//true
name1.includes('前', 1);//false，第二个参数表示从第2个字符开始搜索

//(5)startsWith函数（判断字符串是否以指定字符串开头）
name1.startsWith('前');//true
name1.startsWith('端');//false
name1.startsWith('端', 1);//true，第二个参数表示从第2个字符开始搜索

//(6)endsWith函数（判断字符串是否以指定字符串结尾）
name1.endsWith('君');//true
name1.endsWith('端');//false
name1.endsWith('端', 2);//true，第二个参数表示只针对前2个字符

//(7)codePointAt函数（之前说过JS中一个字符为2个字节，对于需要4个字节存储的字符如“𠮷”，JS会认为它是两个字符，所以JS无法正确读取4字节的字符）
var str = "𠮷";
console.log(str.charAt(0));//乱码
console.log(str.codePointAt(0));//134071，码点，codePointAt函数能识别字符是4个字节，并且返回它的码点的十进制数，得到16进制就是20bb7，然后得到Unicode编码就是\u20bb7
console.log(String.fromCodePoint(134071));//将码点转成字符，这样就读取了4个字节的字符

//(8)String.raw函数（得到不处理的字符串，即哪些换行符等特殊字符/转义符都不处理）
console.log(`hello\nworld`);//输出hello 然后换行输出world
console.log(String.raw`hello\nworld`);//输出hello\nworld
//console.log(String.raw("hello\nworlld"));//这样用就会报错，证明String.row函数只能作用于模板字符串，且只能写成“标签模板”的形式

//(9)Unicode编码（中文：万国码、国际码、统一码、单一码），作为业界标准，对世界上大部分文字系统做了整理、编码，是电脑能更简单呈现和处理文字
//---如果采用二进制编码，那么针对不同的编码体系，二进制的表示就不同，所以不同语言之间就会出现乱码，这就促进了Unicode编码的诞生，即大家都能识别的编码


//------------------------ES6扩展数值number----------------------------

//(1)isNaN函数、isFinite函数、parseInt函数、parseFloat函数，都移植到了Number对象上，而全局window下这四个函数也还在，所以用的使用要显式用Number.
Number.isNaN(2.5);//false
isNaN('abc');//true，传统的isNaN会把非数值的参数转为数值再判断，所以这里转后发现是NaN（非数值），返回true
Number.isNaN('abc');//false，Number下的isNaN只对数值有效，所以这里不做处理，懒得转，直接返回false，即只要传入的不是数值就会返回false
Number.isFinite(1);//true，判断数值是不是有限的
Number.isFinite(Infinity);//false，同样，Number.isFinite只对数值有效，其他都返回false
Number.parseInt('21.31abc');//21，作用和window下的一样
Number.parseFloat('1.2');//1.2，作用和window下的一样

//(2)将isNaN、isFinite、parseInt、parseFloat移到Number下，主要就是为了慢慢减少全局性的函数，合理规划到其他对象下，实现语言的模块化
//---Number.isNaN()和Number.isFinite()与window下的函数的区别就在与它们只作用于数值，不会再转其他类型为数值再判断

//(3)Number.isInteger函数（用来判断是不是整数）
Number.isInteger(3.1);//false
Number.isInteger(3);//true
Number.isInteger(3.00);//true，由于js都是采用64位浮点数存储，所以底层是不存在整数的，所以3.00和3都表示同个数

//(4)极小常量
console.log(Number.EPSILON);//2.220446049250313e-16是个极小的数，约等于0.00000000000000022204，常用于判断浮点数的计算误差，小于这个数则可以接受

//(5)安全整数（因为js能表示的“精确的整数”的范围是-2的53次方到2的53次方之间，超过则表示不安全，即计算不准确）
console.log(Number.MAX_SAFE_INTEGER);//最大值
console.log(Number.MIN_SAFE_INTEGER);//最小值
Number.isSafeInteger(Number.MAX_SAFE_INTEGER);//判断是否安全（即是否精确）

//(6)Math.trunc函数（去除小数部分，返回整数部分）
Math.trunc(3.1);//3

//(7)Math.sign函数（判断一个数是正数、负数还是0）
Math.sign(3);//1
Math.sign(-3);//-1
Math.sign(0);//0
Math.sign("abc");//NaN

//(8)Math.cbrt函数（计算一个数的立方根，除此之外，ES6将许多数学方法封装成了Math对象的方法，差不多17个）
Math.cbrt(8);//2
Math.cbrt(-8);//-2


//----------------------------ES6扩展数组Array----------------------------------

//(1)Array.of()函数（将一组值转为数组，为了弥补Array构造函数的缺陷）
Array.of(1, 2, 3, 4, 5, 6);//[1,2,3,4,5,6]

//(2)Array.from()函数（将类似数组的对象，或者可遍历的对象转成真正的数组）
var ele = document.getElementsByTagName('script');//类似数组的对象
console.log('--------------ES6扩展数组Array----------------');
console.log(ele instanceof Array);//false
console.log(ele instanceof Object);//true
console.log(Array.from(ele) instanceof Array);//true
console.log(Array.from("hello"));//['h','e','l','l','o']，很常用的用法，将字符串转成数组

//(3)Array.prototype.find()函数
{
    let arr = [1, 2, 3, 4, 5, 6];
    arr.find(function (value) {//找出数组中符合条件的第一个元素
        return value > 2;
    });//3，如果没有符合条件的，则返回undefined
}

//(4)Array.prototype.findIndex()函数
{
    let arr = [7, 8, 9, 10];
    arr.find(function (value) {//找出数组中符合条件的第一个元素的位置
        return value > 8;
    });//2，如果没有符合条件的，则返回-1
}

//(5)Array.prototype.fill()函数
{
    let arr = [1, 2, 3];
    arr.fill(4);//[4,4,4]，用指定的值填充到数组中
    arr.fill(4, 1, 3);//[1,4,4]，第二个参数代表起始位置，第三个参数代表结束位置（不包括）
}

//(6)Array.prototype.entries()函数
for (let [i, v] of ["a", "b"].entries()) {//返回一个有键值对组成的遍历器(类似Map)
    console.log(i, v);//0 "a"  1 "b"
}

//(7)Array.prototype.keys()函数
for (let index of ['a', 'b'].keys()) {//返回一个由键组成的遍历器
    console.log(index);//0 1
}

//(8)Array.prototype.values()函数
/* for (let index of ['a', 'b'].values()) {//返回一个由值组成的遍历器，有些浏览器不支持
    console.log(index);//a b 
} */

//(9)数组推导（目前大多数浏览器不支持，火狐浏览器还支持）
var arr1 = [1, 2, 3, 4, 5];
//var arr2 = [for (i of arr1) i * 2];


//-----------------------------ES6扩展对象object--------------------------------

//(1)对象的属性的简洁写法（有点像解构赋值）
var name = "张三";
var age = 12;
var person1 = {//传统写法
    name: name,
    age: age
}
var person2 = { name, age };//ES6中对象的属性的简洁写法

//(2)对象的方法的简洁写法
var person1 = {
    say: function () {
        console.log('传统的对象的方法的写法');
    }
}
var person2 = {
    say() {
        console.log('ES6中对象的方法的简洁写法')
    }
}

//(3)ES6中属性名不只是字符串了，可以是表达式了（用中括号[]括起来）
var f = "first";
var n = "name";
var s = "say";
var h = "hello";
var person3 = {
    [f + n]: "张",
    [s + h]() {
        return "你好吗？"
    }
}

//(4)Object.is()函数（作用和严格相等===一样）
{
    let str = '12';
    let num = 12;
    let num2 = 12;
    Object.is(str, num);//false
    Object.is(num, num2);//true
}

//(5)Object.assign()函数（将源对象的属性赋值到目标对象上，可以用来克隆对象、添加属性和方法）
{
    let target = { "a": 1 };
    let origin = { "b": 2, "c": 3 };
    Object.assign(target, origin);
    console.log(target);//{a:1,b:2,c:3}
}

//(6)Object.getPrototypeOf(obj)函数（获取obj对象的原型对象）

//(7)Object.setPrototypeOf(obj)函数（设置obj对象的原型对象）


//--------------------------------ES6扩展函数function---------------------------------

//(1)设定函数参数的默认值
function human(name, age = 25) {//有默认值的参数必须放在没有默认值的参数的最后面
    console.log(name, age);
}
human('索拉', 20);//只有传入的值为undefined时，才会触发默认赋值，连0、false、null、""都不会

//(2)rest参数（第n个参数以外剩下的参数集合）
function sum(result, ...values) {//这里...values（三个点+变量名）表示的就是除了第一个参数外剩下的参数的集合，即rest参数
    console.log('-------------rest参数---------------')
    console.log(values);
    values.forEach(function (v) {
        result += v;
    });
    console.log(result);
}
var res = 0;
sum(res, 1, 2, 3, 4, 5);

//(3)扩展运算符（也就是三个点...，可以把数组元素用逗号,隔开，组成参数序列）
{
    function sum(a, b) {
        console.log(a + b);
    }
    let arr = [1, 2, 3, 4];
    sum(...arr);//这里...arr就相当于序列1,2,3,4
}

//(4)箭头函数（=>）
var fn1 = function (a) {//传统函数写法
    return a;
}
var fn2 = a => a;//箭头函数写法（=>前表示参数，=>后表示函数体）
var fn3 = (a, b) => {
    console.log(a);
    console.log(a + b);
}
var sum = 0;
[1, 2, 3, 4].forEach(function (v) {//传统写法
    sum += v;
})
//[1, 2, 3, 4].forEach(v => sum += v);//箭头函数写法，有的不支持

//(5)箭头函数中this的指向问题
var obj = {
    x: 100,
    show() {
        setTimeout(function () {
            console.log(this.x);//传统的函数中的this指向window
        }, 10);
    },
    show1() {
        setTimeout(() => console.log(`this指向定义时的对象：${this.x}`), 10);//箭头函数中的this指向定义时的对象
    }
}
//obj.show();//undefined，因为this指向全局window
obj.show1();//100，this指向定义时的对象


//---------------------------------ES6扩展数据类型，增加symbol-------------------------------------

//(1)JavaScript中的数据类型
console.log("------------JavaScript的数据类型----------------")
console.log(typeof "string");//string
console.log(typeof 12);//number
console.log(typeof { "name": "张三" });//object
console.log(typeof true);//boolean
console.log(typeof null);//object，这是历史原因，照理说应该返回null，但为了兼容以前的就还是返回的object
console.log(typeof undefined);//undefined
console.log(typeof Symbol());//symbol，ES6新增的数据类型，用Symbol()函数创建

//(2)symbol类型（标志、记号，独一无二的值）（应用场景：A和B都在使用同一个对象，A把B写的一个方法覆盖了，导致B的代码出错了。所以symbol是用来解决对象的属性名冲突的）
{
    let sm1 = Symbol();//创建symbol类型的变量，代表一个独一无二的值，类似字符串，但看不到具体是什么值
    let sm2 = Symbol();
    console.log("--------------symbol类型-----------------")
    console.log(sm1);//Symbol()
    console.log(sm2);//Symbol()
    console.log(sm1 === sm2);//false，独一无二的值，所以不相等
    let sm3 = Symbol('sm3');//Symbol()函数接收参数，参数相当于描述信息
    console.log(sm3);//Symbol(sm3);//加上描述，更容易区分
}

//(3)symbol类型在对象中的使用
{
    let name = Symbol();
    let person = {
        [name]: "张三"//symbol类型的值作为属性名
    }
    person[name];//张三，只能用方括号运算符获取值
    person.name;//undefined，不能用点运算符获取值，因为点运算符就相当于person['name']
}

//(4)symbol类型的属性不会出现在for...in、for...of、Object.keys()中，只能用Object.getOwnPropertySymbols()函数，或者用Reflect.ownKeys()函数
{
    let name = Symbol('name');
    let age = Symbol('age');
    let person = {
        [name]: "张三",
        [age]: 12,
        "height": 172
    }
    console.log(Object.keys(person));//["height"]，只能获取非symbol类型的键
    console.log(Object.getOwnPropertySymbols(person));//[Symbol(name),Symbol(age)]，只能获取symbol类型的键
    console.log(Reflect.ownKeys(person));//["height",Symbol(name),Symbol(age)]，获取类型的键，而且非symbol类型的键是放在前面的
}

//(5)Symbol.for()函数（去全局环境找是否有以参数为名的symbol值，有就返回它，没有就以该参数名创建新的symbol值）
{
    let name1 = Symbol();
    let name2 = Symbol('name')
    let n1 = Symbol.for('name');//用Symbol.for()创建的symbol值，会被登记到全局环境中，有的话就不重新创建
    let n2 = Symbol.for('name');
    console.log(n1);//Symbol(name);
    console.log(name1 === n1);//false
    console.log(name2 === n1);//false
    console.log(n1 === n2);//true
}

//(6)Symbol.keyFor()函数（返回被登记到全局环境中的symbol值的key，没有就返回undefined）
{
    let name = Symbol.for('name');
    let n1 = Symbol('name');
    console.log(Symbol.keyFor(name));//name
    console.log(Symbol.keyFor(n1));//undefined
}

//-------------------------------ES6扩展新特性：Proxy代理---------------------------------

//(1)Proxy（代理：比如以前在柜台存钱，需要银行柜员帮我们操作，这就需要代理给银行柜员）
{
    let person = { "name": "张三", "height": 172 };//对象person
    let proxy = new Proxy(person, {//proxy代理，代理的对象是person
        get: function (target, property) {//get方法，固定的名称和参数，用于读取代理的对象的属性，起到拦截的作用
            if (property === "name") {
                return "李四"
            } else {
                return "没有该属性"
            }

        },
        set(target, property, value) {//set方法，我这里试下对象的方法的简写，固定的名称和参数，用于拦截对代理的对象的写操作
            target[property] = value;//修改代理的对象的属性值，只能用方括号哦，因为如果用target.property就相当于target['property']
        },
        ownKeys: function (target) {//ownKeys方法限制了Object.keys()能获取得到的属性名
            return ["name", "age"]//如果不属于对象的属性，还是不会返回得到
        },
        has: function (target, property) {//has方法拦截了key in obj的判断
            return false
        }
    })
    console.log("-----------------Proxy代理-------------------")
    console.log(proxy.name);//"李四"，这里通过代理对象proxy去访问person对象，只要访问person的name属性就都返回"李四"
    console.log(proxy.height);//"没有该属性"
    console.log(Object.keys(proxy));//["name"]，虽然指定了"age"，但并不存在，所以还是不会返回
    console.log('name' in proxy);//false，被拦截了
}

//(2)Proxy代理还可以代理函数（相当于执行函数的另一种实现）
{
    let fn = function () {
        console.log("原始函数")
    }
    let proxy = new Proxy(fn, {
        apply: function () {//函数的代理，只有这一个拦截方法
            console.log("代理的函数");
        }
    })
    fn();//原始函数
    proxy();//代理的函数
}

//(3)如何取消proxy代理呢？用Proxy.revocable()函数返回的对象的revoke方法
{
    let person = { "name": "张三" };
    let pro = new Proxy(person, {
        get() {
            return "李四"
        }
    })
    let rev = Proxy.revocable(person, pro);//获取person对象的pro代理指向的一个对象
    console.log(pro.name)
    //console.log(rev.proxy.name);//rev.proxy属性就是pro代理
    rev.revoke();//就取消代理了
    //console.log(rev.proxy.name);//报错，代理被取消
}

//(4)Proxy代理还有其他一些拦截方法
//---defineProperty()
//---deleteProperty()
//---enumerate()
//---getOwnPropertyDescriptor()
//---getPrototypeOf()
//---isExtensible()
//---preventExtensions()
//---setPrototypeOf()


//-------------------------------ES6扩展新特性：for...of----------------------------------

//(1)for...of常用于遍历数据结构如数组、对象、字符串、set、map等具有iterator接口的数据结构

//(2)数组的遍历方式
{
    let arr = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < arr.length; i++) {//方式一：传统for循环，代码不够简洁
        arr[i];
    }
    arr.forEach(function (item, index) {//方式二：数组的forEach方法，代码简洁，但无法中断循环
        item;
        index;
    });
    for (let i in arr) {//方式三：for...in循环，常用于对象的遍历，i是字符串，有时需要转下类型
        arr[i];
    }
    for (let value of arr) {//方式四：for...of循环，代码简洁，可以用break和continue中断循环
        value;
    }
    for (let index of arr.keys()) {//可以结合数组的keys()方法遍历索引，而且是数值number类型的
        arr[index]
    }
}

//(3)要想用for...of遍历对象，那么对象必须有一个遍历器Iterator（又称迭代器，数组、字符串、set、map等都内置了的，对象没有）
{
    console.log("----------------遍历器Iterator-----------------");
    console.log("数组的遍历器:" + Array.prototype[Symbol.iterator]);
    console.log("字符串的遍历器:" + String.prototype[Symbol.iterator]);
    console.log("Set结构的遍历器:" + Set.prototype[Symbol.iterator]);
    console.log("Map结构的遍历器:" + Map.prototype[Symbol.iterator]);
    console.log("对象的遍历器:" + Object.prototype[Symbol.iterator]);//undefined
}

//(4)Iterator遍历器的原理
//---当用for...of遍历一个数据结构时，对应的[Symbol.iterator]()方法会被调用，返回一个iterator对象，该对象有个重要的next()方法
//---然后用遍历器不断调用next()方法，知道done的值为true，就表示遍历结束
{
    let arr = [1, 2, 3];
    let iter = arr[Symbol.iterator]();//iterator遍历器对象
    console.log(iter);//Array Iterator{}
    console.log(iter.next());//{value:1,done:false}
    console.log(iter.next());//{value:2,done:false}
    console.log(iter.next());//{value:3,done:false}
    console.log(iter.next());//{value:undefined,done:true}
}

//(5)想要用for...of遍历对象，那么我们就可以为对象加上一个遍历器对象，以及[Symbol.iterator]()方法
{
    let person = {
        name: "张三",
        age: 12,
        height: 150,
        [Symbol.iterator]: function () {
            let that = this;
            let arr = Object.keys(person);
            let index = 0;
            return {
                next() {
                    let value = that[arr[index]];
                    let done = index < arr.length ? false : true;
                    index++;
                    return { value, done }
                }
            }
        }
    }
    for (let value of person) {
        console.log(value);//成功用for...of遍历对象
    }
}


//------------------------------ES6带来的新函数：Generator函数，又称生成器函数---------------------------------

//(1)Generator函数与普通函数
{
    function hello1(name) {//普通函数，用function声明，没有关键字yield
        console.log("hello " + name)
    }
    function* hello2(name) {//Generator函数，用function*声明，且有关键字yield（代表暂停执行，等后续调用next()再恢复执行）
        yield `hello ${name}`;
        let str = yield `what's up man`;
        yield str;
    }
    console.log("------------Generator生成器函数---------------")
    hello1('前端君');//hello 前端君
    let ite = hello2('前端君');//创建了一个生成器Generator（相当于遍历器iterator），有个next()方法，用于遍历函数内部的状态
    console.log(ite.next());//{value:"hello 前端君", done:false}
    console.log(ite.next());//{value:"what's up man", done:false}
    console.log(ite.next('wonderful'));//{value:"wonderful",done:false}，这里next()可以传入参数，这个参数值就作为上个yield的返回值
    console.log(ite.next());//{value:undefined, done:true}
}

//(2)Generator函数内部再调用Generator函数（使用yield*）
{
    function* gen1() {
        yield "gen1 start";
        yield "gen1 end"
    }
    function* gen2() {
        yield "gen2 start";
        yield* gen1();//用yield*来调用生成器函数
        yield "gen2 end";
    }
    let ite = gen2();//得到生成器对象
    console.log(ite.next());
    console.log(ite.next());
    console.log(ite.next());
    console.log(ite.next());
    console.log(ite.next());
}

//(3)利用Generator函数控制函数内部状态的原理，可以实现异步操作
//---利用Generator函数可以暂停执行的作用，将异步操作的语句写在yield后面，再通过next方法进行回调
{
    function* asyn() {
        let start = "执行异步请求";
        yield start;//暂停执行，等待下次next()调用
        let end = "执行回调";
        yield end;
        let finish = "结束";
        console.log(finish);
    }
    var ite = asyn();//得到生成器对象
    console.log(ite.next());//调用next()时才执行asyn中的代码
    console.log(ite.next());
}


//-------------------------------ES6新增的数据结构：Set和WeakSet----------------------------------------

//(1)Set（与数组类似，只是它的值不会有重复项，成员唯一）
{
    console.log("------------------Set和WeakSet-------------------")
    let arr = new Array([1, 2, 3, 4, 4]);
    console.log(arr);//Array(5) [1,2,3,4,4]，数组中元素值可以重复
    let s = new Set([1, 2, 3, 4, 4]);
    console.log(s);//Set(4) {1,2,3,4}，Set中元素不会有重复的，创建时会自动忽略相同的值，只保留一个
}

//(2)可以用Set的实例方法add向Set实例中添加值，重复的也只保留一个
{
    let s = new Set();
    s.add(1);
    s.add(1);
    s.add(2);
    console.log(s);//Set(2) {1,2}
}

