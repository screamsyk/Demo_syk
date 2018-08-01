import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'ng-zorro-demo',
    templateUrl: './ngZorroDemo.component.html',
    styleUrls: ['./ngZorroDemo.component.css']
})

export class ngZorroDemo {
    title: string = 'NG-ZORRO学习';
    menuType: string = 'horizontal';
    menuTheme: string = 'light';
    private dropdown: NzDropdownContextComponent;//右键菜单
    dataSet = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            checked: false
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            checked: false
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            checked: false
        }
    ];
    dataSet2=this.dataSet.concat(this.dataSet);
    allChecked: boolean = false;
    indeterminate: boolean = false;
    listOfSelection = [
        {
            text: '全选',
            onSelect: () => {
                this.checkAll(true);
            }
        },
        {
            text: '选中偶数行',
            onSelect: () => {
                this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
                this.refreshStatus();
            }
        },
        {
            text: '选中奇数行',
            onSelect: () => {
                this.dataSet.forEach((data, index) => data.checked = index % 2 !== 0);
                this.refreshStatus();
            }
        }
    ]
    sortName = null;
    sortValue = null;

    //全选
    checkAll(value: boolean): void {
        this.dataSet.forEach(data => data.checked = value);
        this.allChecked = true;
        this.indeterminate = false;
    }

    //判断是否全选
    refreshStatus(): void {
        this.allChecked = this.dataSet.every(data => { return data.checked });//是否都选中了。数组的every()方法：判断数组中的元素是否都满足某个条件
        let allNotChecked = this.dataSet.every(data => { return !data.checked });//是否都没选中
        this.indeterminate = !this.allChecked && !allNotChecked;//既有选中的又有没选中的
    }

    //排序
    sort(event): void {
        this.sortName = event.key;
        this.sortValue = event.value;
        if (this.sortName) {
            this.dataSet = this.dataSet.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
        } else {
            this.dataSet = this.dataSet;
        }
    }

    //创建右键菜单
    contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
        this.dropdown = this.nzDropdownService.create($event, template);
    }

    //关闭右键菜单
    close(): void {
        this.dropdown.close();
    }

    //构造函数
    constructor(private nzDropdownService: NzDropdownService, private message: NzMessageService) {

    }
}