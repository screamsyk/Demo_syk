import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Hero } from '../heroes/hero';

//导入获取路由参数相关的模块
import { ActivatedRoute } from '@angular/router';//包含路由参数等信息
import { Location } from '@angular/common';//浏览器路由跳转相关


@Component({
    selector: "app-hero-detail",
    templateUrl: './heroDetail.component.html'
})
export class heroDetail implements OnInit, OnChanges {
    @Input() oneHero: Hero //@Input()修饰器，是用来定义模块的输入的，用来让父模块往子模块传递内容，在html中通过[oneHero]="selectedHero"来指定值
    constructor(private activatedRoute: ActivatedRoute,private location:Location) {
        this.oneHero = {
            id: 1,
            name: 'captain',
            img: 'captain.png',
            state:'inactive'
        };
    }
    ngOnInit() {
        //获取路由参数
        console.log(this.activatedRoute.snapshot.paramMap.get('id'));//2，快照中保存了路由信息，paramMap是字典用来获取对应的值
        //this.location.back();//返回上一个标签页
    }
    ngOnChanges() {

    }
}