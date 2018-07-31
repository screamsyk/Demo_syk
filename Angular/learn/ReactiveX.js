//-------------RxJS入门-----------------

//(1)ReactiveX编程理念：来自微软的一种针对异步数据流的编程理念。基本内容如下：
//---将所有的数据（如HTTP请求、DOM数据、普通数据等）包装成“流”的形式
//---利用丰富的操作符对“流”进行处理，实现以同步的方式，处理异步的数据。（避免了回调地狱）

//(2)RxJS就是ReactiveX编程理念的JavaScript实现，而“流”在RxJS中就是Observable类型的对象（称为可观察序列）

//(3)Observable与ES6中的Promise很相似，但可以说是Promise的升级版本，两者也可以相互转化

//---Observable的写法：（变量名的末尾是$，用于表示这是一个Observable对象）
const observable$ = http.get(url);//http请求得到一个Observable对象，当然要想得到，http.get方法是特定封装好的
observable$.subscribe(data => console.log(data));//通过“订阅”，而得到数据，（注意必须订阅了，http.get方法才会执行）

//---Promise的写法：
const promise = http.get(url);
promise.then(data => console.log(data));

//---Observable转Promise：
const promise_new = observable.toPromise();//Observable实例方法

//---Promise转Observable：
const observable_new = Observable.fromPromise(promise);//Observable静态方法


//-----------------Observable对象的具体使用--------------------------

//(1)创建一个Observable实例
const ob = Observable.of(1, 2, 3, 4, 5);//将普通数据封装成流（称为可观察序列，observable）

//(2)订阅：获取数据
ob.subscribe(data => console.log(data));//subscribe方法的参数为一个函数，相当于下面的对象的next方法
ob.subscribe({//subscribe方法的参数为一个对象（称为观察者，observer）
    next: data => console.log(data),
    error: error => console.log(error),
    complete: () => console.log("流结束")
});

//(3)创建Observable实例（可观察序列）的方法有很多：
Observable.of(1, 2, 3, 4);//将普通的js数据转为可观察序列
Observable.fromPromise(promise);//将Promise对象转换为Observable对象
Observable.fromEvent(element, eventName);//从DOM事件创建可观察序列，就可以用来监测DOM事件
Observable.ajax(url || AjaxRequest);//http请求
Observable.create(observer => {//create是个创建Observable实例的万能方法，但很少用，参数为一个对象（也就是之前的观察者observer）
    observer.onNext("放置数据");
    observer.onCompleted();
    return () => console.log("结束");
});
//---除了上面这些，有的插件如Angular中的rxjs，封装的对应的方法用来创建Observable实例

//(4)合并序列，常用于合并ajax请求
const ob1 = Observable.ajax(url1);
const ob2 = Observable.ajax(url2);
Observable.concat(ob1, ob2).subscribe(data => console.log("用concat合并序列：按顺序发送请求，前一个请求完成才发下一个，每个请求都触发回调"));
Observable.merge(ob1, ob2).subscribe(data => console.log("用merge合并序列：所有请求一起发送，每个请求都会触发回调"));
Observable.forkJoin(ob1, ob2).subscribe(dataArray => console.log("用forkJoin合并序列：所有请求一起发送，当所有请求都完成时才触发回调，参数为数组"));

//(5)一些请求数据时的优化方案：
//---减少多余请求：可以利用setTimeout延迟执行，如果有新的请求要覆盖这次的，就用clearTimeout()把上次的清掉，就不会存在多余的请求了
//---已无用的请求还在执行，影响需要的数据的展示：可以用一个变量标识下最新的请求，如果返回的结果和最新的请求对应上了（需要后台配合），才展示对应的数据
//---利用RxJS这些优化方案就很好实现了
var text = document.querySelector('#text');
var inputStream = Rx.Observable.fromEvent(text, 'keyup');
inputStream.debounceTime(250)//减少多余请求，即防止误操作，时间为250ms
inputStream.pluck('target', 'value')//参数值
inputStream.switchMap(url => Http.get(url))//发送请求
inputStream.subscribe(data => render(data));//获取数据
