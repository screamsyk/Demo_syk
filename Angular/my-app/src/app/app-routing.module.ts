//====Angular路由

//(1)导入需要的模块
import { NgModule, Component } from '@angular/core';//模块修饰器
import { RouterModule, Routes, Router } from '@angular/router';//路由模块

//(2)导入路由时用到的组件
import { Heroes } from './components/heroes/heroes.component';
import { heroDetail } from './components/heroDetail/heroDetail.component';
import { ngZorroDemo } from './components/ngZorroDemo/ngZorroDemo.component';

//(3)定义路由
const routes: Routes = [
    {
        path: 'heroes',//路由
        component: Heroes//组件
    },
    {
        path: '',
        redirectTo: '/heroes',//重定向
        pathMatch: 'full'//完全匹配
    },
    {
        path: 'detail/:id',//路由参数
        component: heroDetail
    },
    {
        path: 'sharePlatform',
        loadChildren: './components/sharePlatform/sharePlatform.module#SharePlatformModule'//懒加载，新的模块和路由
    },
    {
        path: 'ngZorroDemo',
        component: ngZorroDemo
    }
]

//(4)修饰器，告诉Angular这个类是干啥的，它是一个模块
@NgModule({
    imports: [RouterModule.forRoot(routes)],//在应用的顶级配置这个路由器，并在html的<router-outlet></router-outlet>标签中显示，通过router-link属性跳转
    exports: [RouterModule]
})

//(5)导出类
export class AppRoutingModule {

}