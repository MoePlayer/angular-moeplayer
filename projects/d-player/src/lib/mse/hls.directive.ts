import { Directive, Host, OnDestroy, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import Hls from 'hls.js';

@Directive({
  selector: '[dpHls]'
})
export class HlsDirective implements OnDestroy {
  private readonly _instance: Hls = null;

  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    try {
      this._instance = new Hls();
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
    this._instance.loadSource(video.src);
    this._instance.attachMedia(video);
  }
}
