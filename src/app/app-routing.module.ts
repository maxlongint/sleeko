import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebounceTimeComponent } from './test-example/debounce-time/debounce-time.component';
import { TakeUntilDestroyedComponent } from './test-example/take-until-destroyed/take-until-destroyed.component';
import { StorageComponent } from './test-example/storage/storage.component';
import { UseNavigationEndComponent } from './test-example/use-navigation-end/use-navigation-end.component';

const routes: Routes = [
    {
        path: 'debounce-time',
        component: DebounceTimeComponent,
    },
    {
        path: 'storage',
        component: StorageComponent,
    },
    {
        path: 'take-until-destroyed',
        component: TakeUntilDestroyedComponent,
    },
    {
        path: 'use-navigation-end',
        component: UseNavigationEndComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}