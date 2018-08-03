import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { mergeMap } from "../../../node_modules/rxjs/operators";

@Injectable({
    providedIn: 'root'
})

//服务：http请求、响应拦截器
export class InterceptorService implements HttpInterceptor {
    constructor() {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = "用户token验证"
        request = request.clone({//请求拦截
            /* setHeaders: {
                Authorization: token
            } */
        });
        return next.handle(request);//使用新的请求对象，调用底层的 XHR 对象，并返回响应事件流
            /* .pipe(
                mergeMap(
                    (event: any) => {
                        if (event instanceof HttpResponse && event.status !== 200) {//响应拦截
                            console.log("请求数据失败");
                        }
                        return event;
                    }
                )
            ); */
    }
}