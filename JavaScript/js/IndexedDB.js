//---------------------IndexedDB------------------------

//(1)由于cookie作为存储时，容量小，数据操作不便捷等，所以HTML5为了方便客户端存储，提出来Web Storage API 和 IndexedDB

//(2)Web Storage API也就是我们常见的localStorage和sessionStorage，但其大小有限制且无法支持搜索。

//(3)IndexedDB是浏览器提供的本地数据库，允许储存大量数据，提供查找接口，还能建立索引，不属于关系型数据库，更类似于NoSQL数据库

//(4)IndexedDB的特点：
//---键值对存储。采用对象仓库（类似数据表）存储数据，每条数据记录是一个键值对，其中键独一无二，重复的话会报错
//---异步读写。IndexedDB读写数据时是异步的，不会阻塞js代码的执行，主要是为了防止大量数据的写入阻塞浏览器
//---支持事务。事务是指定义好一系列的操作，若其中一步操作失败，则事务取消，数据库回到事务的所有操作前的状态，这样能保证不会只改到一部分数据
//---同源限制。网页只能访问自身域名下面的indexedDB
//---存储空间大。一般localStorage的大小为2.5MB到10MB之间，可IndexedDB则至少有250MB，甚至没有上限。
//---支持二进制存储。能存储二进制数据（ArrayBuffer对象和Blob对象）

//(5)IndexedDB的相关概念：
//---IndexedDB操作接口。window.indexedDB作为操作IndexedDB的接口，即indexedDB对象
indexedDB.open('databaseName', 1);//打开或新建数据库
indexedDB.deleteDatabase('databaseName');//删除指定的数据库
indexedDB.cmp(0, 1);//-1，比较主键是否相同。0：相同，1：前者大于后者，-1：前者小于后者
//---操作请求：IDBRequest对象，表示打开的数据库连接，数据库的操作最终都是由它完成
IDBRequest.readyState;//pending：操作正在进行，done：操作完成
IDBRequest.result;//返回请求的结果。如果请求失败、结果不可用，读取该属性会报错
IDBRequest.error;//请求失败时，返回错误对象
IDBRequest.source;//返回请求的来源（比如索引对象或 ObjectStore）
IDBRequest.transaction;//返回当前请求正在进行的事务，如果不包含事务，返回null
IDBRequest.onsuccess = function (e) { console.log('操作成功') }
IDBRequest.onerror = function (e) { console.log('操作失败') }
IDBRequest.onblocked = function (e) { console.log('上次数据库连接仍有效') }
IDBRequest.onupgradeneeded = function (e) { console.log('数据库版本升级，或者新建数据库') }
//---数据库。IDBDatabase对象，一系列相关数据的容器，同个域名下可新建任意多个数据库，但只能存在一个版本的数据库
IDBDatabase.name;//数据库名称
IDBDatabase.version;//数据库当前版本
IDBDatabase.objectStoreNames;//数据库中所有对象仓库的名称的集合
IDBDatabase.onabort = function (e) { console.log('事务中止') }
IDBDatabase.onclose = function (e) { console.log('数据库意外关闭') }
IDBDatabase.onerror = function (e) { console.log('数据库访问报错') }
IDBDatabase.onversionchange = function (e) { console.log('数据库版本变化') }
IDBDatabase.close();//关闭数据库连接，实际会等所有事务完成后再关闭。
IDBDatabase.createObjectStore();//创建存放数据的对象仓库
IDBDatabase.deleteObjectStore();//删除指定的对象仓库
IDBDatabase.transaction();//返回一个指定对象仓库的 IDBTransaction 事务对象
//---对象仓库。IDBObjectStore对象，每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格
IDBObjectStore.name;//对象仓库的名称
IDBObjectStore.keyPath;//对象仓库的主键
IDBObjectStore.autoIncrement;//对象仓库的主键是否自增
IDBObjectStore.indexNames;//对象仓库中所有索引名称的集合
IDBObjectStore.transaction;//对象仓库所属的事务
IDBObjectStore.add();//添加数据记录。主键不能与已有的相同，如果与已有的相同得用put进行更新
IDBObjectStore.put();//更新数据记录。
IDBObjectStore.get();//获取指定主键的数据记录
IDBObjectStore.getAll();//获取多个数据记录
IDBObjectStore.delete();//删除指定主键的数据记录
IDBObjectStore.clear();//删除所有的数据记录
IDBObjectStore.count();//统计数据记录的数量
IDBObjectStore.getKey();//获取主键
IDBObjectStore.getAllKeys();//获取多个主键
IDBObjectStore.createIndex();//为指定字段创建索引
IDBObjectStore.index();//获取指定名称的索引
IDBObjectStore.deleteIndex();//删除指定名称的索引
IDBObjectStore.openCursor();//获取指针对象，用于遍历数据记录
IDBObjectStore.openKeyCursor();//获取主键的指针对象，用于遍历主键
//---事务。IDBTransaction对象，数据记录的读写和删改，都要通过事务完成，事务的执行顺序是由创建顺序决定的。事务对象提供error、abort和complete三个事件，用来监听操作结果。
IDBTransaction.db;//事务所属的数据库
IDBTransaction.error;//返回当前事务的错误
IDBTransaction.mode;//返回当前事务的模式，默认是readonly（只读），另一个值是readwrite
IDBTransaction.objectStoreNames;//返回事务涉及的对象仓库的名称集合
IDBTransaction.onerror = function (e) { console.log('事务失败') }
IDBTransaction.oncomplete = function (e) { console.log('事务完成') }
IDBTransaction.onabort = function (e) { console.log('事务中断') }
IDBTransaction.abort();//中断事务，回滚已进行的变更
IDBTransaction.objectStore();//返回指定名称的对象仓库 IDBObjectStore
//---索引。IDBIndex对象，为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引（逻辑指针，专门指向对应的数据记录的字段，这样就可以根据非主键的字段进行检索了）。
IDBIndex.name;//索引的名称。
IDBIndex.objectStore;//索引所在的对象仓库
IDBIndex.keyPath;//索引的主键。
IDBIndex.multiEntry;//布尔值，针对keyPath为数组的情况，如果设为true，创建数组时，每个数组成员都会有一个条目，否则每个数组都只有一个条目
IDBIndex.unique;//布尔值，表示创建索引时是否允许相同的主键
IDBIndex.count();//统计数据记录的数量
IDBIndex.get();//获取指定主键的数据记录
IDBIndex.getAll();//获取多个数据记录
IDBIndex.getKey();//获取主键
IDBIndex.getAllKeys();//获取多个主键
IDBIndex.openCursor();//获取指针对象，用于遍历数据记录
IDBIndex.openKeyCursor();//获取主键的指针对象，用于遍历主键
//---指针： IDBCursor对象
IDBCursor.source;//返回正在遍历的对象仓库或索引
IDBCursor.direction;//指针遍历的方向
IDBCursor.key;//返回当前记录的主键
IDBCursor.value;//返回当前记录的值
IDBCursor.primaryKey;//若是对象仓库的指针，则等同于IDBCursor.key；若是索引的指针，则返回索引的位置值
IDBCursor.advance(n);//指针向前移动 n 个位置
IDBCursor.continue();//指针向前移动一个位置
IDBCursor.continuePrimaryKey();//该方法需要两个参数，第一个是key，第二个是primaryKey，将指针移到符合这两个参数的位置。
IDBCursor.delete();//用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
IDBCursor.update();//用来更新当前位置的记录
//---主键集合：IDBKeyRange对象，代表数据仓库（object store）里面的一组主键
IDBKeyRange.lower;//返回下限
IDBKeyRange.lowerOpen;//布尔值，表示下限是否为开区间（即下限是否排除在范围之外）
IDBKeyRange.upper;//返回上限
IDBKeyRange.upperOpen;//布尔值，表示上限是否为开区间（即上限是否排除在范围之外）
IDBKeyRange.lowerBound();//指定下限。
IDBKeyRange.upperBound();//指定上限。
IDBKeyRange.bound();//同时指定上下限。
IDBKeyRange.only();//指定只包含一个值。
IDBKeyRange.includes();//返回一个布尔值，表示某个主键是否包含在当前这个主键组之内。
//---数据记录。对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。


//------------------------IndexedDB的操作流程--------------------------

//(1)打开或新建数据库。如果数据库不存在，则会自动新建（新建数据库的操作与打开数据库一样，只是需要在upgradeneeded事件中进行处理）
var db;
var request = indexedDB.open('databaseName', 1);//指定数据库名称和版本，新建时默认为1，返回操作请求IDBRequest对象
request.onerror = function (e) {
    console.log('数据库打开报错');
}
request.onsuccess = function (e) {
    console.log('数据库打开成功');
    db = request.result;//通过IDBRequest对象的result属性，拿到数据库IDBDatabase对象
}
request.onupgradeneeded = function (e) {
    console.log('指定版本大于实际版本，从而数据库升级，也就是新建数据库')
    db = e.target.result;//通过事件对象的target的result属性，拿到数据库IDBDatabase对象
}
request.onblocked = function (e) {
    console.log('上次数据库连接还未关闭')
}

//(2)新建对象仓库，并新建索引
request.onupgradeneeded = function (e) {
    db = e.target.result;
    var objStore;
    if (!db.objectStoreNames.contains('person')) {//新建前先判断是否存在
        objStore = db.createObjectStore('person', { keyPath: 'id' });//新建对象仓库person，其主键为id
        objStore = db.createObjectStore('person', { autoIncrement: true });//新建对象仓库person，自动生成主键
        objStore.createIndex('name', 'name', { unique: false });//新建索引。索引名称、索引所在的属性、是否可重复
    }
}

//(3)新增数据记录。数据记录的增删改都必须通过事务IDBTransaction进行
function add() {
    var transaction = db.transaction(['person'], 'readwrite');//得到可读写指定的多个对象仓库的事务
    var request = transaction.objectStore('person').add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });//向指定对象仓库中新增数据记录
    request.onerror = function (e) {
        console.log('新增数据记录失败')
    }
    request.onsuccess = function (e) {
        console.log('新增数据记录成功')
    }
}

//(4)更新数据记录。
function update() {
    var transaction = db.transaction(['person'], 'readwrite');//得到可读写指定的多个对象仓库的事务
    var request = transaction.objectStore('person').put({ id: 1, name: '李四', age: 24, email: 'zhangsan@example.com' });//用put来更新对应主键的数据记录
    request.onerror = function (e) {
        console.log('更新数据记录失败')
    }
    request.onsuccess = function (e) {
        console.log('更新数据记录成功')
    }
}

//(5)删除数据记录
function remove() {
    var transaction = db.transaction(['person'], 'readwrite');//得到可读写指定的多个对象仓库的事务
    var request = transaction.objectStore('person').delete(1);
    request.onerror = function (e) {
        console.log('删除数据记录失败')
    }
    request.onsuccess = function (e) {
        console.log('删除数据记录成功')
    }
}

//(6)读取数据记录。数据记录的查看也必须通过事务IDBTransaction进行
function read() {
    var transaction = db.transaction(['person']);//得到事务
    var request = transaction.objectStore('person').get(1);//参数为主键值
    request.onerror = function (e) {
        console.log('事务失败');
    };
    request.onsuccess = function (e) {
        if (request.result) {
            console.log('Name: ' + request.result.name);
            console.log('Age: ' + request.result.age);
            console.log('Email: ' + request.result.email);
        } else {
            console.log('未获得数据记录');
        }
    };
}

//(7)遍历数据记录。还是要用事务，且要用到指针IDBCursor
function readAll() {
    var transaction = db.transaction(['person']);//得到事务
    var request = transaction.objectStore('person').openCursor();//打开指针
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            console.log('Id: ' + cursor.key);
            console.log('Name: ' + cursor.value.name);
            console.log('Age: ' + cursor.value.age);
            console.log('Email: ' + cursor.value.email);
            cursor.continue();
        } else {
            console.log('没有更多数据了！');
        }
    }
}

//(8)通过索引进行搜索。如果不建立索引，默认只能搜索主键（即从主键取值）
function readIndex() {
    var transaction = db.transaction(['person'], 'readonly');
    var index = transaction.objectStore('person').index('name');//拿到指定的索引，参数为索引名称
    var request = index.get('李四');
    request.onsuccess = function (e) {
        var result = e.target.result;
        if (result) {
            console.log('Name: ' + result.name);
            console.log('Age: ' + result.age);
            console.log('Email: ' + result.email);
        } else {
            console.log('未获得数据记录');
        }
    }
}
