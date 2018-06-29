//-----------------注册服务---------------------

//(1)Angular服务存在于Angular应用的整个生命周期，用于存放一些公用数据和方法等，用来共享，很方便的

//(2)导入“注入”修饰器
import { Injectable } from '@angular/core';

//(3)Injectable修饰器，标志着将这个类提供给依赖注入系统
@Injectable({
    providedIn: 'root'//为该服务把服务的提供商注册到根注入器上
})

//(4)导出服务类
export class HeroService{
    constructor(){

    }
}