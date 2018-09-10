import { Directive, Host, OnDestroy, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import { MediaPlayer } from 'dashjs';

@Directive({
  selector: '[dpDash]'
})
export class DashDirective implements OnDestroy {
  private _instance = null;

  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    try {
      this._instance = MediaPlayer().create();
      this._instance.getDebug().setLogToBrowserConsole(false);
    } catch (e) {
      console.warn('dash.js init failed');
    }
    this._dp.MSE.push({
      type: 'dash',
      instance: this._instance
    });
  }

  ngOnDestroy() {
    try {
      this._instance.reset();
    } catch (e) {
      console.warn('dash.js destroy failed');
    }
  }
}
