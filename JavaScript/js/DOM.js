//--------------------DOM：文档对象模型（Document Object Model）-----------------------

//(1)DOM是JavaScript操作网页的接口，它的作用就是将网页转成一个JavaScript对象，从而进行各种操作

//(2)DOM只是一个接口规范，并不只属于JavaScript，可以用任何语言实现，只是JavaScript是最常用于DOM操作的语言，实现了DOM规范
//---DOM中的节点在JavaScript中都有对应的对象进行描述，所以一般说节点，也就是说一个对象，而所有的都继承于Node对象

//(3)节点
//---DOM的最小组成单元，就是节点（node）。各个节点组成了DOM树
//---节点的类型有7种，而且都继承于一个浏览器提供的原生节点Node对象：
//---Document：DOM树的顶层节点，如document，代表整个DOM树
//---DocumentType：doctype标签，如<!DOCTYPE html>
//---Element：网页中的各个标签元素，如<html>、<body>等。我们知道元素有开始标签、内容、结束标签组成，而元素实际上就是元素节点，我们只是为了方便叫，就直接叫元素，而不叫元素节点了。
//---Attribute：网页中各个标签元素的HTML属性，如class="right"
//---Text：标签之间或标签之内包含的文本
//---Comment：注释
//---DocumentFragment：文档片段

//(4)节点树
//---document：是浏览器原生提供的对象，代表整个文档，即节点树
//---节点树的第一层只有一个元素（Element）节点<html>标签，即根元素节点root node，所以在css中可以用:root{}来指代html{}
//---除了根节点外，其余节点都有父节点关系（parentNode）、子节点关系（childNodes）、同级节点关系（sibling）

//(5)节点集合
//---DOM 提供两种节点集合，用于容纳多个节点：NodeList和HTMLCollection。
//---NodeList可以存放各个类型的节点
//---HTMLCollection只能存放html元素节点


//--------------------document对象-----------------------

//(1)document对象代表整个DOM文档，每张网页都有自己的document对象，存放于window对象中，网页一被浏览器载入就能用document了
//---所以正常网页，可以用window.document或者document来获取document对象
//---iframe中加载的网页，就用iframe节点的contentDocument属性来获取
//---ajax请求得到的网页，就用XMLHttpRequest对象的responseXML属性来获取
//---另外也可以用网页内部节点的ownerDocument属性来获取

//(2)document的快捷方式属性
document.defaultView;//返回document所属的对象，一般情况是window对象，否则为null
document.doctype;//返回文档类型（DocumentType）节点，一般是<!DOCTYPE html>，没有则为null
document.doctype.name;//返回文档类型，"html"
document.documentElement;//返回根元素（Element）节点，一般是<html>节点
document.head;//<head>节点
document.body;//<body>节点
document.scrollingElement;//文档的滚动元素节点，即真正在滚动的元素，标准模式下为<html>节点，兼容模式下为<body>节点，没有滚动则为null
document.activeElement;//获取当前焦点的元素节点，如<input>、<textarea>等，没有则返回<body>节点或null。利用此对象的selectionStart、selectionEnd、selectionDirection可以做到在特定位置插入文本等
document.fullscreenElement;//当前以全屏状态显示的元素节点，没有则为null。根据这个就可以进行是否全屏的判定

//(3)document的节点集合属性
document.links;//返回设置了href属性的<a>节点和<area>节点
document.forms;//返回所有的<form>节点
document.images;//返回所有的<img>节点
document.embeds; document.plugins;//都返回所有的<embed>节点（该节点用于嵌入插件，如flash）
document.scripts;//返回所有的<script>节点
document.styleSheets;//返回所有的css样式表节点

//(4)document的静态信息属性
document.URL; document.documentURI;//返回当前的网址
document.domain;//返回域名，不包含协议和端口，如网页的网址是http://www.example.com:80/hello.html，那么domain属性就等于www.example.com
document.location;//返回location对象，用于操作URL。使用window.location或者location也能获得此对象
document.lastModified;//返回文档的最新修改时间，但如果页面上有JavaScript动态生成的内容，则返回的始终是当前时间
document.title;//返回文档的标题，即<title>节点的内容，可修改
document.characterSet;//返回文档的字符编码，如UTF-8
document.referrer;//返回访问此文档之前所在文档的网址，若没有则为null
document.dir;//返回文字的方向，如rtl：右到左，ltr：左到右
document.compatMode;//返回文档的模式，一般设置了<!doctype html>，则为严格模式CSS1Compat，否则为向后兼容模式BackCompat

//(5)document的状态属性
document.hidden;//是否可见，false/true
document.visibilityState;//可见状态（visible:可见、hidden:不可见、prerender:正在渲染不可见、unload:内存中被卸载）
document.readyState;//加载状态（loading:正在加载html代码、interactive:正在加载外部资源、complete:加载完成）
document.cookie;//用来操作cookie
document.designMode;//文档是否可编辑，默认为off，设为on后，整个html文档就可以编辑了
document.implementation;//用于创建独立于当前文档的新的 Document 对象，主要用来新生成整个文档

//(6)document的方法
document.open();//会先清除整个文档的内容，再使文档处于可写状态
document.close();//关闭打开的文档，使文档不可写
document.write();//向打开的文档中写入内容
document.writeln();//向打开的文档中写入内容，只是每次写入时，会加上一个换行符\n，但这个换行符只对代码显示有效，如果要让html的显示内容换行，还是得用<br>
document.querySelector();//参数为css选择器，用于获取对应的元素节点，如果有多个，则返回第一个；如果没有，则返回null
document.querySelectorAll();//参数为css选择器，可以有多个，用逗号隔开，用于获取多个对应的元素节点。如果参数为*，则返回文档中所有的元素节点
document.getElementsByTagName();//根据标签名称获取元素节点
docuemnt.getElementsByClassName();//根据class属性值来获取元素节点
docuemnt.getElementsByName();//根据name属性值来获取元素节点
document.getElementById();//根据id属性值来获取元素节点，这个方法比document.querySelector()更快，但只能在document上用，不能在其他元素节点上用。
document.elementFromPoint();//返回页面指定位置最上层的元素节点
document.elementsFromPoint();//返回页面指定位置所有的元素节点
document.caretPositionFromPoint();//返回一个 CaretPosition 对象，包含了指定坐标点在节点对象内部的位置信息。CaretPosition 对象就是光标插入点的概念，用于确定光标点在文本对象内部的具体位置
document.createElement();//创建元素节点
document.createTextNode();//创建文本节点，主要用于将如""<p></p>"等含标签的文本插入文档中，而不会被浏览器解析成元素节点，也可以避免XXS攻击
document.createAttribute();//创建属性节点，创建后可以用元素节点的setAttributeNode()方法把属性节点加到元素节点上
document.createComment();//创建注释节点
document.createDocumentFragment();//创建DOM片段，存于内存中，不属于当前文档。常用于修改文档中复杂的DOM结构，在插入文档中，以免引发浏览器不停的渲染。
document.createEvent();//创建一个事件对象，参数是事件类型，如UIEvents、MouseEvents、MutationEvents、HTMLEvents
document.addEventListener();//添加事件监控
document.removeEventListener();//移除事件监控
document.dispatchEvent();//触发事件
document.hasFocus();//返回是否有元素被激活或获得焦点
document.adoptNode();//将某个节点及其子节点，从原来所在的文档或DocumentFragment里面移除，归属当前document对象，返回插入后的新节点
document.importNode();//从原来所在的文档或DocumentFragment里面，拷贝某个节点及其子节点，让它们归属当前document对象，返回插入后的新节点
document.createNodeIterator();//创建子节点遍历器
document.createTreeWalker();//创建子树遍历器
document.execCommand();//如果document.designMode属性设为on，那么整个文档用户可编辑；如果元素的contenteditable属性设为true，那么该元素可编辑。这两种情况下，可以使用document.execCommand()方法，改变内容的样式，比如document.execCommand('bold')会使得字体加粗
document.queryCommandEnabled();//查询是否支持某个方法
document.queryCommandSupported();//返回一个布尔值，表示当前是否可用某种样式改变
document.getSelection();//获取选中的内容，和window.selection一样


//--------------------Element节点，即各个html元素节点--------------------

//(1)Element的特性属性
Element.id;//id属性，区分大小写
Element.tagName;//标签名称
Element.dir;//元素节点中的文本方向，和document.dir类似
Element.accessKey;//用于读写分配给当前元素的快捷键
Element.draggable;//元素是否可拖动，可读写
Element.lang;//元素的语言设置，可读写
Element.tabIndex;//当前元素在 Tab 键遍历时的顺序，为-1的话表示不会tab到此元素
Element.title;//元素的title属性

//(2)Element的状态属性
Element.hidden;//元素是否可见（可读写），注意与CSS设置是独立的，而且CSS的设置级别更高，即如果CSS中设置display:none，那么设置了Element.hidden=false也没用
Element.contentEditable;//元素的内容是否可编辑（可读写）
Element.isContentEditable;//返回元素的内容是否可编辑（只读）
Element.attributes;//返回类数组对象，包含元素的各个HTML属性（即在元素开始标签上写了的属性，注意要与对象的属性区分开哦）
Element.className;//返回元素的class属性值
Element.classList;//返回一个类数组对象，可以用来获取class属性值中class的个数，以及对class进行增删改等操作
Element.dataset;//返回一个对象，包含元素的所有“data-”前缀的自定义属性，可以用来读写这些自定义属性
Element.innerHTML;//返回元素内部的html代码（可读写）
Element.outerHTML;//返回包含元素在内的所有html代码（可读写），注意当元素没有父元素时，使用outerHTML来赋值会报错
Element.style;//用于读取元素的style属性，但不能读写class里设置的style
Element.children;//返回一个类数组对象，包含元素的所有子元素。注意这个只包含元素节点，不包含其他类型的节点
Element.childElementCount;//返回子元素的个数，与Element.children.length一样
Element.firstElementChild;//返回当前元素的第一个元素子节点
Element.lastElementChild;//返回最后一个元素子节点
Element.nextElementSibling;//返回当前元素节点的后一个同级元素节点
Element.previousElementSibling;//返回当前元素节点的前一个同级元素节点

//(3)Element的长度、距离属性
Element.clientHeight;//以盒模型来看，返回的是元素边框内在浏览器客户端显示的高度（即content的显示高度和padding加起来）
Element.scrollHeight;//以盒模型来看，返回的是元素边框内的滚动高度（即content的实际高度和padding加起来）
/**
 *  单位：px，且始终为整数
 *  只对块级元素有效，行内元素始终返回0
 *  如果有水平滚动条，还要减去水平滚动条的高度
 *  注意document.documentElement（即html元素节点）的clientHeight为浏览器窗口高度（即视口高度），document.body.clientHeight才是内容的实际高度，都不包含滚动条。
 *  注意document.documentElement.scrollHeight和document.body.scrollHeight一样
 *  元素的scrollHeight只包含元素的content实际高度和padding。就算设置overflow:hidden，返回的也包含了溢出的部分
 * */
Element.clientWidth;//与clientHeight类似，只不过一个是高度，一个是宽度
Element.scrollWidth;//与scrollHeight类似，只不过一个是高度，一个是宽度
Element.clientLeft;//返回元素的左侧边框的宽度
Element.clientTop;//返回元素的顶部边框的宽度
Element.scrollLeft;//返回元素水平滚动条，距离元素边框内，左侧的距离（可读写，当然要存在水平滚动条才能生效）
Element.scrollTop;//返回元素垂直滚动条，距离元素边框内，顶部的距离（可读写，当然要存在垂直滚动条才能生效）
Element.offsetParent;//返回最靠近当前元素，且CSS属性中position不为'static'的上层元素。
/**
 * 该属性主要用于确定子元素位置偏移的计算基准，Element.offsetTop和Element.offsetLeft就是offsetParent元素计算的
 * 如果元素是不可见的（display属性为none），或者位置是固定的（position属性为fixed），则offsetParent属性返回null
 * 如果元素的所有上层节点的position属性都是static，则Element.offsetParent属性指向<body>元素
 * */
Element.offsetHeight;//以盒模型来看，返回的是元素除了margin以外的在浏览器客户端显示的高度（即content的显示高度、padding、滚动条、border加起来）
Element.offsetWidth;//与offsetHeight类似，只不过一个是高度，一个是宽度
Element.offsetLeft;//返回元素距离其offsetParent边框内，左侧的距离
Element.offsetTop;//返回元素距离其offsetParent边框内，顶部的距离

//(4)Element的操作HTML属性的方法（这是操作HTML属性的标准方法，一般来说最好都用这个）
Element.hasAttributes();//返回元素是否有HTML属性
Element.hasAttribute();//返回元素是否有某个HTML属性
Element.getAttribute();//获取元素的某个HTML属性值
Element.setAttribute();//设置元素的某个HTML属性值
Element.removeAttribute();//删除元素的某个HTML属性值
Element.getAttributeNames();//返回当前元素的所有HTML属性的名称

//(5)Element的常规方法
Element.querySelector();
Element.querySelectorAll();
Element.getElementsByClassName();
Element.getElementsByTagName();//这4个方法与document的方法一样，不同点在于查询的范围在元素内部
Element.closest();//参数为CSS选择器，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）
Element.matches();//参数为CSS选择器，返回此元素是否匹配对应的选择器
Element.addEventListener();
Element.removeEventListener();
Element.dispatchEvent();//这3个方法与document的方法一样，不同点在于事件的目标是当前元素，而不是document了
Element.scrollIntoView();//滚动元素到浏览器的可视区域
Element.getBoundingClientRect();//返回一个对象，包含元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息
Element.getClientRects();//返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的Rect用的是复数）。每个矩形都有bottom、height、left、right、top和width六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度
Element.insertAdjacentElement();//在相对于当前元素的指定位置，插入一个新的元素节点
Element.insertAdjacentHTML();
Element.insertAdjacentText();
Element.remove();//移除此元素节点
Element.focus();//用于将当前页面的焦点，转移到此元素上
Element.blur();//用于将焦点从当前元素移除
Element.click();//在当前元素上模拟一次点击


//---------------------------DOM事件-----------------------------

//(1)EventTarget接口
//---事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。
//---DOM 支持大量的事件，DOM 的事件操作（监听、触发）都定义在EventTarget接口，主要提供了以下三个方法
EventTarget.addEventListener();//添加事件监听，可为同个元素的同个事件添加不同的监听函数，顺序执行。若重复添加相同的监听函数，则只会保留一个。
EventTarget.removeEventListener();//移除事件监听，必须是同个元素的同个事件的同个监听函数才能成功移除
EventTarget.dispatchEvent();//参数为Event对象，用于触发对应的事件

//(2)事件模型（为事件绑定监听函数的 3 种方式）
//---HTML中通过onclick等on属性：只会在冒泡阶段执行，如<button onclick="click()"></button>
//---元素节点的事件属性：如element.onclick=function(){ }
//---EventTarget.addEventListener()：每个DOM元素节点都实现了EventTarget接口，都可以用这个绑定事件的监听函数，默认在冒泡阶段触发事件，而且更加灵活便利，更为推荐。

//(3)监听函数内部的this指向的是对应的DOM元素节点对象，且事件会在子元素和父元素之间传播，传播阶段分为以下 3 个：
//---第一阶段：从window对象传播到目标节点（上层传到底层），捕获事件，称为【捕获阶段】
//---第二阶段：在目标节点上触发，触发事件，称为【目标阶段】
//---第三阶段：从目标节点传播回window对象（底层传到上层），事件冒泡，会导致同个事件在多个节点上触发，称为【冒泡阶段】
//---监听函数默认在【冒泡阶段】执行，通过addEventListener可以指定在什么阶段执行监听函数

//(4)事件代理
//---由于事件的存在冒泡阶段，所以可以把事件的监听函数设置父元素上，这样有多个子元素的就不用重复设置了，这种方法称为【事件代理】
event.stopPropagation();//阻止事件的传播
event.stopImmediatePropagation();//使事件不再触发，但当前的还是会触发
event.preventDefault();//完全取消这个事件，就像没有发生过

//(5)Event对象
//---事件触发时，会生成一个事件对象，作为参数传给监听函数。所有的事件对象都是Event对象的实例
//---Event对象本身是一个构造函数，可以用来生成event对象实例。注意和document.createEvent()的使用要区分开
var event = new Event('click', {//事件种类
    bubbles: true,//是否冒泡，默认false，事件只能在捕获阶段执行监听函数，而addEventListener添加的监听函数默认在冒泡阶段执行，所以一般得设为true
    cancelable: false//是否可取消
})
document.dispatchEvent(event);//触发事件。可以用目标元素的dispatchEvent()方法触发对应的事件
event.preventDefault();//取消事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。

//(6)Event实例对象的属性
event.type;//事件的类型
event.bubbles;//返回是否冒泡（只读）
event.cancelable;//返回是否可取消（只读）
event.eventPhase;//事件所处的阶段（0：未发生，1：捕获阶段，2：目标阶段，3：冒泡阶段）
event.cancelBubble;//是否可阻止冒泡（可读写）
event.defaultPrevented;//返回是否被取消
event.target;//指向事件的目标节点。如click事件中，始终指向被点击的节点
event.currentTarget;//指向事件在捕获阶段或冒泡阶段时，监听函数对应的当前节点。如click事件中，可能是被点击的节点，也可能是其父节点
event.timeStamp;//返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的
event.isTrusted;//返回事件是否是用户产生的，而不是利用脚本产生的
event.detail;//这个只有浏览器的 UI （用户界面）事件才具有。比如对于click和dblclick事件，Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数

//(7)Event实例对象的方法
event.preventDefault();//取消浏览器对当前事件的默认行为。前提是event.cancelable为true，并且不会阻止事件的传播
event.stopPropagation();//阻止事件的在DOM之间的传播。不会触发其他节点上的事件监听函数，但事件还是会触发当前节点的各个监听函数
event.stopImmediatePropagation();//立即阻止事件的传播。阻止同一个事件的其他监听函数被调用，不论是哪个节点。
event.composedPath();//返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点
event.initEvent();//用于初始化通过document.createEvent()方法生成的事件。注意new Event()生成的事件相对于已经执行了这个了


//-----------------------------鼠标事件----------------------------

//(1)鼠标事件的种类
"click";//鼠标单击（这里通常是左键）
"dblclick";//鼠标双击
"mousedown";//鼠标按下
"mouseup";//释放按下的鼠标
"mousemove";//鼠标移动
"mouseenter";//鼠标进入目标节点时触发，进入其子节点时不触发
"mouseover";//鼠标进入目标节点时触发，进入其子节点时也会触发
"mouseout";//鼠标离开目标节点时触发，离开其子节点也会触发
"mouseleave";//鼠标离开目标节点时才触发，离开其子节点不会触发
"contextmenu";//浏览器上下文菜单出现前触发（通常是按鼠标右键，或者按上下文菜单按钮时）
"wheel";//鼠标滚轮滚动

//(2)MouseEvent对象
var mouseEvent = new MouseEvent('click', {//鼠标事件种类
    screenX: 0,//鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
    screenY: 0,//鼠标相对于屏幕的垂直位置（单位像素），默认值为0，设置该属性不会移动鼠标。
    clientX: 0,//鼠标相对于程序窗口的水平位置（单位像素）
    clientY: 0,//鼠标相对于程序窗口的垂直位置（单位像素）
    ctrlKey: false,//是否同时按下了ctrl键
    shiftKey: false,//是否同时按下了shift键
    altKey: false,//是否同时按下了alt键
    metaKey: false,//是否同时按下了meta键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
    button: 0,//按下了鼠标上的哪一个键（0：主键[通常为左键]，1：辅助键[通常为中间键]，2：次要键[通常为右键]）
    buttons: 0,//按下了鼠标上的哪些键（0：没有按下任何键，1：主键[通常为左键]，2：次要键[通常为右键]，3：同时按下了左键和右键，4：辅助键[通常为中间键]）
    relatedTarget: null//节点对象
})
mouseEvent.screenX;
mouseEvent.screenY;
mouseEvent.clientX;
mouseEvent.clientY;
mouseEvent.altKey;
mouseEvent.ctrlKey;
mouseEvent.metaKey;
mouseEvent.shiftKey;
mouseEvent.button;
mouseEvent.buttons;
mouseEvent.movementX;//返回当前位置与上一个mousemove事件之间的水平距离（单位像素）
mouseEvent.movementY;//返回当前位置与上一个mousemove事件之间的垂直距离（单位像素）
mouseEvent.offsetX;//返回鼠标位置与目标节点左侧的padding边缘的水平距离（单位像素）
mouseEvent.offsetY;//返回鼠标位置与目标节点左侧的padding边缘的垂直距离（单位像素）
mouseEvent.pageX;//返回鼠标位置与文档左侧边缘的距离（单位像素）
mouseEvent.pageY;//返回鼠标位置与文档顶部边缘的距离（单位像素）
mouseEvent.relatedTarget;//返回事件的相关节点
mouseEvent.getModifierState();//参数为表示功能键的字符串，返回是否按下了指定的键，如大写键“CapsLock”

//(3)WheelEvent对象
var wheelEvent = new WheelEvent('wheel', {
    deltaX: 0.0,//滚轮的水平滚动量
    deltaY: 0.0,//滚轮的垂直滚动量
    deltaZ: 0.0,//滚轮的Z轴滚动量
    deltaMode: 0,//表示相关的滚动事件的单位（0：像素，1：行，2：页）
})


//--------------------------键盘事件-----------------------

//(1)键盘事件的种类
"keydown";//按下键盘
"keypress";//按下有值的键。如Ctrl、Alt、Shift、Meta等不会触发。后于“keydown”触发
"keyup";//释放按下的键盘
//---当一直按着键很久才放，就会触发"keydown"-"keypress"-"keydown"-"keypress"-......-"keyup"

//(2)KeyboardEvent对象
var keyboardEvent = new KeyboardEvent('keydown', {
    key: '',//当前按下的键
    code: '',//当前按下的键的字符串形式
    location: '',//当前按下的键的位置
    ctrlKey: false,//是否同时按下了ctrl键
    shiftKey: false,//是否同时按下了shift键
    altKey: false,//是否同时按下了alt键
    metaKey: false,//是否同时按下了meta键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
    repeat: false,//是否重复按键
})
KeyboardEvent.getModifierState();//返回一个布尔值，表示是否按下或激活指定的功能键。它的常用参数如下。
"Alt";//Alt 键
"CapsLock";//大写锁定键
"Control"//Ctrl 键
"Meta";//Meta 键
"NumLock";//数字键盘开关键
"Shift";//Shift 键


//-------------------------进度事件---------------------------

//(1)进度事件的种类
//---进度事件是用来描述资源加载（或文件上传）的进度的。主要由 AJAX 请求、<img>、<audio>、<video>、<style>、<link>等外部资源的加载触发，继承了ProgressEvent接口
"abort";//用户终止资源加载。由于错误导致终止的话不属于这个事件
"error";//由于错误导致资源无法加载
"load";//加载成功
"loadstart";//开始加载
"loadend";//结束加载。后于abort、error、load触发
"progress";//正在加载。在加载过程中不断触发
"timeout";//加载超时

//(2)ProgressEvent对象
var progressEvent = new ProgressEvent('load', {
    lengthComputable: false,//加载的总量是否可以计算
    loaded: 0,//已经加载的量
    total: 0,//需要加载的量。前提是lengthComputable为true
})


//------------------------表单事件-------------------------

//(1)表单事件的种类
"input";//当<input>、<select>、<textarea>的值发生改变时触发。input事件会连续触发，比如用户每按下一次按键，就会触发一次input事件
"select";//当在<input>、<textarea>里面选中文本时触发
"change";//当<input>、<select>、<textarea>的值发生改变时触发。change事件不会连续触发，比如输入汉字时，得字输入完确定后才会触发change
"invalid";//当表单元素的值不满足校验条件时触发
"reset";//当<form>的所有值重置为默认值时触发
"submit";//当<form>提交时触发

//(2)InputEvent对象（主要用来描述input事件）
var inputEvent = new inputEvent('input', {
    inputType: 'insertText',//发生变更的类型
    data: '',//插入的字符串
    dataTransfer: '',//插入的富文本
})


//------------------------触摸事件-------------------------

//(1)触摸事件的种类
"touchstart";//开始触摸
"touchend";//结束触摸
"touchmove";//移动触摸点
"touchcancel";//触摸点取消时触发

//(2)触摸操作
//---浏览器的触摸API分为三个部分：
"Touch";//一个触摸点。可能是一根手指，也可能是一根触摸笔。
"TouchList";//多个触摸点的集合，是个类数组对象，包含了多个Touch
"TouchEvent";//触摸事件

//(3)Touch对象
var touch = new Touch({
    identifier: '',//触摸点的唯一id
    target: null,//触摸的目标节点
    clientX: 0,//触摸点距离程序窗口的水平距离
    clientY: 0,//触摸点距离程序窗口的垂直距离
    screenX: 0,//触摸点距离屏幕的水平距离
    screenY: 0,//触摸点距离屏幕的垂直距离
    pageX: 0,//触摸点距离网页文档的水平距离
    pageY: 0,//触摸点距离网页文档的垂直距离
    radiusX: 0,//触摸点周围受到影响的椭圆范围的 X 轴半径
    radiusY: 0,//触摸点周围受到影响的椭圆范围的 Y 轴半径
    rotationAngle: 0,//触摸点周围受到影响的椭圆的旋转角度，0~90度
    force: 0,//触摸点的压力值，0~1
})

//(4)TouchEvent对象
var touchEvent = new TouchEvent('touchmove', {
    touches: [],//TouchList实例，代表所有的当前处于活跃状态的触摸点
    targetTouches: [],//TouchList实例，代表所有处在触摸的目标元素节点内部、且仍然处于活动状态的触摸点
    changedTouches: [],//TouchList实例，代表本次触摸事件的相关触摸点
    ctrlKey: false,//是否同时按下了ctrl键
    shiftKey: false,//是否同时按下了shift键
    altKey: false,//是否同时按下了alt键
    metaKey: false,//是否同时按下了meta键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
})


//------------------------拖拽事件---------------------------

//(1)拖拽事件的种类
"drag";//拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）（事件对象：被拖拉的节点）
"dragstart";//开始拖拽（事件对象：被拖拉的节点）
"dragend";//结束拖拽（事件对象：被拖拉的节点）
"dragenter";//拖拽进入目标节点时触发（事件对象：用于放置被拖拉的节点的节点，称为目标节点）
"dragover";//拖拽到目标节点上时触发（事件对象：目标节点）
"dragleave";//拖拉操作离开目标节点时触发（事件对象：目标节点）
"drop";//被拖拉的节点或选中的文本，释放到目标节点时触发（事件对象：目标节点）

//(2)注意点
//---拖拽时，鼠标事件等不会发生，只会发生拖拽事件
//---为了让目标节点能接受拖拽的节点，需要阻止目标节点的默认的dropover事件，因为默认不允许放置节点

//(3)DataTransfer对象
//---所有拖拉事件的实例都有一个DragEvent.dataTransfer属性，用于读写需要传递的数据
var dataTransfer = new DataTransfer();
dataTransfer.dropEffect;//用来设置放下（drop）被拖拉节点时的效果，会影响到拖拉经过相关区域时鼠标的形状
'copy';//复制被拖拉的节点
'move';//移动被拖拉的节点
'link';//创建指向被拖拉的节点的链接
'none';//无法放置被拖拉的节点
dataTransfer.effectAllowed;//设置本次拖拉中允许的效果
'copy';//复制被拖拉的节点
'move';//移动被拖拉的节点
'link';//创建指向被拖拉节点的链接
'copyLink';//允许copy或link
'copyMove'//允许copy或move
'linkMove'//允许link或move
'all'//允许所有效果
'none'//无法放下被拖拉的节点
'uninitialized'//默认值，等同于all
dataTransfer.files;//一个 FileList 对象，包含一组本地文件，可以用来在拖拉操作中传送（可以用来实现图片拖拽上传效果）
dataTransfer.types;//一个只读的数组，每个成员是一个字符串，里面是拖拉的数据格式（通常是 MIME 值）。比如，如果拖拉的是文字，对应的成员就是text/plain
dataTransfer.items;//一个类似数组的只读对象，每个成员就是本次拖拉的一个对象
dataTransfer.setData();//设置拖拽时的数据
dataTransfer.getData();//获取指定的数据
dataTransfer.clearData();//清除指定的数据
dataTransfer.setDragImage();//用于设置拖拽过程中，显示的图片，用于跟随鼠标一起移动，表示被拖动的节点。（浏览器会自动创建，我们通过这个可以自定义）


//----------------------其他事件-------------------------

//(1)资源事件
"beforeunload";//在窗口、文档、各种资源将要卸载前触发。通常用于窗口关闭时提示，如下：
window.addEventListener('beforeunload', function (event) {
    event.returnValue = '你确定离开吗？';
})
"unload";//在窗口关闭或者document对象将要卸载时触发
"load";//在页面或某个资源加载成功时触发
"error";//事件是在页面或资源加载失败时触发。
"abort";//事件在用户取消加载时触发

//(2)session历史事件（默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面）
"pageshow";//在页面加载时触发，包括第一次加载和从缓存加载两种情况（后于load事件触发）
"pagehide";//在离开页面时触发
"popstate";//在浏览器的history对象的当前记录发生显式切换时触发
"hashchange";//在 URL 的 hash 部分（即#号后面的部分，包括#号）发生变化时触发，其事件实例具有两个特有属性：oldURL属性和newURL属性

//(3)网页状态事件
"DOMContentLoaded";//网页下载并解析完成以后，即DOM结构解析完成（先于load事件触发）
"readystatechange";//当 Document 对象和 XMLHttpRequest 对象的 readyState 属性发生变化时触发

//(4)窗口事件
"scroll";//在文档或文档元素滚动时触发，主要出现在用户拖动滚动条
"resize";//改变浏览器窗口大小时触发，主要发生在window对象上面
"fullscreenchange";//在进入或推出全屏状态时触发，该事件发生在document对象上面
"fullscreenerror";//事件在浏览器无法切换到全屏状态时触发

//(5)剪切板事件
"cut";//将选中的内容从文档中移除，加入剪贴板时触发
"copy";//进行复制动作时触发
"paste";//剪贴板内容粘贴到文档后触发

//(6)焦点事件
"focusin";//元素节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡
"focus";//元素节点获得焦点后触发，该事件不会冒泡
"focusout";//元素节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡
"blur";//元素节点失去焦点后触发，该事件不会冒泡

//(7)自定义事件
var customEvent = new CustomEvent('fly', {
    detail: null,//事件的附带属性
})