import { Injectable } from '@angular/core';//导入注入修饰器
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';//导入HttpClient（HttpClient 是已有 Angular HTTP API 的演进，它在一个单独的 @angular/common/http 包中。这是为了确保现有的代码库可以缓慢迁移到新的 API）
import { Observable, throwError } from 'rxjs';//导入rxjs的可观察序列Observable

import { NzMessageService } from 'ng-zorro-antd';//NG-ZORRO的消息提示服务
import { catchError, retry } from '../../../node_modules/rxjs/operators';

@Injectable({
    providedIn: 'root'//把服务的提供商注册到根注入器上
})

export class HttpService {

    //(1)构造函数
    constructor(private http: HttpClient, private message: NzMessageService) {//注入HttpClient服务，创建私有属性http；注入消息提示message

    }

    //(2)处理http请求错误
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.message.error("出现错误：" + error.message);
        } else if (error.error instanceof ProgressEvent) {
            this.message.error("出现网络错误：" + error.message);
        }
        return throwError("出现异常，请稍后重试！");
    }


    //--------------Get请求----------------

    //(1)获取json数据
    getJson(url: string) {
        return this.http.get(url)
            .pipe(
                retry(3),//有的错误可能多试几次就好了，所以这里设定先试3次，如果3次都错才进行错误处理
                catchError(this.handleError)//通过管道pipe把信息传给错误处理器
            );
    }

    //(2)获取json数据并得到完整的响应信息，包含headers和body等
    getJsonResponse(url: string): Observable<HttpResponse<any>> {//这里的类型批注，感觉写了也没太多用
        return this.http.get(url, { observe: 'response' })//通过observe观察选项告诉 HttpClient，你想要完整的响应信息，而不是只有响应体body
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

}
