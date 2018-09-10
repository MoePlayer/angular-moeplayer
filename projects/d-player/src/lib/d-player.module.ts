import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DPlayerService } from './d-player.service';
import { DPlayerApiService } from './d-player-api.service';

import { DPlayerComponent } from './d-player.component';
import { HlsDirective } from './mse/hls.directive';
import { DashDirective } from './mse/dash.directive';
import { FlvDirective } from './mse/flv.directive';

@NgModule({
  imports: [HttpClientModule],
  declarations: [DPlayerComponent, HlsDirective, DashDirective, FlvDirective],
  exports: [DPlayerComponent, HlsDirective, DashDirective, FlvDirective]
})
export class DPlayerModule {
  public static forRoot(config): ModuleWithProviders {
    return {
      ngModule: DPlayerModule,
      providers: [
        DPlayerService,
        DPlayerApiService,
        {provide: 'config', useValue: config}
      ]
    };
  }
}
