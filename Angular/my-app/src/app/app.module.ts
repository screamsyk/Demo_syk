//导入模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';//导入FormsModule，这样才能用ngModel等指令

//导入所有的组件
import { AppComponent } from './appInit/app.component';//根组件
import { Heroes } from './heroes/heroes.component';
import { heroDetail } from './heroDetail/heroDetail.component';

@NgModule({
  declarations: [//声明：所有要用的组件都需要在这里声明
    AppComponent,
    Heroes,
    heroDetail
  ],
  imports: [//导入：导入模块
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]//启动：由于是单页面应用，所以只需要启动根组件（注意：不要启动其他的组件，不然很可能视图渲染失败）
})
export class AppModule { }
