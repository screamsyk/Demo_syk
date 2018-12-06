import { Component, OnInit } from '@angular/core';
import { PageLoadingService } from '../../services/pageLoading.service';//页面加载效果——路由检测
import { Observable } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';//页面加载效果——进度条

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '我的第一个Angular应用：漫威超级英雄';
  loading$: Observable<boolean>;//可观察序列
  timer: any;
  constructor(private pageLoadingService: PageLoadingService, private progressBar: NgProgress) {

  }
  ngOnInit() {
    this.loading$ = this.pageLoadingService.loading$;
    this.loading$.subscribe(value => {
      if (value) {
        clearTimeout(this.timer);
        this.progressBar.set(0);
        this.progressBar.start();//开始显示加载进度条
      } else {
        this.timer = setTimeout(() => {
          this.progressBar.complete();//结束显示
        }, 3000)
      }
    });//订阅主题
  }

}
