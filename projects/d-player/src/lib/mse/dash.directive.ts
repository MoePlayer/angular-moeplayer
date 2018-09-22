import { Directive, Host, OnDestroy, Optional, Self } from '@angular/core';
import { DPlayerComponent } from '../d-player.component';
import { MediaPlayer, MediaPlayerClass } from 'dashjs';

@Directive({
  selector: '[dpDash]'
})
export class DashDirective implements OnDestroy {
  private readonly _instance: MediaPlayerClass = null;

  constructor(
    @Host() @Self() @Optional() private _dp: DPlayerComponent
  ) {
    try {
      this._instance = MediaPlayer().create();
      this._instance.getDebug().setLogToBrowserConsole(false);
      this._dp.MSE.push(this.init);
    } finally {
    }
  }

  ngOnDestroy() {
    try {
      this._instance.reset();
    } finally {
    }
  }

  private init = (video: HTMLVideoElement) => {
    this._instance.initialize(video, video.src);
  }
}
