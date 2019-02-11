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

