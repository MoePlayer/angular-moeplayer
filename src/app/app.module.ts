import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DPlayerModule } from '../../projects/d-player/src/lib/d-player.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
