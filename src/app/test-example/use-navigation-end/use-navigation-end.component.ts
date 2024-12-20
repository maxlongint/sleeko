import { Component } from '@angular/core';
import { useNavigationEnd } from '@sleeko/utils/hooks';

@Component({
    selector: 'app-use-navigation-end',
    templateUrl: './use-navigation-end.component.html',
    styleUrls: ['./use-navigation-end.component.scss'],
})
export class UseNavigationEndComponent {
    private readonly _navigationEnd = useNavigationEnd(event => {
        console.log('navigation end', event);
    });
}
