import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebounceTimeComponent } from './test-example/debounce-time/debounce-time.component';
import { TakeUntilDestroyedComponent } from './test-example/take-until-destroyed/take-until-destroyed.component';
import { StorageComponent } from './test-example/storage/storage.component';
import { UseNavigationEndComponent } from './test-example/use-navigation-end/use-navigation-end.component';
import { UseQueryParamsComponent } from './test-example/use-query-params/use-query-params.component';
import { QueryParamsChildComponent } from './test-example/use-query-params/query-params-child/query-params-child.component';

@NgModule({
    declarations: [
        AppComponent,
        DebounceTimeComponent,
        TakeUntilDestroyedComponent,
        StorageComponent,
        UseNavigationEndComponent,
        UseQueryParamsComponent,
        QueryParamsChildComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
