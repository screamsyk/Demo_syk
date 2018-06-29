import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Hero } from '../heroes/hero';
@Component({
    selector: "app-hero-detail",
    templateUrl: './heroDetail.component.html'
})
export class heroDetail implements OnInit, OnChanges {
    @Input() oneHero: Hero //@Input()修饰器，是用来定义模块的输入的，用来让父模块往子模块传递内容，在html中通过[oneHero]="selectedHero"来指定值
    constructor() {
        this.oneHero = {
            id: 1,
            name: 'captain',
            img: 'captain.png'
        };
    }
    ngOnInit() {
        
    }
    ngOnChanges() {

    }
}