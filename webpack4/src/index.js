
//------------------小应用测试---------------------

//(1)使用import来显示依赖lodash，这样webpack就能利用这些信息去构建依赖图
//---但注意目前浏览器大多不支持ES6的import模块命令，如果直接访问html就会报错，所以必须采取webpack打包来合成脚本，这样才能正常访问
import _ from 'lodash';
function createElement() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], '!');//lodash插件的_.join(Array,string);用于向数组元素之间插入字符串，并返回得到的新字符串
    return element;
}
document.body.appendChild(createElement());