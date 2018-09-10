import { Directive, Host, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import flvjs from 'flv.js';

@Directive({
  selector: '[dpFlv]'
})
export class FlvDirective {
  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    flvjs.LoggingControl.enableAll = false;
    this._dp.MSE.push({
      type: 'flv',
      instance: flvjs.createPlayer({type: 'flv'})
    });
  }
}
