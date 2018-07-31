import { Injectable } from '@angular/core';//注入器模块
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';//路由模块
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';//引入BehaviorSubject，注意要安装rxjs-compat

@Injectable({
    providedIn: 'root'
})

export class PageLoadingService {
    loading$ = new BehaviorSubject<boolean>(false);//BehaviorSubject主题对象用于保存最新的数据信息，当订阅时就会执行next方法
    constructor(private router: Router) {
        this.router.events.subscribe(event => this.navigationHandler(event));//路由导航事件
    }
    loading() {//路由正在导航
        this.loading$.next(true);//发布主题
    }
    loaded() {//路由导航完成
        this.loading$.next(false);
    }
    navigationHandler(event: any) {
        if (event instanceof NavigationStart) {//路由导航开始
            this.loading();
        } else if (
            event instanceof NavigationEnd ||//路由导航结束
            event instanceof NavigationCancel ||//路由导航取消
            event instanceof NavigationError//路由导航失败
        ) {
            this.loaded();
        }
    }
}