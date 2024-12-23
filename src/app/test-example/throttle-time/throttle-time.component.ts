import { Component } from '@angular/core';
import { ThrottleTime } from '@sleeko/utils/decorators';

@Component({
    selector: 'app-throttle-time',
    templateUrl: './throttle-time.component.html',
    styleUrls: ['./throttle-time.component.scss'],
})
export class ThrottleTimeComponent {
    @ThrottleTime(1000)
    outputLog() {
        console.log(`当前时间戳：${+new Date()}`);
    }
}
