
//----------------创建新的Angluar组件-----------------------

//(1)从@angular/core中导入Component（修饰器，或者说注解）、OnInit（生命周期接口）
import { Component, OnInit } from '@angular/core';
import { hero } from './hero';//引入hero类

//(2)修饰器，告诉Angular框架要去加载这些内容
@Component({
    selector: 'app-heroes',//组件的选择器（css元素选择器），即组件的名称，用于在html中使用，如<app-heroes></app-heroes>
    templateUrl: './heroes.component.html',//组件的模板
    styleUrls: ['./heroes.component.css']//组件的私有样式
})

//(3)创建类，之后要在app.module.ts中使用
export class Heroes implements OnInit {
    title: string = "漫威超级英雄";
    heroes: hero[] = [//有多个超级英雄，使用*ngFor进行数组遍历
        { id: 1, name: 'captain' },
        { id: 2, name: 'ironman' },
        { id: 3, name: 'spiderman' },
        { id: 4, name: 'thanos' },
    ];
    constructor() {//构造方法

    }
    ngOnInit() {//接口OnInit指定要实现的方法，属于生命周期钩子，在组件创建完成时调用

    }
}