
//===========语法==============


//------------------基本语法------------------------

//(1)语句（JS中每一行就是一个语句，通常以;结尾，如果没写，JS也会自动补全，所以不写;时可能会有意想不到的问题）
var a;//声明
a = 1;//赋值
var b = 1 + 3;//定义（包含声明和赋值），这里1+3是表达式，与语句的区别是表达式肯定有返回值
console.log(a + b);//调用

//(2)变量提升（JS引擎会先获取所有变量的声明，并把声明放到代码头部，再执行）
console.log(c);//undefined，表明c已经声明了，但还未赋值
//e();//e is not defined，表明e还没有声明
//d();//d is not a function，表明d声明了，但还未赋值
var c = 1
var d = function () {
    alert("方法调用");
}

//(3)标识符 （用来标识各个值的的合法名称，严格区分大小写）
//---JS中标识符由Unicode字母（即英文字母以及其他语言的字母）、数字、下划线_、美元符号$组成，只是不能以数字开头
//---JS中的关键字（如typeof null var等都不能作为标识符）
var $asdfa;
var _adfa;
var asa;

//(4)区块（即大括号{}，用来将多个语句组合到一起）
//---在JS中，对于var关键字声明的变量，只有全局作用域，和函数作用域，并没有块作用域（用let的有），没有用关键字声明的变量在非严格模式下属于全局变量
{
    var name = "tom";
}
console.log(name);//tom，在区块外面仍然读取得到

//(5)常规操作：if条件语句 switch条件语句 三元运算符?:  for循环 while循环 do...while循环 break不再执行循环  continue跳出当前这次循环，执行下次循环
//---在条件判断中，JS将0、''、""、null、undefined、NAN、false都看作false，其他的都为true

//(6)标签Label（用于标记程序的位置，在使用break、continue时，指定位置就以及跳转到对应的位置）
top:
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        if (i === 1 && j === 1) break top;//如果没有top，break只能跳出内层循环，而有top就可以跳出整个循环
        console.log('i=' + i + ', j=' + j);
    }
}

//(7)js代码嵌入网页的四种方式：
//---<script>元素直接嵌入代码。
//---<script>标签加载外部脚本
//---事件属性，如onclick="console.log('事件属性')"
//---URL协议，如<a herf="javascript:console.log('URL协议');"></a>


//-------------------------数据类型-------------------------------

//(1)JS中的每一个值都属于一种数据类型，JS中基本有6种（ES6中新增了第7种Symbol）
//---通常number、string、boolean称为原始类型，是最基本的数据类型不能再分
//---object称为合成类型，由多个原始类型合成
//---undefined、null看作特殊的两个值
var v1 = 123;//number，数值可以是整数，也可以是小数，都有其最大范围、最小范围
var v2 = "字符串";//string，字符串可以用双引号表示，也可以用单引号
var v3 = true;//boolean，布尔值只有true和false
var v4 = undefined;//undefined，表示没有声明或者赋值
var v5 = null;//null，表示值为空
var v6 = {//object，对象，即各种类型的值组成的集合
    name: "对象"
}

//(2)对象类型object（还可以划分为三个类型：狭义的对象object、函数function、数组array）
//---狭义的对象和数组是两种不同的数据组合方式，一般的对象都是说狭义的对象
//---函数function则是处理数据的方法
var obj = {
    name: "狭义的对象object"
}
var fn = function () {
    console.log("函数function");
}
var arr = [1, 2, 3, 4, 5, 6];//数组array

//(3)确定一个值的类型的方法有三种（typeof运算符、instanceof运算符、Object.prototype.toString方法）
console.log("-------------------值的类型----------------------")
console.log(typeof 123);//number
console.log(typeof "string");//string
console.log(typeof true);//boolean
console.log(typeof undefined);//undefined，利用typeof undefined返回"undefined"的特性，常用其判断一个变量是否定义
console.log(typeof null);//object，这里是历史原因，null最开始是object的一种特殊值，后面独立出来了成了一种数据类型，但为了兼容以前的代码，就没有变typeof null了
console.log(typeof obj);//object
console.log(typeof fn);//function
console.log(typeof arr);//object，数组本身就是特殊的对象，可以用instanceof来区分数组和对象
console.log(arr instanceof Array);//true
console.log(obj instanceof Array);//false


//--------------------------数值number--------------------------------

//(1)JS中数值都是以64位浮点数存储的，整数也是，实际上JS的底层中就没有整数，所以1和1.0是一样的，同一个数
1 === 1.0;//true

//(2)当只有整数才能进行的运算时，JS会把64位浮点数转为32位整数，而涉及小数的运算，计算是很不准确的，尽量不要用
0.1 + 0.2 === 0.3;//false

//(3)数值的范围（采用64位存储，其中第1位表示正负号，第2~12位表示指数，第13到64位表示小数）
//---小数部分53位：决定数值的精度，超过就会计算出错
console.log("--------------------数值的精度------------------------");
console.log(Math.pow(2, 53));//2的53次方
console.log(-Math.pow(2, 53));//负2的53次方
//---指数部分11位：决定数值的范围
console.log("--------------------数值的范围------------------------");
console.log(Math.pow(2, 1024));//2的1024次方，大于等于时正向溢出，返回Infinity
console.log(Math.pow(2, -1023));//2的-1023次方，超过是负向溢出，返回0
//---可以用Number对象的MAX_VALUE和MIN_VALUE属性，返回可以表示的具体的最大值和最小值。
console.log("--------------------数值的范围，Number对象的属性------------------------");
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);

//(4)数值的进制
12;//有的以数字0开头，十进制
0O24;//数字0字母o（或O）开头，八进制
0x9f;//数字0字母x（或X）开头，十六进制
0b11011;//数字0字母b（或B）开头，二进制

//(5)特殊的数值（+0，-0，NaN，Infinity）
//---因为始终有个符号位，所以有正0和负0之分，通常都相当于0，只是在除法中+0返回Infinity，-0返回-Infinity
1 / +0;//+Infinity
1 / -0;//-Infinity
//---NaN表示非数字，英文Not a Number，常用于字符串转数字出错时，并且NaN不等于任何值，包括自己，但其仍然属于number类型
5 - 'x' // NaN
Math.acos(2) // NaN
0 / 0 // NaN
typeof NaN // 'number'
NaN === NaN;//false
//---Infinity表示无穷
Infinity === -Infinity // false
1 / -0 // -Infinity
    - 1 / -0 // Infinity
Infinity > NaN // false
    - Infinity > NaN // false

//(6)关于数字的全局方法
parseInt('123') // 将字符串转成整数，如果传入的不是字符串，JS会先把传入的转成字符串
parseInt('15e2') // 15，遇到不能转成数字的就停下
parseInt('xb')//NaN，从第一个字符（+、-除外）开始全都不能转，则返回NaN
parseInt(+1)//1
parseInt('1000', 8) // 512，第二个参数表示进制，范围2——36，超出后返回NaN，这样就可以指定要转成的进制了
parseFloat('3.14') // 3.14，将字符查转成浮点数
isNaN(NaN) // true，只能用isNaN方法判断一个值是否是NaN，传入的是非数字则先转为数字，再判断
isFinite(Infinity)//判断是否是正常的数值，Infinity、-Infinity、NaN和undefined这几个值会返回false，其他数值返回true


//--------------------------字符串string----------------------------

//(1)字符串可以用双引号""或单引号''来表示,可以嵌套使用（最外层的""或''只是一种表示方法，不属于字符串的内容）
"双引号"
'单引号'
"双引号内嵌套'单引号'"
'单引号内嵌套"双引号"'
"双引号内嵌套\"双引号\""//这种必须用反斜杠来转义
'单引号内嵌套\'单引号\''//这种也必须用反斜杠来转义

//(2)字符串默认在一行写，要换行写的话必须在每行末尾加上反斜杠\，输出的时候还是在一行的，不用担心
"换\
行\
的字符串\
"

//(3)反斜杠\，从上面可知在字符串中反斜杠\有着特殊的意义，称为转义符
//\0 ：null（\u0000）
//\b ：后退键（\u0008）
//\f ：换页符（\u000C）
//\n ：换行符（\u000A）
//\r ：回车键（\u000D）
//\t ：制表符（\u0009）
//\v ：垂直制表符（\u000B）
//\' ：单引号（\u0027）
//\" ：双引号（\u0022）
//\\ ：反斜杠（\u005C）

//(4)字符串，可以视为字符数组，但不能改变字符数组的内容和长度（即字符的数量，JS只支持2字节字符，但现在已经有4字节字符了，所以有时字符数量跟预想的不对）
var strA = "字符数组";
strA[2];//数
strA.length;//4

//(5)JS采用Unicode字符集，可以直接使用
var s = '\u00A9';
s // "©"

//(6)Base64转码（文本中有些不可打印的符号，这时可以用Base64转码成可打印的，主要目的不是加密，而是为了不出现特殊字符）
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"，编码
atob('SGVsbG8gV29ybGQh') // "Hello World!"，解码
btoa(encodeURIComponent('你好'));//"JUU0JUJEJUEwJUU1JUE1JUJE",在编码ASCII字符时，必须用encodeURIComponent先转一下
atob(decodeURIComponent('JUU0JUJEJUEwJUU1JUE1JUJE'));//"你好"，在解码ASCII字符时，也需要用decodeURIComponent先转一下


//--------------------------对象object--------------------------------

//(1)这里说的object指的是之前说的狭义对象，是由键值对组成的集合，之前由,隔开，由于目前JS中对象的键都是字符串，所以键可以加引号，也可以不加，JS自动会加上的
var object = {
    "name": "小胡",
    height: 180,
    '1+sa': "特殊键"//当键名不符合标识符的命名规则时，必须加上引号
}

//(2)JS规定{}开头的都算是语句区块，要想表示表达式，必须加上()
eval('{foo: 123}') // 123
eval('({foo: 123})') // {foo: 123}

//(3)对象的属性（点运算符、方括号运算符）
var obj1 = {
    name: "wo",
    p1: 1,
    p2: 2,
    p3: 3
}
obj1.name;//wo，点运算符
obj1['name'];//wo，方括号运算符，属性名必须加上引号，不然会认为是变量
Object.keys(obj1);//['name']，查看对象本身的所有属性名
'name' in obj1;//true，用in运算符判断对象是否有某个属性，包括继承来的
obj1.hasOwnProperty('name');//true，判断这个属性是不是对象自己的，而不是继承来的等等
delete obj1.name;//用delete删除对象的属性，返回true，但有的属性删除不了，也删除不了用var等关键字声明的全局变量

//(4)for...in循环用来遍历一个对象的全部属性，包括从原型链继承的属性，但会跳过不可遍历的属性，如toString、length等
for (var key in obj1) {

}

//(5)with(){}可以用来同时操作对象多个属性
with (obj1) {
    p1 = 2;
    p2 = 3;
    p3 = 4;
}
//等同于下面，但不需要再重复写对象的名称，可是简化了会导致一个问题，就是绑定的对象不明确，如果有个全局变量也叫p1的话，JS就不知道怎么编译了
obj1.p1 = 2;
obj1.p2 = 3;
obj1.p3 = 4;

//(6)数组是特殊的对象，所以操作类似


//------------------------函数function----------------------------

//(1)函数的定义。函数本质上是一个可以重复使用的代码块，输入不同参数有不同结果，有3种定义函数的方式。
//并且函数可以嵌套，即函数里定义函数，同时只能在函数的代码块中定义函数，在if等里面不能。
//如果重复定义同名的函数，则后面的会覆盖掉前面的，但如果同时采用function命令和赋值语句声明同一个函数，最后总是采用赋值语句的定义。
//---function命令
function fn1(a) {
    return a;
}
//---函数表达式，function命令后如果跟名称，则该名称只在函数内部有效，指向函数表达式本身
var fn2 = function x(a) {
    console.log(x)
    return a;
}
//---Function对象的构造函数，太不直观，基本没人用
var fn3 = new Function('x', 'y', 'return x+y');

//(2)函数的调用，函数名加()就可以调用了
fn1();

//(3)函数名提升（JS将函数名视同变量名，所以像变量提升一样有函数名提升，匿名函数当然就没有）
fn_1()
function fn_1() {//function命令定义的函数，JS会把整个函数（包括函数名、函数体）提升到头部，所以前面可以直接调用

}
fn_2();//这里就会报错了，因为函数名提升，只有声明，而还没有赋值
var fn_2 = function () {

}

//(4)函数的name属性（用处就是用来获取参数函数的名称）、函数的length属性（返回预定义的参数的个数）、函数的toString方法（返回一个字符串，内容是函数的源码），这些都是只读的，不可修改。
var myFunc = function () { };
function test(f) {
    console.log(f.name);
}
test(myFunc) // myFunc

var f3 = function myName() { };//这种情况，取function后面的名称
f3.name // 'myName'，返回函数表达式的名称，而真正的函数名还是f3，所以调用时还是用f3()

//(5)函数作用域（ES5规定JS只有全局作用域、函数作用域，ES6新增块级作用域）
var v = 1;
function f() {
    var v = 2;
    console.log(v);
}
f() // 2
v // 1

//(6)函数的参数传递（值传递：原始类型，地址传递：合成类型）（参数不是必传的）
function a(a, a) {
    return a;
}
a(1, 2);//2，如果参数同名，则取后面的

//(7)函数的arguments对象（用于在函数内部读取所有参数，类似数组，但数组的好多方法不能调用，正常模式下可以修改arguments对象，严格模式下不可以）
var f11 = function () {
    console.log(arguments.callee === f11);//arguments对象的callee属性，返回函数
}
f11() // true

//(8)闭包（即定义在函数内部，能读取函数内部变量的函数）
function createIncrementor(start) {
    return function () {
        return start++;
    };
}
var inc = createIncrementor(5);//闭包还可以让变量一直保存在内存中，这样下次运行时，值还从上次的开始（）
inc() // 5
inc() // 6
inc() // 7

//(9)所以利用闭包就可以实现封装对象的私有属性和方法
function Person(name) {
    var _age;
    function setAge(n) {
        _age = n;
    }
    function getAge() {
        return _age;
    }

    return {
        name: name,
        getAge: getAge,
        setAge: setAge
    };
}
var p1 = Person('张三');
p1.setAge(25);
p1.getAge(); // 25

//(10)立即执行函数（JS规定以function开头的是语句，而不是表达式，所以立即执行函数如下）
(function () { /* code */ })();

//(11)eval命令（用于把字符串当成JS代码执行）
eval('var a = 1;');
a // 1


//-------------------------数据类型转换------------------------------

//(1)强制类型转换（Number、String和Boolean三个函数）
Number('324') // 324，比parseInt严格
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
String({ a: 1 }) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false

//(2)自动转换
123 + 'abc' // "123abc"
if ('abc') {
    console.log('hello')
}  // "hello"


//-----------------------------错误处理机制----------------------------------

//(1)Error构造函数
var err = new Error('出错了');
err.message // "出错了"

//(2)throw语句
if (x < 0) {
    throw new Error('x 必须为正数');
}

//(3)try...catch...finally...
try {
    throw new Error('出错了!');
} catch (e) {
    console.log(e.name + ": " + e.message);
    console.log(e.stack);
} finally {
    console.log('完成清理工作');
}


//-------------------------------编程风格------------------------------------

//(1)JS允许不在语句末尾加;，以下几种明确规定了不加分号;
for (; ;) {
}
while (true) {
}
if (true) {
}
switch (a) {
}
try {
} catch (e) {
}
function f() {
}

//(2)JavaScript 有两个表示相等的运算符：”相等“（==）和”严格相等“（===）。
//建议不要使用相等运算符（==），只使用严格相等运算符（===）。


//---------------------------异步机制--------------------------------

//(1)JavaScript是单线程的，即一次只能执行一个任务，如果一个任务报错了，或者一直在执行，则之后的任务都无法执行，所以要用到异步操作

//(2)JavaScript运行时，有个主线程，还有个任务队列（存放异步任务），主线程会先执行完所有的同步任务，再去看任务队列里的异步任务，再执行。

//(3)如果异步任务没有回调函数，JS是不会把它放进任务队列中的，JS引擎会在同步任务执行完后，会不停的检查（即事件循环）任务队列中的异步任务，看要不要执行回调函数了

//(4)异步操作的模式：
//---回调函数：
//---事件监听：异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
//---发布与订阅：就是把“事件”理解为“信号”，假设存在“信号中心”，某个任务执行完成，就向信号中心”发布“（publish）一个信号，其他任务可以向信号中心”订阅“（subscribe）这个信号，从而知道什么时候自己可以开始执行。

//(5)Promise对象（也是构造函数）
//---resolve（将Promise实例的状态从“未完成”变为“成功”）和reject（将Promise实例的状态从“未完成”变为“失败”）是两个函数，JS固定实现了的
var promise = new Promise(function (resolve, reject) {
    if (true) {
        resolve(value);
    } else { /* 异步操作失败 */
        reject(new Error());
    }
});

//(6)AJAX操作
function search(term, onload, onerror) {
    var xhr, results, url;
    url = 'http://example.com/search?q=' + term;

    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function (e) {
        if (this.status === 200) {
            results = JSON.parse(this.responseText);
            onload(results);
        }
    };
    xhr.onerror = function (e) {
        onerror(e);
    };

    xhr.send();
}

search('Hello World', console.log, console.error);


//-------------------严格模式----------------------

//(1)'use strict'必须放在脚本文件（<script>标签中的js）的最前面或者单个函数的函数体最前面，这样js才会以严格模式运行。否则无效

//(2)只读属性不可写

//(3)只设置了取值器的属性不可写

//(4)禁止扩展的对象不可扩展

//(5)eval、arguments 不可用作标识名

//(6)函数不能有重名的参数

//(7)禁止八进制的前缀0表示法

//(8)全局变量必须显式声明

//(9)禁止 this 关键字指向全局对象

//(10)禁止使用 fn.callee、fn.caller

//(11)禁止使用 arguments.callee、arguments.caller

//(12)禁止删除变量

//(13)禁止使用 with 语句

//(14)创设 eval 作用域

//(15)arguments 不再追踪参数的变化

//(16)非函数代码块不得声明函数

//(17)保留字不能作为变量名