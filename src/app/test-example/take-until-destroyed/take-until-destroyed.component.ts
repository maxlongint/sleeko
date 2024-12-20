import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@sleeko/utils';
import { interval } from 'rxjs';

@Component({
    selector: 'app-take-until-destroyed',
    templateUrl: './take-until-destroyed.component.html',
    styleUrls: ['./take-until-destroyed.component.scss'],
})
export class TakeUntilDestroyedComponent implements OnInit {
    destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        interval(1000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(value => {
                console.log(value);
            });
    }
}
