import { Directive, Host, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import Hls from 'hls.js';

@Directive({
  selector: '[dpHls]'
})
export class HlsDirective {
  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    this._dp.MSE.push({
      type: 'hls',
      instance: new Hls()
    });
  }
}
