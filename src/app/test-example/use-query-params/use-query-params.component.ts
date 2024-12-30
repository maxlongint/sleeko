import { Component } from '@angular/core';
import { useQueryParams } from '@sleeko/utils/hooks';

@Component({
    selector: 'app-use-query-params',
    templateUrl: './use-query-params.component.html',
    styleUrls: ['./use-query-params.component.scss'],
})
export class UseQueryParamsComponent {
    private readonly navigate = useQueryParams().navigate;

    navigatePage() {
        this.navigate('use-query-params/child', { hello: 'world' });
    }
}
