import { Component } from '@angular/core';
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class Message {
    constructor() {

    }
    title: string = 'Angular学习';
    content: string = "遇到些小坑，但还可以，解决了不少问题";

}