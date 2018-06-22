//==================Vue2.0进阶=======================

//-------------------工具介绍------------------

//(1)Vue.js devtools
//---Vue调试工具，是谷歌chrome浏览器的插件，正所谓工欲善其事必先利其器，这个调试工具能很方便Vue的调试
//---安装：在chrome商店查找安装即可（当然需要翻墙才行）
//---只要在http协议访问页面时，Vue.js devtools才能正常使用，所以通过ftp，即直接在浏览器中打开html文件是不行的


//------------------Vue内置组件——transition-----------------------

//(1)Vue内置组件——transition：用于实现以下4种情况的过渡效果
//---条件渲染（v-if）
//---条件展示（v-show）
//---动态组件
//---组件根节点

//(2)过渡原理：
//---首先目标元素要被组件<transition></transition>包含
//---然后Vue会去检测目标元素是否应用了CSS3过渡或者动画，如果是，则在恰当的时机添加或者删除以下6种css类名，我们可以在这6种类名中写样式：
//---v-enter：从隐藏到显示，过渡开始时的样式
//---v-enter-active：定义过渡的时长、延迟和曲线函数等
//---v-enter-to：从隐藏到显示，过渡结束时的样式（Vue2.18版本及以上才可以用）
//---v-leave：从显示到隐藏，过渡开始时的样式
//---v-leave-active：定义过渡的时长、延迟和曲线函数等
//---v-leave-to：从显示到隐藏，过渡结束时的样式（Vue2.18版本及以上）
//---注意：v-是默认前缀，如果<transition name="box"></transition>中name为box，则实际的css类名应该是box-enter等等

//(3)过渡是类名的添加和删除流程：
//---进入过渡（隐藏——>显示）：添加v-enter、删除v-enter并添加v-enter-active、删除v-enter-active并添加v-enter-to、删除v-enter-to、隐藏
//---离开过渡（显示——>隐藏）：添加v-leave、删除v-leave并添加v-leave-active、删除v-leave-active并添加v-leave-to、删除v-leave-to、显示后的样式

//(4)但进入过渡的流程和离开过渡的流程，实现的效果不一样，比如v-enter有效，可以v-leave无效，v-enter-active却能不写结束时的样式，很困惑~v~v~，感觉是Vue的bug，先不管啦
//---这是Vue.js作者的回答：https://github.com/vuejs/vue/issues/3580  但觉得没有多大用处


//-------------------Vue官方路由：vue-router--------------------------------

//(1)安装命令：npm install vue-router --save

//(2)vue-router提供了两个新的组件<router-link/>和<router-view/>
//---<router-link/>用于视图导航，通过其to属性跳转到目标地址
//---<router-view/>用于渲染视图，也就是渲染目标地址的视图

//(3)创建Vue路由
const router = new VueRouter({
    routes: [
        {
            path: '/vue',
            component: {
                template: '<div><h1>简易Vue</h1></div>'
            }
        },
        {
            path: '/es6',
            component: {
                template: '<div><h1>趣味ES6</h1></div>'
            }
        },
        {
            path: '/career',
            component: {
                template: '<div><h1>人在职场</h1></div>'
            }
        }
    ]
});

//(4)创建Vuex仓库，用于状态管理
const store = new Vuex.Store({
    state: {//state存储应用的状态，即所用组件的公用数据
        count: 5
    },
    getters: {//getters读取状态，即读取数据，只接收默认参数state
        getCount: state => state.count//getCount方法，接收参数state，用于读取state的count数据
    },
    mutations: {//mutations修改状态，即修改数据，只接收默认参数state
        setCount: (state, n) => state.count += n
    }
});
store.commit('setCount', 10);//修改状态

//(5)创建Vue实例
new Vue({
    el: '#app',
    data: {
        isShowBox: false
    },
    router: router,//指定路由
    store: store,//指定Vuex的状态管理仓库
});


//-----------------------状态管理：Vuex---------------------------

//(1)安装：npm install vuex --save

//(2)Vuex采用类似全局对象的形式，来管理所有组件的公用数据，如果想进行修改等必须按照Vuex提供的方式

//(3)Vuex的状态存储是响应式的，即如果Vuex管理的状态变化了，那么与之关联的组件都会自动更新数据。

//(4)Vuex的状态不能直接修改，唯一方式是：显式提交（commit）mutations来实现修改

//(5)Vuex的3个核心概念：
//---state：状态，包含了整个应用层级的所有状态，即所有组件的公用数据
//---getters：读取，用于读取state中的状态，即数据，具体比较类似计算属性computed
//---mutations：变化，用于改变state中的状态，即数据，我咋觉得叫setters更合情理~v~
//--------------注意使用mutations，需要用store.commit()方法，参数为mutations中的方法名，也可以传更多参数


//----------------------Vue推荐http请求插件：axios--------------------------

//(1)安装：npm install axios --save

//(2)get请求：请求参数放在params中
let url = '';
axios.get(url, {
    params: {//参数
        type: 'get',
        id: 10
    }
}).then(function (res) {
    //成功
}).catch(function (err) {
    //失败
});

//(3)post请求：
axios.post(url, {//请求参数放在对象中
    type: 'post',
    id: 10
}).then(function () {
    //成功
}).catch(function () {
    //失败
});
//等同于:
axios({
    method: 'post',
    url: url,
    data: {
        name: '前端君'
    }
});

//(4)并发请求：axios.all()以及axios.spread()
function get1() {
    axios.get('/file1');
}
function get2() {
    axios.get('file2');
}
axios.all([get1(), get2()]).then(axios.spread(function (res1, res2) {
    console.log(res1);
    console.log(res2);
}));