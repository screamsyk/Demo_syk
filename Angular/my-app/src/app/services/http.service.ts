import { Injectable } from '@angular/core';//导入注入修饰器
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';//导入HttpClient（HttpClient 是已有 Angular HTTP API 的演进，它在一个单独的 @angular/common/http 包中。这是为了确保现有的代码库可以缓慢迁移到新的 API）
import { Observable, throwError } from 'rxjs';//导入rxjs的可观察序列Observable

import { NzMessageService } from 'ng-zorro-antd';//NG-ZORRO的消息提示服务
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'//把服务的提供商注册到根注入器上
})

//服务：http请求
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
                retry(3),//retry操作符：有的错误可能多试几次就好了，所以这里设定先试3次，如果3次都错才进行错误处理
                catchError(this.handleError)//catchError操作符：通过管道pipe把信息传给错误处理器
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

    //(3)获取文本类型的数据
    getText(url: string) {
        return this.http.get(url, { responseType: 'text' })
            .pipe(
                tap(
                    data => console.log(data),
                    error => console.log(error)
                )//tap操作符：检验数据
            );
    }

    //(4)采用jsonp获取数据
    getJsonp(url: string) {
        return this.http.jsonp(url, 'myCallback');
    }


    //-----------------POST请求-------------------

    //(1)发送json数据的post请求
    postJson(url: string, data: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',//发送的数据形式为json，在请求体中
            })
        }
        return this.http.post(url, data, httpOptions);
    }

    //(2)带URL参数的post请求
    postUrl(url: string, data: any) {
        const httpOptions = {
            params: new HttpParams().set('data', data)
        }
        return this.http.post(url, httpOptions);
    }

}
