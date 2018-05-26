"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module = __importStar(require("./module-A")); //用as指定模块名称
console.log(module.a);
module.fun1();
var b = new module.A(); //这样就能用module-A中导出的对象了
