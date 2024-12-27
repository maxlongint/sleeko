import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@sleeko/utils/operators';
import { observeResize } from '@sleeko/utils/tools';

@Component({
    selector: 'app-observe-resize',
    templateUrl: './observe-resize.component.html',
    styleUrls: ['./observe-resize.component.scss'],
})
export class ObserveResizeComponent implements AfterViewInit {
    @ViewChild('resizeElement') resizeElement!: ElementRef<HTMLElement>;
    private readonly takeUntilDestroyed = takeUntilDestroyed();

    ngAfterViewInit(): void {
        observeResize(this.resizeElement.nativeElement)
            .pipe(this.takeUntilDestroyed)
            .subscribe(entries => {
                console.log('Element size changed:', entries);
            });
    }
}
