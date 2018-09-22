import { Directive, Host, OnDestroy, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import flvjs from 'flv.js';

@Directive({
  selector: '[dpFlv]'
})
export class FlvDirective implements OnDestroy {
  private readonly _instance: any = null;

  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    try {
      flvjs.LoggingControl.enableAll = false;
      this._instance = flvjs.createPlayer({
        type: 'flv',
        isLive: this._dp.live
      });
      this._dp.MSE.push(this.init);
    } finally {
    }
  }

  ngOnDestroy() {
    try {
      this._instance.destroy();
    } finally {
    }
  }

  private init = (video: HTMLVideoElement) => {
    this._instance._mediaDataSource.url = video.src;
    this._instance.attachMediaElement(video);
    this._instance.load();
  }
}
