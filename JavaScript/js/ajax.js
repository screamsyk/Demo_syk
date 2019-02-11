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
xhr.withCredentials;//true/false，表示跨域请求时，是否向服务器发送用户信息（如Cookie和http头信息）
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

//(4)文件上传（编码类型Encoding type）
//---Content-Type: application/x-www-form-urlencoded（默认）
//---Content-Type: text/plain
//---Content-Type: multipart/form-data