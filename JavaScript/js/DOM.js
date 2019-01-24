//--------------------DOM：文档对象模型（Document Object Model）-----------------------

//(1)DOM是JavaScript操作网页的接口，它的作用就是将网页转成一个JavaScript对象，从而进行各种操作

//(2)DOM只是一个接口规范，并不只属于JavaScript，可以用任何语言实现，只是JavaScript是最常用于DOM操作的语言，实现了DOM规范
//---DOM中的节点在JavaScript中都有对应的对象进行描述，所以一般说节点，也就是说一个对象，而所有的都继承于Node对象

//(3)节点
//---DOM的最小组成单元，就是节点（node）。各个节点组成了DOM树
//---节点的类型有7种，而且都继承于一个浏览器提供的原生节点Node对象：
//---Document：DOM树的顶层节点，如document
//---DocumentType：doctype标签，如<!DOCTYPE html>
//---Element：网页中的各个标签元素，如<html>、<body>等。我们知道元素有开始标签、内容、结束标签组成，而元素实际上就是元素节点，我们只是为了方便叫，就直接叫元素，而不叫元素节点了。
//---Attribute：网页中各个标签元素的属性，如class="right"
//---Text：标签之间或标签之内包含的文本
//---Comment：注释
//---DocumentFragment：文档片段

//(4)节点树
//---document：是浏览器原生提供的对象，代表整个文档，即节点树
//---节点树的第一层只有一个元素（Element）节点<html>标签，即根元素节点root node，所以在css中可以用:root{}来指代html{}
//---除了根节点外，其余节点都有父节点关系（parentNode）、子节点关系（childNodes）、同级节点关系（sibling）


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

