import { Component } from '@angular/core';
import { useNavigateTo } from '@sleeko/utils/hooks';

@Component({
    selector: 'app-use-query-params',
    templateUrl: './use-query-params.component.html',
    styleUrls: ['./use-query-params.component.scss'],
})
export class UseQueryParamsComponent {
    private readonly navigateTo = useNavigateTo();

    navigatePage() {
        this.navigateTo('use-query-params/child', { hello: 'world' });
    }
}
