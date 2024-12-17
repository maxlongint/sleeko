import { Component } from '@angular/core';
import { SessionStorage } from '@sleeko/utils/storage';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @SessionStorage({ defaultValue: 0 })
    count!: BehaviorSubject<number>;
}
