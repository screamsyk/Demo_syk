//==============Vue组件=============

//(1)创建组件（必须先于Vue实例的创建），用于父组件——>子组件通信
Vue.component('my-article', {
    template: `<div style="padding:10px;margin-bottom:10px;box-shadow:rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;">
    <div>
    <h1>{{detail.title}}</h1>
    <div>
    <span>{{detail.time}}</span>
    <span>{{detail.type}}</span>
    </div>
    </div>
    </div>`,
    props: ['detail']//组件的数据，也是属性，作为形参，可以通过实参作为属性的值将数据传进来（props是单向绑定的：父组件向子组件传递数据）
});

//(2)再创建一个组件，用于子组件——>父组件通信
Vue.component('son', {
    template: '<button @click="send()">点击</button>',
    data() {
        return { msg: '我是子组件' }
    },
    methods: {
        send() {
            this.$emit('connect', this.msg);//使用组件API中的$emit(eventName,data)方法来触发一个事件，再让父组件监听这个事件
        }
    }
});

//(3)创建Vue实例
new Vue({
    el: '#app',
    data: {
        article: { title: 'web前端教程', time: '2017年4月10日', type: '原创' },
        articles: [
            { title: '趣味ES6', time: '2018年2月20日', type: '原创' },
            { title: '简易Vue', time: '2017年5月10日', type: '原创' },
            { title: 'Vue2.0进阶', time: '2018年6月21日', type: '原创' },
        ]
    },
    methods: {
        say(msg) {//注意父组件在调用say方法的时候不要写成say()，只能写成say，不然得不到子组件的数据，这里相当于有默认参数，如果写了()代表没有传参数
            alert('子组件的事件在父组件监听到了，子组件说：' + msg);
        }
    }
});

//(4)Vue组件之间的通信
//---props：实现父组件向子组件传递数据（父组件——>子组件，单向）
//---自定义事件：使用组件API中的$emit(eventName,data)方法来触发一个事件，父组件监听这个事件，实现子组件向父组件发送数据等（子组件——>父组件，单向）
//---vuex：状态管理，用于非父子组件之间的通信


//-----------------------全局组件与局部组件-------------------------------

//(1)全局组件：就是用Vue.component()定义的组件，在整个应用程序的生命周期中都可以使用

//(2)局部组件：为了解决全局组件命名冲突的问题，以及使用webpack打包时所有全局组件会打包在一起的问题

//(3)局部组件的定义：
//---方法一：将组件定义成简单的js对象
var componentA = {
    template: '<div>局部组件A</div>'
}
var componentB = {
    template: '<div>局部组件B</div>'
}
//---方法二：单文件组件.vue文件，如componentC.vue
//import componentC from './componentC.vue';//目前大多数浏览器本身并不支持import这个ES6模块语法，但可以用babel和webpack等插件实现使用

//---然后在new Vue()创建Vue实例时，通过配置项components进行配置
new Vue({
    el: '#app2',
    components: {
        'component-a': componentA,//组件名:组件定义对象
        'component-b': componentB,
        //'component-c':componentC//单文件组件
    }
});
