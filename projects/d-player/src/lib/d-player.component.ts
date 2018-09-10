import { Component, ElementRef, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { DPlayerService } from './d-player.service';
import DPlayer, {
  DPlayerAPIBackend,
  DPlayerContextMenuItem,
  DPlayerDanmaku,
  DPlayerEvents,
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
  /**
   * Player Options Attribute
   * @property {any}
   */
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
  /**
   * Player ID
   * @property {number}
   */
  public PID = -1;
  /**
   * Player Instance
   * @property {DPlayer}
   */
  public PLAYER: DPlayer = null;
  /**
   * Media Source Extensions
   * @property {any}
   */
  public MSE: { type: string, instance: any }[] = [];
  /**
   * Player Events Reflection
   * @property {any}
   */
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

  /**
   * Player Events
   * @property {EventEmitter}
   */
  @Output() private screenshotChange: EventEmitter<void> = new EventEmitter;
  @Output() private thumbnails_show: EventEmitter<void> = new EventEmitter;
  @Output() private thumbnails_hide: EventEmitter<void> = new EventEmitter;
  @Output() private danmaku_show: EventEmitter<void> = new EventEmitter;
  @Output() private danmaku_hide: EventEmitter<void> = new EventEmitter;
  @Output() private danmaku_clear: EventEmitter<void> = new EventEmitter;
  @Output() private danmaku_loaded: EventEmitter<void> = new EventEmitter;
  @Output() private danmaku_send: EventEmitter<void> = new EventEmitter;
  @Output() private danmaku_opacity: EventEmitter<void> = new EventEmitter;
  @Output() private contextmenu_show: EventEmitter<void> = new EventEmitter;
  @Output() private contextmenu_hide: EventEmitter<void> = new EventEmitter;
  @Output() private notice_show: EventEmitter<void> = new EventEmitter;
  @Output() private notice_hide: EventEmitter<void> = new EventEmitter;
  @Output() private quality_start: EventEmitter<void> = new EventEmitter;
  @Output() private quality_end: EventEmitter<void> = new EventEmitter;
  @Output() private destroy: EventEmitter<void> = new EventEmitter;
  @Output() private resize: EventEmitter<void> = new EventEmitter;
  @Output() private fullscreen: EventEmitter<void> = new EventEmitter;
  @Output() private fullscreen_cancel: EventEmitter<void> = new EventEmitter;
  @Output() private webfullscreen: EventEmitter<void> = new EventEmitter;
  @Output() private webfullscreen_cancel: EventEmitter<void> = new EventEmitter;
  @Output() private subtitle_show: EventEmitter<void> = new EventEmitter;
  @Output() private subtitle_hide: EventEmitter<void> = new EventEmitter;
  @Output() private subtitle_change: EventEmitter<void> = new EventEmitter;
  /**
   * Video Events
   * @property {EventEmitter}
   */
  @Output() private abort: EventEmitter<void> = new EventEmitter;
  @Output() private canplay: EventEmitter<void> = new EventEmitter;
  @Output() private canplaythrough: EventEmitter<void> = new EventEmitter;
  @Output() private durationchange: EventEmitter<void> = new EventEmitter;
  @Output() private emptied: EventEmitter<void> = new EventEmitter;
  @Output() private ended: EventEmitter<void> = new EventEmitter;
  @Output() private error: EventEmitter<void> = new EventEmitter;
  @Output() private loadeddata: EventEmitter<void> = new EventEmitter;
  @Output() private loadedmetadata: EventEmitter<void> = new EventEmitter;
  @Output() private loadstart: EventEmitter<void> = new EventEmitter;
  @Output() private mozaudioavailable: EventEmitter<void> = new EventEmitter;
  @Output() private pause: EventEmitter<void> = new EventEmitter;
  @Output() private play: EventEmitter<void> = new EventEmitter;
  @Output() private playing: EventEmitter<void> = new EventEmitter;
  @Output() private progress: EventEmitter<void> = new EventEmitter;
  @Output() private ratechange: EventEmitter<void> = new EventEmitter;
  @Output() private seeked: EventEmitter<void> = new EventEmitter;
  @Output() private seeking: EventEmitter<void> = new EventEmitter;
  @Output() private stalled: EventEmitter<void> = new EventEmitter;
  @Output() private suspend: EventEmitter<void> = new EventEmitter;
  @Output() private timeupdate: EventEmitter<void> = new EventEmitter;
  @Output() private volumeChange: EventEmitter<void> = new EventEmitter;
  @Output() private waitin: EventEmitter<void> = new EventEmitter;

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
      const instance = mse.instance;
      switch (mse.type) {
        case 'hls':
          this.video = Object.assign(this.video, {
            type: 'dpHls',
            customType: {
              'dpHls': (video: HTMLVideoElement) => {
                instance.loadSource(video.src);
                instance.attachMedia(video);
              }
            }
          });
          break;
        case 'dash':
          this.video = Object.assign(this.video, {
            type: 'dpDash',
            customType: {
              'dpDash': (video: HTMLVideoElement) => {
                instance.initialize(video, video.src);
              }
            }
          });
          break;
        case 'flv':
          this.video = Object.assign(this.video, {
            type: 'dpFlv',
            customType: {
              'dpFlv': (video: HTMLVideoElement) => {
                instance._mediaDataSource.url = video.src;
                if (this.live) {
                  instance._config.isLive = true;
                }
                instance.attachMediaElement(video);
                instance.load();
              }
            }
          });
          break;
      }
    });
  }

  private initPlayer() {
    this.PLAYER = this.DPService
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
    Object.keys(this.PLAYER.events).forEach((item) => {
      if (item !== 'events') {
        this.PLAYER.events[item].forEach((event: DPlayerEvents) => {
          this.PLAYER.on(event, () => this[event] ? this[event].emit() : null);
        });
      }
    });
    const _proto = Object.assign(Object.getPrototypeOf(this), Object.getPrototypeOf(this.PLAYER));
    _proto.play = this.PLAYER.play.bind(this.PLAYER);
    Object.setPrototypeOf(this, _proto);
    Object.keys(this.PLAYER).forEach(key => {
      this[key] = this.PLAYER[key];
    });
  }

  ngOnDestroy() {
    this.DPService.destroyPlayer(this.PLAYER);
  }
}
