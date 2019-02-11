//=================ajax请求=====================

//---------------------AJAX的作用---------------------------

//(1)浏览器与服务器之间通过HTTP协议通信，浏览器允许js向服务器发送http请求

//(2)AJAX包括以下几个步骤：
//---创建AJAX对象（通常是XMLHttpRequest对象，但IE低版本只能用ActiveXObject对象，好在jQuery封装的ajax方法，已经处理了这个问题）
//---发出http请求
//---接收服务器返回的数据
//---更新网页


//-----------------------AJAX的基本流程------------------------------

//(1)创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();

//(2)指定通信过程中状态改变时的回调函数
xhr.onreadystatechange = function () {
    // 通信成功时，状态值为4
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
};

//(3)通信失败时的回调
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};

//(4)open方式用于指定HTTP动词、请求的网址、是否异步
xhr.open('GET', '/endpoint', true);

//(5)发送HTTP请求
xhr.send(null);


//-----------------------XMLHttpRequest对象------------------------------

//(1)XMLHttpRequest对象的实例属性
xhr.readyState;//只读，表示ajax请求实例的当前状态
0 || "UNSENT"//表示已new，未open()
1 || "OPENED"//表示已open()，未send()，可以使用setRequestHeader()，设定HTTP请求的头信息
2 || "HEADERS_RECEIVED";//表示已send()，并且头信息和状态码已经收到
3 || "LOADING"//表示正在接收服务器传来的body部分的数据，如果responseType属性是text或者空字符串，responseText就会包含已经收到的部分信息
4 || "DONE"//表示服务器数据已经完全接收，或者本次接收已经失败了
xhr.responseType;//指定服务器返回的数据的类型
"";//默认字符串
"arrayBuffer";//ArrayBuffer对象
"blob";//Blob对象（常常是二进制文件，如图片）
"document";//Document对象（可以是XML文档）
"json";//JSON对象
"text";//字符串（大多数情况是这个）
xhr.response;//只读，返回从服务器接收到的数据体（即body部分），具体的类型由xhr.responseType属性决定
xhr.responseText;//只读，返回从服务器接收到的字符串||null，只有 HTTP 请求完成接收以后，该属性才会包含完整的数据
xhr.responseXML;//返回从服务器接收到的Document对象||null（如果服务器没有指定Content-Type为text/xml,则可以用overrideMimeType()方法将数据转成xml）
xhr.responseURL;//发送数据的服务器的网址
xhr.status;//返回本次请求所得的http状态码，只有2xx和304代表服务器正常
200;//正常访问
301;//永久移动
302;//暂时移动
304;//未修改，利用这个可以加快资源的请求，如果每次请求都命中304，则资源会从缓存中读取，这样加载会很快
307;//暂时重定向
401;//未授权
403;//禁止访问
404;//未发现指定网址
500;//服务器错误
xhr.statusText;//返回完整http状态的字符串，如"200 OK"
xhr.timeout;//整数，设置这个可以实现多少毫秒后，无论请求怎么样了，都会自动结束请求，如果设为0，则没有时间限制
xhr.withCredentials;//true/false，表示跨域请求时，是否向服务器发送用户信息（如Cookie和http头信息），默认false
xhr.upload;//文件上传时，返回一个upload对象，用于监听上传过程的各种事件：loadstart、loadend、load、abort、error、progress、timeout

//(2)XMLHttpRequest对象实例的事件监听属性
xhr.onreadystatechange = function () {//监听实例的readyState属性变化
    if (xhr.readyState !== 4 || xhr.status !== 200) {
        return;
    }
};
xhr.onloadstart = function () { };//请求发出时
xhr.onprogress = function () { };//正在发送和加载数据
xhr.onabort = function () { };//请求被终止，比如用户调用了xhr.abort()
xhr.onerror = function () { };//请求失败
xhr.onload = function () { };//请求成功完成
xhr.ontimeout = function () { };//用户指定的时间到了，请求还未完成
xhr.onloadend = function () { };//请求结束（不管成功还是失败）

//(3)XMLHttpRequest对象的实例方法
xhr.open(method, url, async, user, password);//初始化XMLHttpRequest对象的实例，指定 HTTP 请求的参数。
//---参数依次是请求方式（GET/POST）,请求的地址,是否异步（默认true）,用于认证的用户名（默认‘’）,用于认证的密码（默认‘’）
//---需要注意如果对已经使用过open的xhr再使用open方法，则相当于xhr.abort()
xhr.setRequestHeader('Content-Type', 'application/json');//设置http头信息，注意必须在open()后，send()前
xhr.overrideMimeType('text/plain; charset=x-user-defined');//覆盖服务器返回的数据的MIME类型，注意必须在open()后，send()前
xhr.send(data);//实际发出http请求，data为包含具体数据的信息体，支持多种格式（即reponseType中的所有格式）
xhr.getAllResponseHeaders();//获取服务器发来的所有http头信息
xhr.getResponseHeader(str);//获取指定参数的http头信息
xhr.abort();//终止已经发送出去的请求


//-----------------------同源政策----------------------------

//(1)1995年，由Netspace公司引入浏览器，最初含义是指它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页“同源”。
//---同源包括：协议相同、域名相同、端口相同
//---现在cookie的同源不要求协议相同了

//(2)目的：保证用户信息的安全，防止恶意的网站窃取数据

//(3)限制范围：随着浏览器的发展，同源政策不仅限制cookie的读取，还限制了其他数据的读取
//---无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB
//---无法接触非同源网页的 DOM
//---无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）

//(4)父子窗口数据交互方法
//---利用片段识别符，即#，修改时不会刷新网页，实现hash值的传递
//---HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信postMessage()

//(5)解决同源政策无法向非同源地址发送 AJAX 请求的方法
//---JSONP
//---WebSocket
//---CORS

//(6)JSONP
//---基本思想是，网页通过添加一个<script>元素，向服务器请求 JSON 数据，这种做法不受同源政策限制，但只支持GET请求；
//---服务器收到请求后，将数据放在一个指定名字的回调函数里传回来，所以script标签中的地址必须有callback参数，用来指定回调函数的名字，这对于 JSONP 是必需的

//(7)WebSocket
//---WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀，该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

//(8)CORS
//---CORS是W3C的一个标准，跨域资源共享，属于跨源 AJAX 请求的根本解决方法。
//---它允许浏览器向跨域的服务器，发出XMLHttpRequest请求，从而克服了 AJAX 只能同源使用的限制
//---相比 JSONP 只能发GET请求，CORS 允许任何类型的请求
//---CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能
//---整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与普通的 AJAX 通信没有差别，代码完全一样

//(9)CORS分为简单请求和非简单请求
//---原因是以前表单请求都可以跨域，所以把原来的表单请求作为简单请求，其他的作为复杂请求，以便做不同的处理。
//---如果不做区分，那么开发者很可能把请求都转成表单请求，这样CORS的作用就不存在了

//(10)简单请求
//---要求
"GET" || "POST" || "HEAD";//请求方法只能是这几个
"Accept" || "Accept-Language" || "Content-Language" || "Last-Event-ID" || "Content-Type";//请求头不超过这几个，且Content-Type只能为：application/x-www-form-urlencoded（默认）、text/plain、multipart/form-data
//---简单请求，浏览器会在请求头添加一个Origin字段，用来说明本次请求来自哪个域（协议 + 域名 + 端口）
"Origin:http://api.bob.com"
//---简答请求，服务器必须在响应头中返回以下字段，
"Access-Control-Allow-Origin: http://api.bob.com";//值必须为Origin对应的值，或者*表示任意都可以
"Access-Control-Allow-Credentials:true";//是否允许发送 Cookie
"Access-Control-Expose-Headers:FooBar";//指定浏览器可以获取的其他header信息，默认只能获取6个服务器返回的基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma

//(11)非简单请求
//---不符合简单请求的要求的，都属于非简单请求。
//---在进行非简单请求时，浏览器会先进行一次预检测请求，主要是看服务器是否支持，避免服务器收到大量DELETE和PUT请求，这些传统的表单不可能跨域发出的请求。
//---预检测请求，请求方法为OPTIONS，表示这个请求是用来询问的，浏览器会在请求头添加一些信息，如下
"Origin:http://api.bob.com";//发送的源
"Access-Control-Request-Method:PUT";//即将发生的请求采取的方法
"Access-Control-Request-Headers:X-Custom-Header";//自定义的请求头
//---预检测请求，服务器进行响应，在响应头中返回以下字段，如果不通过，则不能发送请求
"Access-Control-Allow-Origin: http://api.bob.com";//值必须为Origin对应的值，或者*表示任意都可以
"Access-Control-Allow-Methods:GET, POST, PUT";//支持的请求方法
"Access-Control-Allow-Headers:X-Custom-Header";//支持的自定义请求头
"Access-Control-Allow-Credentials:true";//是否允许发送 Cookie
"Access-Control-Max-Age:1728000";//预检测的有效期，单位秒，在此期间，不用发出另一条预检请求。
