import { Component, ElementRef, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { DPlayerService } from './d-player.service';
import { DPlayerApiService } from './d-player-api.service';
import { Util } from '../util';
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
  private _live = false;
  private _autoplay = false;
  private _theme = '#b7daff';
  private _loop = false;
  private _lang: string;
  private _screenshot = false;
  private _hotkey = true;
  private _preload: Preload = 'metadata';
  private _volume = 0.7;
  private _apiBackend: DPlayerAPIBackend = {
    send: this.APIService.sendDanmaku.bind(this.APIService),
    read: this.APIService.readDanmaku.bind(this.APIService)
  };
  private _video: DPlayerVideo = {
    url: '',
    type: 'auto'
  };
  private _contextmenu: DPlayerContextMenuItem[];
  private _mutex = true;
  private _subtitle: DPlayerSubTitle;
  private _danmaku: DPlayerDanmaku;
  private _highlight: DPlayerHighLightItem[];

  /**
   * Player Options Attribute
   * @property {any}
   */
  @Input() set live(value: boolean) {
    this._live = Util.toBoolean(value);
  }

  get live(): boolean {
    return this._live;
  }

  @Input() set autoplay(value: boolean) {
    this._autoplay = Util.toBoolean(value);
  }

  get autoplay(): boolean {
    return this._autoplay;
  }

  @Input() set theme(value: string) {
    this._theme = value;
  }

  get theme(): string {
    return this._theme;
  }

  @Input() set loop(value: boolean) {
    this._loop = Util.toBoolean(value);
  }

  get loop(): boolean {
    return this._loop;
  }

  @Input() set lang(value: string) {
    this._lang = String(value);
  }

  get lang(): string {
    return this._lang;
  }

  @Input() set screenshot(value: boolean) {
    this._screenshot = Util.toBoolean(value);
  }

  get screenshot(): boolean {
    return this._screenshot;
  }

  @Input() set hotkey(value: boolean) {
    this._hotkey = Util.toBoolean(value);
  }

  get hotkey(): boolean {
    return this._hotkey;
  }

  @Input() set preload(value: Preload) {
    this._preload = value;
  }

  get preload(): Preload {
    return this._preload;
  }

  @Input() set volume(value: number) {
    this._volume = Util.toNumber(value, null);
  }

  get volume(): number {
    return this._volume;
  }

  @Input() set apiBackend(value: DPlayerAPIBackend) {
    this._apiBackend = value;
  }

  get apiBackend(): DPlayerAPIBackend {
    return this._apiBackend;
  }

  @Input() set mutex(value: boolean) {
    this._mutex = Util.toBoolean(value);
  }

  get mutex(): boolean {
    return this._mutex;
  }

  @Input() set video(value: DPlayerVideo) {
    this._video = value;
  }

  get video(): DPlayerVideo {
    return this._video;
  }

  @Input() set contextmenu(value: DPlayerContextMenuItem[]) {
    this._contextmenu = value;
  }

  get contextmenu(): DPlayerContextMenuItem[] {
    return this._contextmenu;
  }

  @Input() set src(value: string) {
    this._video.url = String(value);
  }

  get src(): string {
    return this._video.url;
  }

  @Input() set poster(value: string) {
    this._video.pic = String(value);
  }

  get poster(): string {
    return this._video.pic;
  }

  @Input() set subtitle(value: DPlayerSubTitle) {
    this._subtitle = value;
  }

  get subtitle(): DPlayerSubTitle {
    return this._subtitle;
  }

  @Input() set danmaku(value: DPlayerDanmaku) {
    this._danmaku = value;
  }

  get danmaku(): DPlayerDanmaku {
    return this._danmaku;
  }

  @Input() set highlight(value: DPlayerHighLightItem[]) {
    this._highlight = value;
  }

  get highlight(): DPlayerHighLightItem[] {
    return this._highlight;
  }

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
    private DPService: DPlayerService,
    private APIService: DPlayerApiService
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
