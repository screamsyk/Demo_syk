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
document.activeElement;//获取当前焦点的元素节点，如<input>、<textarea>等，没有则返回<body>节点或null
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
document.createEvent();//创建一个事件对象，参数是事件类型（参考http://wangdoc.com/javascript/events/index.html）
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