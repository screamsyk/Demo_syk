
//------------------小应用测试---------------------

//(1)使用import来显示依赖lodash，这样webpack就能利用这些信息去构建依赖图
//---但注意目前浏览器大多不支持ES6的import模块命令，如果直接访问html就会报错，所以必须采取webpack打包来合成脚本，这样才能正常访问
//import _ from 'lodash';

//(1)引入css文件
import './index.css';//同一目录下也必须写./，不然会被识别为模块路径，这个是相对路径

//(3)引入.json文件
import json from './index.json';

function createElement() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], '!');//lodash插件的_.join(Array,string);用于向数组元素之间插入字符串，并返回得到的新字符串
    element.innerHTML += JSON.stringify(json);
    return element;
}
//document.body.appendChild(createElement());

//(4)引入print.js模块
import print from './print.js';
print();//调用print.js通过export default导出的方法

//(5)测试webpack-dev-server
document.write("web服务器webpack-dev-server启动成功！");
console.log("web服务器webpack-dev-server启动成功！");

//(6)测试模块热替换
import { hmr } from './hmr.js';
document.write("<br/>" + hmr);

//(7)动态导入
function dyn() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
        var element = document.createElement('div');

        element.innerHTML = _.join(['动态导入Hello', 'webpack'], ' ');

        return element;

    }).catch(error => 'An error occurred while loading the component');
}
dyn().then(function (element) {
    document.body.appendChild(element);
});
