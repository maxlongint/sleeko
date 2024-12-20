import { Component, OnInit } from '@angular/core';
import { useQueryParams } from '@sleeko/utils/hooks';

@Component({
    selector: 'app-query-params-child',
    templateUrl: './query-params-child.component.html',
    styleUrls: ['./query-params-child.component.scss'],
})
export class QueryParamsChildComponent implements OnInit {
    readonly queryParams = useQueryParams();

    ngOnInit(): void {
        console.log(this.queryParams.value());
    }
}
