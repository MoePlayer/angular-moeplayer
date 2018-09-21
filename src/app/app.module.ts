import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DPlayerModule } from 'angular-dplayer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DPlayerModule.forRoot({
      screenshot: true,
      logo: 'favicon.ico',
      subtitle: {url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt'},
      danmaku: {id: 'demo', api: 'https://api.prprpr.me/dplayer3/'}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
