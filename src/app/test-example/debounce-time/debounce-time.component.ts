import { Component } from '@angular/core';
import { DebounceTime } from '@sleeko/utils';

@Component({
    selector: 'app-debounce-time',
    templateUrl: './debounce-time.component.html',
    styleUrls: ['./debounce-time.component.scss'],
})
export class DebounceTimeComponent {
    @DebounceTime()
    outputLog() {
        console.log(`当前时间戳：${+new Date()}`);
    }
}
