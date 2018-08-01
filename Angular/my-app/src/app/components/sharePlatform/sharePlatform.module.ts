import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//懒加载的模块，由于很多模块都在主模块引入过了，这里只需要引入下CommonModule表示把公共的引入进来

import { SharePlatform } from './sharePlatform.component';
import { SharePlatformRoutingModule } from './sharePlatform-routing.module';//子路由

//子模块
@NgModule({
    declarations: [
        SharePlatform
    ],
    imports: [
        CommonModule,
        SharePlatformRoutingModule
    ],
    providers: [

    ]
})

export class SharePlatformModule {

}