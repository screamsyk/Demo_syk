import { Directive, Input, HostBinding, HostListener } from '@angular/core';

@Directive({//指令装饰器
    selector: '[greet]'
})

export class Greet {
    @Input() greet: string;//表明greet是外部传入的
    @HostBinding() get innerText() {//@HostBinding装饰器，用于元素属性的绑定，这里就是绑定对应元素的innerText
        return this.greet;
    }
    @HostListener('click', ['$event']) onClick() {//@HostListener装饰器，用于元素事件的绑定，这里就是绑定对应元素的点击事件onClick
        this.greet = "点击了指令！"
    }
}