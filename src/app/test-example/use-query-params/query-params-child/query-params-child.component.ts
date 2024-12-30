import { Component } from '@angular/core';
import { useQueryParams } from '@sleeko/utils/hooks';

@Component({
    selector: 'app-query-params-child',
    templateUrl: './query-params-child.component.html',
    styleUrls: ['./query-params-child.component.scss'],
})
export class QueryParamsChildComponent {
    readonly params = useQueryParams().value();
}
