import * as module from './module-A';//用as指定模块名称
console.log(module.a);
module.fun1();
var b = new module.A();//这样就能用module-A中导出的对象了