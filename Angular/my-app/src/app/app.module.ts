//导入内置模块
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//动画模块
import { NgModule } from '@angular/core';//导入NgModule模块化系统
import { FormsModule } from '@angular/forms';//导入FormsModule，这样才能用ngModel等指令
import { HttpClientModule } from '@angular/common/http';//导入http模块

//导入自定义模块
import { AppRoutingModule } from './app-routing.module';//路由

//导入第三方模块NG-ZORRO
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

//导入所有的组件
import { AppComponent } from './components/appRoot/app.component';//根组件
import { Heroes } from './components/heroes/heroes.component';
import { heroDetail } from './components/heroDetail/heroDetail.component';
import { Message } from './components/message/message.component';
import { SharePlatform } from './components/sharePlatform/sharePlatform.component';

//导入所有的指令
import { Greet } from './directives/greet.directive';

//模块修饰器：表明下面的AppModule类是一个模块，这里是根模块，为Angular描述如何用组件来组装应用
@NgModule({
  declarations: [//声明：所有要用的组件都需要在这里声明
    AppComponent,
    Heroes,
    heroDetail,
    Message,
    SharePlatform,
    Greet
  ],
  imports: [//导入：导入模块
    BrowserModule,//浏览器视图控制*ngFor
    FormsModule,//表单双向绑定
    AppRoutingModule,//路由
    HttpClientModule,//http请求
    BrowserAnimationsModule,//动画
    NgZorroAntdModule//NG-ZORRO
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]//启动：由于是单页面应用，所以只需要启动根组件（注意：不要启动其他的组件，不然很可能视图渲染失败）
})
export class AppModule { }
