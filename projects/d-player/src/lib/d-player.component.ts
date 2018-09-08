import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { DPlayerService } from './d-player.service';
import Hls from 'hls.js';
import { MediaPlayerClass } from 'dashjs';
import {
  DPlayerAPIBackend,
  DPlayerContextMenuItem,
  DPlayerDanmaku,
  DPlayerHighLightItem,
  DPlayerSubTitle,
  DPlayerVideo,
  Preload
} from 'dplayer';

@Component({
  selector: 'd-player',
  styles: [':host{display:block} :host ::ng-deep a{text-decoration:none}'],
  template: ''
})
export class DPlayerComponent implements OnInit, OnDestroy {
  @Input() private autoplay: boolean;
  @Input() private live: boolean;
  @Input() private theme: string;
  @Input() private loop: boolean;
  @Input() private screenshot: boolean;
  @Input() private hotkey: boolean;
  @Input() private preload: Preload;
  @Input() private logo: string;
  @Input() private volume: number;
  @Input() private mutex: boolean;
  @Input() private video: DPlayerVideo;
  @Input() private subtitle: DPlayerSubTitle;
  @Input() private danmaku: DPlayerDanmaku;
  @Input() private contextmenu: DPlayerContextMenuItem[];
  @Input() private highlight: DPlayerHighLightItem[];
  @Input() private apiBackend: DPlayerAPIBackend;
  public PID = -1;
  public MSE: { type: string, instance: any }[] = [];
  public events = {
    playerEvents: [
      'screenshot',
      'thumbnails_show',
      'thumbnails_hide',
      'danmaku_show',
      'danmaku_hide',
      'danmaku_clear',
      'danmaku_loaded',
      'danmaku_send',
      'danmaku_opacity',
      'contextmenu_show',
      'contextmenu_hide',
      'notice_show',
      'notice_hide',
      'quality_start',
      'quality_end',
      'destroy',
      'resize',
      'fullscreen',
      'fullscreen_cancel',
      'webfullscreen',
      'webfullscreen_cancel',
      'subtitle_show',
      'subtitle_hide',
      'subtitle_change'
    ],
    videoEvents: [
      'abort',
      'canplay',
      'canplaythrough',
      'durationchange',
      'emptied',
      'ended',
      'error',
      'loadeddata',
      'loadedmetadata',
      'loadstart',
      'mozaudioavailable',
      'pause',
      'play',
      'playing',
      'progress',
      'ratechange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeupdate',
      'volumechange',
      'waiting'
    ]
  };

  [key: string]: any;

  // @Output('event') private event;

  constructor(
    private ElemRef: ElementRef,
    private DPService: DPlayerService
  ) {
  }

  ngOnInit() {
    this.initCustomType();
    this.initPlayer();
    this.PID = this.DPService.getPID();
  }

  private initCustomType() {
    this.MSE.forEach(mse => {
      switch (mse.type) {
        case 'hls':
          const hls = mse.instance as Hls;
          this.video = Object.assign(this.video, {
            type: 'dpHls',
            customType: {
              'dpHls': (video: HTMLVideoElement) => {
                hls.loadSource(video.src);
                hls.attachMedia(video);
              }
            }
          });
          break;
        case 'dash':
          const dash = mse.instance as MediaPlayerClass;
          this.video = Object.assign(this.video, {
            type: 'dpDash',
            customType: {
              'dpDash': (video: HTMLVideoElement) => {
                dash.initialize(video, video.src);
              }
            }
          });
          break;
      }
    });
  }

  private initPlayer() {
    const _dp = this.DPService
      .setOptions({
        container: this.ElemRef.nativeElement,
        autoplay: this.autoplay,
        live: this.live,
        theme: this.theme,
        loop: this.loop,
        screenshot: this.screenshot,
        hotkey: this.hotkey,
        preload: this.preload,
        logo: this.logo,
        volume: this.volume,
        mutex: this.mutex,
        video: this.video,
        subtitle: this.subtitle,
        danmaku: this.danmaku,
        contextmenu: this.contextmenu,
        highlight: this.highlight,
        apiBackend: this.apiBackend,
      })
      .createPlayer();
    const _proto = Object.getPrototypeOf(_dp);
    _proto.play = _dp.play.bind(_dp);
    Object.setPrototypeOf(this, _proto);
    Object.assign(this, _dp);
  }

  ngOnDestroy() {
    this.DPService.destroyPlayer(this.PID);
  }
}
