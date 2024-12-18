import { Component } from '@angular/core';
import { SessionStorage } from '@sleeko/utils/storage';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss'],
})
export class SessionComponent {
    @SessionStorage({ defaultValue: 0 })
    count!: BehaviorSubject<number>;
}
