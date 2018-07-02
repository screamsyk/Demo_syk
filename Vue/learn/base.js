//==================Vue2.0基础=======================

//----------------Vue.js框架介绍----------------------

//(1)Vue（也可以叫Vue.js，一个意思）是尤雨溪（中国人哦）写的一个前端框架，与Angular、React三分天下，很厉害!

//(2)诞生背景：因为现在手机的普及，移动端的web需求大量增加，于是产生了webApp，即移动端的网页应用
//---为了方便移动端的交互和页面切换，MVVM框架诞生，Vue就是其中一种。

//(3)MVVM是什么？
//---M：model，代表数据
//---V：view，代表视图，即页面DOM
//---VM：viewModel，代表监控者
//---与MVC的区别在于，MVC的视图更新需要通过手动地通过控制器去操作视图，而MVVM则不需要操作视图，直接由viewModel实现视图的更新

//(4)Vue相比Angular和React的优点：
//---更轻量更快
//---更容易上手，易学

//(5)Vue的核心：
//---数据绑定：数据改变后，视图自动更新，以及双向数据绑定
//---视图组件：整个网页拆分成一个一个的组件，网页由多个组件拼接而成


//--------------------Vue的安装和基本使用---------------------------

//(1)可以去官网下载：https://cn.vuejs.org/

//(2)最好用npm下载：npm install vue --save

//(3)视图组件：使用Vue.component(tagName,option)方法来创建组件
//---注意：必须先于new Vue()执行，不然会报错
Vue.component('card', {
    template: '<div style="height:100px;width:300px;background-color:#f2f4f6">这是一张卡片</div>'
});

//(4)数据驱动视图，以及双向数据绑定：用new Vue()创建Vue应用实例
new Vue({
    el: '#app1',//类似jQuery的id选择器，挂载到指定页面元素上
    data: {//data：用于存放数据
        test: 'web前端教程',
        testModel: '双向数据绑定',
        number: 3.14,
        testHtml: '<div style="width:100px;height:30px;background-color:#fef6f2">这是html内容</div>',
        testA: 'http://www.baidu.com',
        show1: true,
        show2: false,
        if1: true,
        if2: false,
        list: ['列表数据1', '列表数据2', '列表数据3',],
        testOnce: '测试v-once的只渲染一次'
    },
    filters: {//filters：用于存放过滤器
        toInt(value) {//ES6扩展对象的方法的简写
            return parseInt(value);
        }
    },
    computed: {//computed：计算属性
        sum() {
            return this.number
        }
    },
    methods: {//methods：用于存放方法
        plus() {
            return this.number++
        },
        say() {
            alert('绑定点击事件');
        }
    },
    watch: {//watch：用于观察数据的变化
        number() {//这里方法名为number，表示监控的数据就是number
            console.log(`数据变化了，数值变成了${this.number}`);
        }
    },
    beforeCreate() {//生命周期：即将创建
        console.log('----------生命周期：即将创建------------');
        console.log(this.$data);//undefined，不可用
        console.log(this.$el);//undefined，不可用
    },
    created() {//生命周期：创建完毕
        console.log('----------生命周期：创建完毕------------');
        console.log(this.$data);//{...}，创建后就有data了
        console.log(this.$el);//undefined，由于DOM还未生成（未挂载），所以还是undefined
    },
    beforeMount() {//生命周期：即将挂载，就是生成DOM
        console.log('-----------生命周期：即将挂载-----------');
        console.log(this.$el);//此时虽然DOM生成了，但数据还没有绑定渲染上去
    },
    mounted() {//生命周期：挂载完毕
        console.log('-----------生命周期：挂载完毕-----------');
        console.log(this.$el);//此时DOM生成了，数据也渲染上去了
    },
    beforeUpdate() {//生命周期：即将视图更新

    },
    updated() {//生命周期：视图更新完毕

    },
    beforeDestroy() {//生命周期：即将销毁当前Vue实例

    },
    destroyed() {//生命周期：销毁完毕

    },
    actived() {//keep-alive组件被激活时调用

    },
    deactivated() {//keep-alive组件被停用时调用

    }
});

//(5)绑定数据的方法，以及一些常用的Vue指令：
//---mustache语法（即小胡子，双大括号{{}}）：在html标签中使用<div>{{number}}</div>来绑定数据number
//---v-model指令：在html标签中当属性使用，通过<div v-model="number"></div>来双向绑定数据number，用于html表单控件
//---v-html指令：在html标签中当属性使用，通过<div v-html="testHtml"></div>来绑定带html内容的数据testHtml，这样可以显示html内容
//---v-bind指令：绑定标签的属性值，如<a v-bind:href=""></a>，<img v-bind:src="">
//----------------简写为冒号:，如<a :href=""></a>
//---v-text指令：作用和{{}}一样，用于绑定数据文本，不能识别html内容
//---v-show指令：控制html元素的显示和隐藏
//---v-if指令：控制html元素是否渲染出来（如果不会频繁切换元素的显示和隐藏，就采用v-if，同时，如果想让显示时对应的内容初始化，也用v-if）
//---v-else指令：与v-if指令配合使用
//---v-else-if指令：可与v-if和v-else指令配合使用，注意在v-if和v-else之间如果写了内容都会隐藏
//---v-for指令：用于循环渲染列表数据
//---v-on指令：绑定事件，如<button v-on:click=""></button>
//------------简写为@，如<button @click=""></button>
//------------注意如果绑定的方法不需要传参数，那么绑定的方法写不写()都可以，如<button @click="say"></button>等价于<button @click="say()"></button>
//------------但如果方法有默认参数的话，想要得到默认参数，那么绝对不能写()，否则得不到默认参数，比如子组件向父组件发送数据时
//------------像键盘事件可以进行过滤，如<input @keyup.enter="say">
//---v-once指令：控制元素只渲染一次，即数据改变时，内容也不变了

//(6)动态绑定class和style（主要还是用v-bind指令）
//---对象语法：<p v-bind:class="{'active':isActive,'danger':isDanger,'error':isError}"></p>
//---数组语法：<p v-bind:class="[activeClass,errorClass]"></p>
//------------isActive为true或false，activeClass的值是类名，所以也可以直接写true和false，或者class的名称
//---绑定style也主要采用对象语法：<p v-bind:style="{color:red}"></p>