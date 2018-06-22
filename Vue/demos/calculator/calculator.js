//========Vue实战案例：计算器=========

//(1)创建组件
Vue.component('keyboard', {
    props: ['keyvalue'],
    template: `<div class="keyboard" :class="{'clear':keyvalue=='清除','equal':keyvalue=='='}" @click="keydown(keyvalue)">{{keyvalue}}</div>`,
    methods: {
        keydown(key) {
            this.$store.commit('calculate', key);//必须通过commit才能修改仓库里的状态
        }
    }
});

//(2)创建Vuex仓库，存放组件公用数据
const store = new Vuex.Store({
    state: {
        input: "",//输入
        result: 0//计算结果
    },
    mutations: {//修改状态
        calculate(state, value) {//计算
            if (state.result === 0) {
                if (value === '=') {
                    state.result = eval(state.input);
                    state.input += value;
                } else if (value === '清除') {
                    state.result = 0;
                    state.input = "";
                } else {
                    state.input += value;
                }
            } else {
                if (value === '清除') {
                    state.input = "";
                } else {
                    state.input = state.result + value;
                }
                state.result = 0;
            }

        }
    }
});

//(3)创建Vue实例
new Vue({
    el: '#app',
    store: store,//Vuex仓库
    data: {
        title: 'Vue实战案例：计算器',
        keys: [
            '清除', '+', '-', '*',
            '7', '8', '9', '/',
            '4', '5', '6', '0',
            '1', '2', '3', '='
        ]
    },
    methods: {

    },
    computed: {//计算属性
        result() {
            return this.$store.state.result;//得到Vuex仓库中的状态，即数据
        },
        input() {
            return this.$store.state.input;
        }
    }
});