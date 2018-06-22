//========Vue实战案例：计算器=========

//(1)创建组件
Vue.component('keyboard', {
    props: ['keyvalue'],
    template: `<div class="keyboard" :class="{'clear':keyvalue=='清除','equal':keyvalue=='='}">{{keyvalue}}</div>`
});

//(2)创建Vuex仓库，存放组件公用数据
const store = new Vuex.Store({
    state: {
        input: [],//输入
        result: 0//计算结果
    }
});

//(3)创建Vue实例
new Vue({
    el: '#app',
    data: {
        title: 'Vue实战案例：任务列表',
        keys: [
            '清除', '+', '-', '*',
            '7', '8', '9', '/',
            '4', '5', '6', '0',
            '1', '2', '3', '='
        ]
    },
    methods: {

    }
});