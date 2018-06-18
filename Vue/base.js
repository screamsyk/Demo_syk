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
        number: 3.14
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
    deactivated(){//keep-alive组件被停用时调用

    }
});
