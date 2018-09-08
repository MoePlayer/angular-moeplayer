import { NgModule, ModuleWithProviders } from '@angular/core';
import { DPlayerComponent } from './d-player.component';
import { HlsDirective } from './mse/hls.directive';
import { DashDirective } from './mse/dash.directive';
import { DPlayerService } from './d-player.service';

@NgModule({
  imports: [],
  declarations: [DPlayerComponent, HlsDirective, DashDirective],
  exports: [DPlayerComponent, HlsDirective, DashDirective]
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
