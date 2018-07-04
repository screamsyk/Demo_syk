import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';//http请求需要用到
import { ResponseType } from './response.type';//接口返回类型

@Component({
    selector: 'share-platform',
    templateUrl: './sharePlatform.component.html',
    styleUrls: ['./sharePlatform.component.css']
})

export class SharePlatform implements OnInit {
    constructor(private http: HttpClient) {//依赖注入

    }
    catalogs: object[];
    getCatalogs() {
        var url = 'http://192.168.11.230:8080/seplatform_portal/service/homepage/deptList.do?num=30&orgId=1';
        this.http.get<ResponseType>(url).subscribe(response => {
            if (response.code === "20000") {
                response.data = response.data.slice(0, response.data.length - 5);
                for (let i in response.data) {
                    response.data[i].style = {
                        "background-position": "0 " + "-" + 40 * i + "px"
                    };
                }
                this.catalogs = response['data'];
            }
        });
    }
    ngOnInit() {
        this.getCatalogs();
    }
}