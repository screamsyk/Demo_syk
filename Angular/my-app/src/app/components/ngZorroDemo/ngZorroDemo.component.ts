import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective } from 'ng-zorro-antd';

@Component({
    selector: 'ng-zorro-demo',
    templateUrl: './ngZorroDemo.component.html',
    styleUrls: ['./ngZorroDemo.component.css']
})

export class ngZorroDemo {
    private dropdown: NzDropdownContextComponent;//右键菜单
    title: string = 'NG-ZORRO学习';
    contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
        this.dropdown = this.nzDropdownService.create($event, template);//创建右键菜单
    }
    close(): void {
        this.dropdown.close();//关闭右键菜单
    }
    constructor(private nzDropdownService: NzDropdownService) {

    }
}