import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';//http请求需要用到

@Component({
    selector: 'share-platform',
    templateUrl: './sharePlatform.component.html',
    styleUrls: ['./sharePlatform.component.css']
})

export class SharePlatform implements OnInit {
    constructor(private http: HttpClient) {//依赖注入

    }
    catalogs: object[];
    articles: object[];
    getCatalogs() {
        var url = 'http://192.168.11.230:8080/seplatform_portal/service/homepage/deptList.do?num=30&orgId=1';
        this.http.get(url).subscribe((response: any) => {//这里需要把response指定为any类型，注意加上小括号，不然会进行类型检测
            if (response.code === "20000") {
                response.data = response.data.slice(0, response.data.length - 5);
                for (let i in response.data) {
                    response.data[i].style = {
                        "background-position": "0 " + "-" + 40 * Number(i) + "px"//i需要转成数字，不然会提醒i必须是数字或者any
                    };
                }
                this.catalogs = response['data'];
            }
        });
    }
    getArticles(){
        var url = 'http://192.168.11.230:8080/seplatform_portal/service/sharedDynamic/getNewsPage.do?pageNo=1&pageSize=6&title=&source=&author=';
        this.http.get(url).subscribe((response: any) => {//这里需要把response指定为any类型，注意加上小括号，不然会进行类型检测
            if (response.code === "20000") {
                this.articles = response.data.result;
            }
        });
    }
    ngOnInit() {
        this.getCatalogs();
        this.getArticles();
    }
}