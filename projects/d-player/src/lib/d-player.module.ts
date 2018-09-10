import { NgModule, ModuleWithProviders } from '@angular/core';
import { DPlayerComponent } from './d-player.component';
import { HlsDirective } from './mse/hls.directive';
import { DashDirective } from './mse/dash.directive';
import { DPlayerService } from './d-player.service';
import { FlvDirective } from './mse/flv.directive';

@NgModule({
  imports: [],
  declarations: [DPlayerComponent, HlsDirective, DashDirective, FlvDirective],
  exports: [DPlayerComponent, HlsDirective, DashDirective, FlvDirective]
})
export class DPlayerModule {
  public static forRoot(config): ModuleWithProviders {
    return {
      ngModule: DPlayerModule,
      providers: [
        DPlayerService,
        {provide: 'config', useValue: config}
      ]
    };
  }
}
