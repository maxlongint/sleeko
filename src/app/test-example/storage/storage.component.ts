import { Component } from '@angular/core';
import { SessionStorage } from '@sleeko/utils';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss'],
})
export class StorageComponent {
    @SessionStorage<number>({ defaultValue: 0 })
    count!: BehaviorSubject<number>;
}
