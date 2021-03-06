//----------------正则表达式，主要学习匹配规则[参考网址](https://wangdoc.com/javascript/stdlib/regexp.html)-----------------------

//(1)正则表达式的作用：用于匹配对应的字符串中有没有表达式代表的内容。

//(2)正则表达式的两种创建方式，是等价的
var regExp1 = /a/;//编译时创建（更便利和直观，所以一般采用这种用两个正斜杆/的方式，即【字面量定义正则表达式】）
var regExp2 = new RegExp('a');//运行时创建
var regExp3 = /a/g;
var regExp4 = new RegExp('a', 'g');//第二个参数代表修饰符，用于指定g:全局匹配、i:不区分大小写的匹配和m:多行匹配
var regExp5 = /\n/;
var regExp6 = new RegExp('\\n');//注意当表达式中存在转义字符时，使用new RegExp()进行创建的话，需要多加一个反斜杠\，即写两个反斜杠\\

//(3)字面量字符
var regExp1 = /a/;//大部分字符在正则表达式中只表示它字面上的含义，比如这里a表示匹配字符串中含有a，这些字符就叫【字面量字符】
var regExp2 = /dog/;//这里dog表示匹配字符串中含有dog，即d、o、g三个字符连在一起

//(4)元字符
//---除了【字面量字符】外，有些特殊字符，不代表字面的含义，称为【元字符】，主要包含以下几种，其他还有很多：
//---【点字符（.）】
var regExp1 = /c.t/;//匹配除了回车（\r）、换行（\n）、行分隔符（\u2028）、段分隔符（\u2029）外的所有单个字符
regExp1.test('c-t');//true;
regExp1.test('c\rt');//false;
regExp1.test('coot');//false;
//---【位置字符（^、$）】
var regExp2 = /^hello/;//^表示字符串开始的位置，这里就指字符串以hello开头
regExp2.test('hello world');//true
var regExp3 = /world$/;//$表示字符串结束的位置，这里就指字符串以world结尾
regExp3.test('hello world');//true
var regExp4 = /^hello$/;//字符串以hello开头，又以hello结尾。
//---这里实际上就指字符串里只含有hello，而不是首尾分别有hello
//---如果非要指定首尾分别含有hello的，可以用两个正在表达式判断，因为只写一个的话，编译器根本不知道到底以哪个开头，哪个结尾
//---比如想匹配以a开头，以b结尾的字符串，那么写成一个/^ab$/就不对，得写成两个/^a/、/b$/
//---除了写两个正则表达式外，也可以写成/^a.*?b$/，即字符串以a开头，b结尾，中间有不确定个字符。
regExp4.test('hello world');//false
regExp4.test('hello hello');//false
regExp4.test('hello');//true
//---【选择符（|）】
var regExp5 = /cat|dog/;//|表示字符串中含有cat或者dog，而不是t或者d，因为选择符会选择其前后多个字符。
var regExp6 = /ca(t|d)og/;//用括号()就可以指定选择符要选择的字符，这里表示字符串中含有catog或者cadog

//(5)转义符
//---即反斜杠（\），为了匹配正则表达式中的元字符本身，就需要在其前面加上【转义符】。
var regExp1 = /\^a/;//这里就表示字符串中含有^a，而不是以a开头
//---在正则表达式中，需要加上转义符的元字符，一共有12个：. ^ $ | * + ? { [ ( ) \

//(6)特殊字符
//---正则表达式中，对一些不能打印的字符，即不会进行显示的字符，提供了特殊的表达方式
/\cX/;//表示Ctrl-[X]，X指的是A-Z中任意一个字母，用来匹配控制字符
/[\b]/;//退格键
/\n/;//换行
/\r/;//回车
/\t/;//制表符
/\v/;//垂直制表符
/\f/;//换页符
/\0/;//null
/\xhh/;//一个以两位十六进制数（\x00-\xFF）表示的字符
/\uhhh/;//一个以四位十六进制数（\u0000-\uFFFF）表示的Unicode字符

//(7)字符类
//---表示有一系列字符可以选择，匹配其中一个就行的字符集合，称为【字符类】，所有的字符都放在方括号[]中。
/[xyz]/;//表示x、y、z之中任选一个匹配，即字符串中含有x、y、z其中一个
//---有两个字符在字符类中有特殊含义：^和-
/[^xyz]/;//脱字符（^），表示除了字符类中的字符，都可以匹配。即字符串中不含有x、y、z中的任意一个。注意不是字符开头的意思哦。
/[^]/;//表示任意字符，比元字符中的点字符（.）包含的字符更多
/[a-z]/;//连字符（-），表示字符的连续范围。这里表示从字符a到z等26个字符
/[a-zA-Z0-9]/;//这里就表示字母的a到z和A到Z，以及数字的0到9
/[1-31]/;//这里需要注意，这里指的是1、2、3，因为这里是分成了1-3和1，而不是1至31。连字符连接的是单个字符，31属于两个字符了
/[\u0128-\uFFFF]/;//Unicode字符
/[A-z]/;//由于A到z的ASCII编码有58个，其中还含有一些除英文字母以外的6个字符，如[ \ ] ^ _ ,

//(8)预定义模式
//---一些常见的正则表达式，为了方便，提供了简写，即【预定义模式】
/\d/;//0到9，即[0-9]
/\D/;//0到9以外的字符，即[^0-9]
/\w/;//任意字母、数字、下划线，即[a-zA-Z0-9_]
/\W/;//字母、数字、下划线等以外的字符，即[^a-zA-Z0-9_]
/\s/;//空格，如换行符、制表符、空格符等，即[\t\r\n\v\f]
/\s\w*/.exec('hello world'); // [" world"]
/\S/;//非空格的字符，即[^\t\r\n\v\f]
/\b/;//词独立
/\bworld/.test('hello world'); // true
/\bworld/.test('hello-world'); // true
/\bworld/.test('helloworld'); // false
/\B/;//词不独立
/\Bworld/.test('hello-world'); // false
/\Bworld/.test('helloworld'); // true

//(9)重复类
//---指定模式的重复次数，用大括号表示{}，通常找邻近的单个字符，或者用小括号()括起来的，称为【重复类】。
//---用m、n代表数字，则：{n}代表重复n次；{n,}重复至少n次；{n,m}重复不少于n次，不多于m次
/lo{2}k/.test('look');//true，即o重复2次
/lo{2,}k/.test('loook');//true，即o重复至少2次
/lo{2,3}k/.test('loooook');//false，即o重复2~3次
/l(oo){2}k/.test('looook');//true，即oo重复2次

//(10)量词符
//---一些特殊的字符，可以用来指定模式的重复次数，称为【量词符】，如?、*、+
/t?/;//?代表重复0次或1次，即{0,1}
/t*/;//*代表重复0次或多次，即{0,}
/t+/;//+代表重复1次或多次，即{1,}
//---这三个量词符，默认情况下都是最大可能匹配，即【贪婪模式】
/a+/.exec('aaaaab');//["aaaaa"]，而不是["a"]、["aaa"]这些。默认是最大匹配
//---为了改为【非贪婪模式】,需要加上?
/a+?/.exec('aaaaab');


//(11)分组匹配
//---正则表达式里的小括号()就代表分组匹配，因为默认都是按单个字符进行匹配，为了实现多个字符一起，就需要用小括号括起来进行分组匹配
/fred+/.test('fredd'); // true，这里指字符d重复至少1次
/(fred)+/.test('fredfred'); // true，这里指fred重复至少一次
/(.)b(.)/.test('abcabc');
//---正则表达式内部，还可以用\n来引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号
/(..)b(.)\1b\2/.test("abbcabbc");//\1表示第一个括号匹配的内容（即ab），\2表示第二个括号匹配的内容（即c）
//---相当于
/(..)b(.)(..)b(.)/.test("abbcabbc");



