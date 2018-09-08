import { NgModule } from '@angular/core';
import { DPlayerComponent } from './d-player.component';
import { HlsDirective } from './mse/hls.directive';
import { DPlayerService } from './d-player.service';
import { DashDirective } from './mse/dash.directive';

@NgModule({
  imports: [],
  declarations: [DPlayerComponent, HlsDirective, DashDirective],
  exports: [DPlayerComponent, HlsDirective, DashDirective],
  providers: [DPlayerService]
})
export class DPlayerModule {
}
