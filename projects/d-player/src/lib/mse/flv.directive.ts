import { Directive, Host, OnDestroy, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import flvjs from 'flv.js';

@Directive({
  selector: '[dpFlv]'
})
export class FlvDirective implements OnDestroy {
  private _instance = null;

  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    flvjs.LoggingControl.enableAll = false;
    try {
      this._instance = flvjs.createPlayer({type: 'flv'});
    } catch (e) {
      console.warn('flv.js init failed');
    }
    this._dp.MSE.push({
      type: 'flv',
      instance: this._instance
    });
  }

  ngOnDestroy() {
    try {
      this._instance.destroy();
    } catch (e) {
      console.warn('flv.js destroy failed');
    }
  }
}
