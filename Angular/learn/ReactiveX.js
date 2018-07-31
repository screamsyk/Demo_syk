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


//-------------------RxJS进阶（更深入的理解）-------------------------

//(1)Observable（可观察序列）是多个值的惰性推送集合，下面是常用数据的拉取和推送所用到的对象（拉取：消费者读取数据，推送：生产者发送数据）
//---单个值的拉取：Function
//---多个值的拉取：Iterator
//---单个值的推送：Promise
//---多个值的推送：Observable
var observable = Rx.Observable.create(function subscribe(observer) {//订阅后，利用特殊的观察者同步推送值1，2，3
    observer.next(1);//next()发送一个值，比如数字、字符串、对象，等等
    observer.next(2);
    observer.next(3);
    observer.complete();//complete()，之后不再发送任何值
    observer.error();//error()，发送一个 JavaScript 错误 或 异常
});
var subscription = observable.subscribe(x => console.log(x));//订阅
subscription.unsubscribe();//取消订阅

//(2)Observer（观察者）是一组回调函数的集合，用来对值执行发出和处理
var observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
};
observable.subscribe(observer);

//(3)Subject（主题）既是一种特殊的Observable，也是Observer，通常的Observable只能进行单播（把数据推送给单个观察者），而Subject可以进行多播（把数据推送给多个观察者）
var subject = new Rx.Subject(0);//初始值为0
subject.subscribe({//作为Observable可观察序列
    next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
});
subject.next(1);//作为Observer观察者，要给Subjetc提供新值，只要调用 next(theValue)，它会将值多播给已注册监听该Subject的观察者们
subject.next(2);

//(4)BehavoirSubject（行为主题）是Subject的一个变体，发送的值始终是最新的值
var subject = new Rx.BehaviorSubject(0); // 0是初始值

//(5)ReplaySubject（重演主题）和BehavoirSubject类似，不过可以通过缓存发送旧值
var subject = new Rx.ReplaySubject(3); //为新的订阅者缓冲3个值，这样下次有订阅时，就可以得到发送的最后3次发送的值了

//(6)AsyncSubject是Subject的一个变体，只有当执行 complete()后，它才会将执行的最后一个值发送给观察者。
var subject = new Rx.AsyncSubject();
