//-----------------浏览器环境------------------------

//(1)介绍浏览器提供的各种用于操作浏览器相关内容的 JavaScript 接口，主要的如下：
window;
Navigator;
Screen;
Cookie;
XMLHttpRequest;

//(2)在网页中嵌入JavaScript脚本的方式：
//---script元素直接嵌入代码
//---script标签加载外部脚本
//---事件属性，如onclick="alert()";
//---URL协议，如<a herf="javascript:alert();"></a>

//(3)script元素的属性
"defer";//延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。注意只有在html写的script标签加载外部脚本才有效，其他通过脚本生成或者直接嵌入的都不行
"async";//使用另一个进程下载脚本，下载时不会阻塞渲染，下载好后执行时才阻塞渲染，相当于异步


//---------------------window对象--------------------------

//(1)window对象的概念
window;//window对象相对于当前浏览器窗口，是最顶层的对象，所有其他对象都是其下属，比如document对象代表这个文档，就是window.document
a = 1;//一个没有声明就直接赋值的变量，它自动成为顶层对象window的属性（window有自己的实体含义，其实不适合当作最高一层的顶层对象，这是一个语言的设计失误，但现在没法纠正了）

//(2)window对象的基本属性
window.name;//浏览器窗口的名称，不一定有
window.closed;//窗口是否关闭，意义不大，一般代码能执行就证明窗口没有关（一般用来检查，使用脚本打开的新窗口是否关闭）
window.opener;//新窗口所属的父窗口
window.self === window.window;//两者都指向window对象
window.frames;//返回类数组对象，包含所有的frame窗口和iframe子窗口。frames属性实际上是window对象的别名，为了更好区别，推荐使用frames
window.length;//所有的frame窗口和iframe子窗口的个数
window.frameElement;//当前框架窗口所属的框架元素，如iframe（嵌入网页）、embed（嵌入插件如flash）、object（引入一个外部资源）
window.top;//用于框架窗口，获取其顶层窗口
window.parent;//用于框架窗口，获取其父窗口，没有则返回本身
window.status;//读写浏览器状态栏的文本，但很多浏览器不支持，所以不一定有效
window.devicePixelRatio;//返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。从而判断采用哪种分辨率
window.isSecureContext;//是否加密，即是否是https协议加载

//(3)window对象的大小属性
window.screenX;//浏览器左上角相对于当前屏幕左上角的水平距离（单位像素），注意是整个浏览器的左上角，而不是网页的左上角
window.screenY;//浏览器左上角相对于当前屏幕左上角的垂直距离（单位像素）
window.innerWidth;//浏览器窗口内部宽度，即视口宽度，包括滚动条的宽度
window.innerHeight;//浏览器窗口内部高度，即视口高度，包括滚动条的高度
window.outerWidth;//浏览器窗口的外部宽度，包括浏览器的菜单、导航、边框等
window.outerHeight;//浏览器窗口的外部高度，包括浏览器的菜单、导航、边框等
window.scrollX;//页面的水平滚动距离，只读
window.scrollY;//页面的垂直滚动距离，只读
window.pageXOffset;//等同于window.scrollX
window.pageYOffset;//等同于window.scrollY

//(4)window对象的组件属性，其visible属性只读，表示是否显示
window.locationbar;//地址栏对象
window.menubar;//菜单栏对象
window.scrollbars;//窗口的滚动条对象
window.toolbar;//工具栏对象
window.statusbar;//状态栏对象
window.personalbar;//用户安装的个人工具栏对象

//(5)window对象的全局对象属性
window.document;//document对象，网页文档
window.location;//Location对象，地址
window.navigator;//Navigator对象，导航
window.history;//History对象，历史记录
window.localStorage;//LocalStorage对象，本地存储
window.sessionStorage;//SessionStorage对象，会话存储
window.screen;//Screen对象，屏幕
window.console;//console对象，控制台

//(6)window对象的方法
window.alert();//警惕对话框
window.prompt();//输入提示框
window.confirm();//确认对话框
window.open();//新建另一个浏览器窗口，有很多参数项，参考:https://wangdoc.com/javascript/bom/window.html#windowopen-windowclose%EF%BC%8Cwindowstop
window.close();//关闭窗口
window.stop();//停止加载窗口
window.moveTo(100, 200);//移动窗口到屏幕对应位置，为了避免有人滥用，只有一种情况才有效：该窗口是用window.open方法新建的，并且它所在的 Tab 页是当前窗口里面唯一的
window.moveBy(25, 100);//移动窗口一定的距离，同样只有一种情况才有效
window.resizeTo(window.outerWidth, window.outerHeight);//缩放窗口到指定大小
window.resizeBy(100, 100);//缩放窗口一定的大小
window.scrollTo();//滚动窗口到指定距离。注意如果是要滚动某个元素，而不是整个文档，则应该用元素的对应属性scrollTop才行
window.scroll();//等同于window.scrollTo()
window.scrollBy();//滚动窗口一定的距离
window.print();//跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同，有的如手机没有这个，就可以用typeof window.print==='function'进行判断
window.focus();//使窗口获取焦点
window.blur();//将焦点从窗口移除
window.getSelection();//获取选中的文本
window.getComputedStyle();//获取指定元素节点的计算样式
window.matchMedia();//用来检查 CSS 的mediaQuery语句
window.requestAnimationFrame();//跟setTimeout类似，都是推迟某个函数的执行，不过它是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次
window.requestIdleCallback();//跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行

//(7)window对象可接收的事件
"load";
"beforeunload";
"unload";
"error";
"beforeprint";
"afterprint";
"hashchange";
"languagechange";
"message";
"MessageError";
"offline";
"online";
"pagehide";
"pageshow";
"popstate";
"storage";
"onunhandledrejection";//未处理的 Promise 对象的reject事件的监听函数。


//----------------------navigator对象，包含用户浏览器的基本信息-------------------------

//(1)navigator对象的属性
navigator.userAgent;//返回浏览器的厂商和版本信息。但是最好不要用这个来识别浏览器，因为需要考虑到各个浏览器，太多了，不过可以大致用来判断是哪种
navigator.plugins;//返回类数组对象，包含浏览器中安装的插件，比如 Flash、ActiveX 等
navigator.platform;//返回用户的操作系统信息
navigator.onLine;//是否在线
navigator.language;//浏览器的首选语言
navigator.languages;//浏览器支持的语言
navigator.geolocation;//返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用，且需要用户授权
navigator.cookieEnabled;//浏览器的cookie是否可用

//(2)navigator对象的方法
navigator.javaEnabled();//浏览器是否支持java applet程序
navigator.sendBeacon();//向服务器异步发送数据


//-----------------------screen对象，指当前窗口所在的屏幕，提供显示设备的信息-------------------------

//(1)screen对象的属性
screen.height;//屏幕的高度
screen.width;//屏幕的宽度
screen.availHeight;//浏览器可用的屏幕高度，因为有些屏幕的一部分不可用，如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区
screen.availWidth;//浏览器可用的屏幕宽度
screen.pixelDepth;//屏幕的色彩位数
screen.colorDepth;//基本等同于screen.pixelDepth
screen.orientation;//屏幕的方向。landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary表示颠倒的竖放


//-----------------------location对象，提供对浏览器URL的操作----------------------------------

//(1)location对象的属性，假设地址为："http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
location.href === "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1";//整个URL
location.origin === "http://user:passwd@www.example.com:4097";//从协议到端口（只读）
location.protocol === "http:";//协议，包含冒号
location.host === "www.example.com:4097";//主机，如果端口是http默认的80，或者是https默认的443，就会省略
location.hostname === "www.example.com";//主机名
location.port === "4097";//端口
location.pathname === "/path/a.html";//路径部分，从根路径/开始。
location.search === "?x=111";//查询字符串部分，从问号?开始
location.hash === "#part1";//片段字符串部分，从#开始
location.username === "user";//主机前的用户名
location.password === "passwd";//主机前的密码

//(2)location对象的属性中，只有origin只读，其他的可读写，如果修改了loaction.href，则会立即跳转到对应的地址，常用于跳到对应的锚点

//(3)location对象的方法
location.assign("www.example.com");//用于跳转到指定的网址，若网址格式无效，则报错
location.replace("www.example.com");//用于替换网址，并立即跳转。此方法会在history中删除之前的网址，无法返回之前的网页，常用于跳转到手机版网页
location.reload();//刷新网页，若提供参数true，则代表清空缓存刷新
location.toString();//相当于location.href

//(4)URL的编码和解码
//---网页的URL只能包含合法的字符，如下
//---元字符：; , / ? : @ & = + $ #
//---语义字符：a-z A-Z 0-9 - _ . ! ~ * ' ( )
//---除了以上这些合法字符外，其他的都需要进行编码转义，编码规则：用%加上字符在系统中的默认编码对应的十六进制，如下：
"春节" === "%E6%98%A5%E8%8A%82";//春=>E6 98 A5=>%E6%98%A5；节=>E8 8A 82=>%E8%8A%82
encodeURI("春节+");//%E6%98%A5%E8%8A%82+，将元字符和语义字符之外的字符，都进行编码转义
decodeURI("%E6%98%A5%E8%8A%82+");//春节+，解码encodeURL()编码的字符
encodeURIComponent("春节+");//%E6%98%A5%E8%8A%82%2B，将语义字符之外的字符，都进行编码转义，即会编码元字符
decodeURIComponent("%E6%98%A5%E8%8A%82%2B");//春节+，解码encodeURIComponent()编码的字符


//---------------------URL对象，用来构造、解析和编码 URL------------------------

//(1)<a><area>元素对象，都可以用URL对象实例的属性和方法等

//(2)URL对象本身是一个构造函数，用于生产URL实例
var url = new URL('http://www.example.com/index.html');
url.href;//http://www.example.com/index.html

//(3)URL对象的实例属性与与location对象的属性基本一致，只多了一个
url.searchParams;//返回一个URLSearchParams实例，用来操作查询参数

//(4)URL对象的静态方法
URL.createObjectURL();//用来为上传/下载的文件、流媒体文件生成一个临时的 URL 字符串。这个字符串代表了File对象或Blob对象的 URL
URL.revokeObjectURL();//由于用URL.createObjectURL()生成的URL实例会一直在内存中，所以需要手动用revokeObjectURL()来释放


//----------------URLSearchParams对象，用来构造、解析和编码URL的查询字符串（学了这个就不要傻乎乎的按?去拆分URL了~v~）-------------------------------

//(1)URLSearchParams对象作为构造函数
var params = new URLSearchParams('?foo=1&bar=2');//参数为查询字符串
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);//参数为二维数组
var params = new URLSearchParams({ 'foo': 1, 'bar': 2 });//参数为对象
params.get('foo');//"1"

//(2)URLSearchParams对象的实例方法
params.toString();//"foo=1&bar=2"，注意不会有?
params.append('baz', 3);//"foo=1&bar=2&baz=3"，增加查询参数
params.delete('bar');//"foo=1&baz=3"，删除对应的查询参数
params.has('bar');//false，是否有对应的查询参数
params.set('bar', 3);//"foo=1&baz=3&bar=3"，设置或增加对应的查询参数
params.get('bar');//"3"，获取对应的查询参数
params.getAll('bar');//如果bar有多个，则返回多元素数组
params.sort();//对参数进行排序，排序规则为：按Unicode编码从小到大的方式，从左到右排列
params.keys();//返回参数名组成的遍历器
params.values();//返回参数值组成的遍历器
params.entries();//返回键值对组成的遍历器


//------------------Cookie-------------------

//(1)Cookie是服务器保存在浏览器客户端的一小段文本信息，每个cookie大小一般不超过4KB，浏览器每次向服务器发送请求都会带上这个cookie信息

//(2)Cookie的作用：用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息，有以下一些使用场景
//---对话（session）管理：保存登录、购物车等需要记录的信息
//---个性化：保存用户的偏好，比如网页的字体大小、背景色等等
//---追踪：记录和分析用户行为。

//(3)Cookie并不适用于作为客户端存储，容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端储存应该使用 Web storage API 和 IndexedDB

//(4)Cookie的信息，如Set-Cookie: key1=value1; Expires=Wed, 21 Oct 2015 07:28:00 GMT; domain=example.com; path=/blog;Secure;Http Only;
"key1";//Cookie 的名字
"value1";//Cookie 的值（真正的数据写在这里面）
"Expires";//到期时间，格式为UTC格式，可以用Date实例方法toUTCString()进行转换，如果不设置，则只存在于当前会话，浏览器窗口一关就没有了
"Max-Age";//存在秒数，优先级大于Expires
"domain";//所属域名（默认是当前域名）
"path";//生效的路径（默认是当前网址）
"Secure";//浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器
"HttpOnly";//该 Cookie 无法通过 JavaScript 脚本拿到

//(5)单个域名设置的 Cookie 不应超过30个，每个 Cookie 的大小不能超过4KB。超过限制以后，Cookie 将被忽略，不会被设置

//(6)浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie。注意协议可以不同

//(7)操作cookie，由于缺乏数据操作接口，所以现在很多是一些人封装的cookie的操作方法，但基本的使用时用document.cookie进行操作

//(8)读取cookie
document.cookie;//"foo=bar;baz=bar"，返回非HttpOnly的cookie，每个Cookie之间用;分隔
var cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; i++) {
    console.log(cookies[i]);
}

//(9)写入cookie
document.cookie = 'test1=hello';//document.cookie一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加
document.cookie = 'test2=world';//document.cookie读写行为的差异（一次可以读出全部 Cookie，但是只能写入一个 Cookie）
document.cookie = 'fontSize=14; '//cookie的属性一旦写入，就不能读取了
    + 'expires=' + someDate.toGMTString() + '; '
    + 'path=/subdirectory; '
    + 'domain=*.example.com';

//(10)删除cookie
document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';//只能通过设置它的expires属性为一个过去的日期。


//------------------------Web storage API----------------------------

//(1)Web storage API主要是指localStorage和sessionStorage，两个对象都实现了Storage接口，大小在在 2.5MB 到 10MB 之间
//---sessionStorage保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空
//---localStorage保存的数据长期存在
//---除了保存时间长短不一致，其他都一样，所以统一介绍localStorage对象就行了

//(2)Storage接口的属性
localStorage.length;//返回保存的数据项个数

//(3)Storage接口的方法
localStorage.setItem('key', 'value');//存入数据。直接用localStorage对象属性赋值也行
localStorage.getItem('key');//"value"，读取数据。直接用localStorage对象属性读取也行
localStorage.key(0);//"key"，返回对应位置的键
localStorage.removeItem('key');//移除数据
localStorage.clear();//清除所有数据

//(4)storage事件
window.addEventListener('storage', function (e) {
    e.key;//发生变动的键名
    e.newValue;//新的键值
    e.oldValue;//旧的键值
    e.storageArea;//键值对所在的对象
    e.url;//触发storage事件的那个网页的网址
});
//---注意：该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。
//---当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，实现多个窗口之间的通信。


//--------------------------History对象---------------------------

//(1)history对象记录了当前窗口所访问过的所有页面网址

//(2)history对象的属性
history.length;//网址数量
history.state;//History 堆栈最上层的状态值

//(3)history对象的方法
history.back();//移动到上一个网址
history.forward();//移动到下一个网址
history.go();//移动到指定网址
history.go(-1);//等同于history.back()
history.go(0);//刷新网页，等同于location.reload()
history.go(1);//等同于history.forward()
history.pushState(//在历史中添加一条记录
    null,//state：一个与添加的记录相关联的状态对象，主要用于popstate事件。不需要则填null
    "",//title: 新页面的标题
    "",//url: 新页面的网址，但跨域的网址会报错
);
history.replaceState();//参数与pushState一样，用于修改记录

//(4)popstate事件
//---当浏览历史history改变时，就会触发此事件
window.addEventListener('popstate',function(e){
    e.state;//对应状态对象，也可通过history.state获取当前的
})
