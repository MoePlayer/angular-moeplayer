import { Directive, Host, OnDestroy, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import Hls from 'hls.js';

@Directive({
  selector: '[dpHls]'
})
export class HlsDirective implements OnDestroy {
  private _instance = null;

  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    try {
      this._instance = new Hls();
    } catch (e) {
      console.warn('hls.js init failed');
    }
    this._dp.MSE.push({
      type: 'hls',
      instance: this._instance
    });
  }

  ngOnDestroy() {
    try {
      this._instance.destroy();
    } catch (e) {
      console.warn('hls.js destroy failed');
    }
  }
}
