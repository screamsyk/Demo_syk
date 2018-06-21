//========Vue实战案例：小demo=========

//(1)创建组件
Vue.component('task', {
    props: ['task', 'index'],//组件数据，又称属性
    template: `<div class="task">
    <input type="checkbox" @click="finish(index)" :checked="task.isFinish"/>
    <span style="margin:0 10px" :class="{'finish':task.isFinish}">{{index+1}}.{{task.content}}</span>
    <label v-show="task.isFinish">【已完成】</label>
    <label v-show="!task.isFinish">【未完成】</label>
    <button style="background-color:red;color:#fff" @click="deleteTask(index)">删除</button>
    </div>`,
    methods: {
        finish(index) {
            this.$emit('to-finish', index);//子组件——>父组件通信
        },
        deleteTask(index) {
            this.$emit('to-delete', index);//子组件——>父组件通信
        }
    }
});

//(2)创建Vue实例
new Vue({
    el: '#app',
    data: {
        title: 'Vue实战案例：小demo',
        task: {
            content: '',
            isFinish: false,
            isDelete: false
        },
        list: [
            { content: '完成实例', isFinish: false }
        ]
    },
    methods: {
        add(event) {//添加
            this.list.push(this.task);
            this.task = {
                content: '',
                isFinish: false,
                isDelete: false
            }
        },
        finish(index) {//完成
            this.list[index].isFinish = !this.list[index].isFinish;
        },
        deleteTask(index) {//删除
            this.list.splice(index, 1);//子组件——>父组件通信
        }
    }
});