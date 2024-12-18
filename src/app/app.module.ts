import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionComponent } from './test-example/session/session.component';
import { DebounceTimeComponent } from './test-example/debounce-time/debounce-time.component';

@NgModule({
    declarations: [AppComponent, SessionComponent, DebounceTimeComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
