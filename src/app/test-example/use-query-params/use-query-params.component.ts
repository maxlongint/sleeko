import { Component } from '@angular/core';
import { useNavigate } from '@sleeko/utils/hooks';

@Component({
    selector: 'app-use-query-params',
    templateUrl: './use-query-params.component.html',
    styleUrls: ['./use-query-params.component.scss'],
})
export class UseQueryParamsComponent {
    private readonly navigate = useNavigate();

    navigatePage() {
        this.navigate('use-query-params/child', { hello: 'world', date: +new Date() });
    }
}
