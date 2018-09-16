import { Inject, Injectable, Optional } from '@angular/core';
import DPlayer, { DPlayerOptions } from 'dplayer';
import { Util } from '../util';
import { Observable, from, of } from 'rxjs';
import { filter, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DPlayerService {
  private _pid = -0x1;
  public set pid(id: number) {
    this._pid = id;
  }

  public get pid(): number {
    return this._pid;
  }

  private readonly _dp: {
    id: number,
    dp: DPlayer
  }[] = [];
  public set dp(_p: DPlayer) {
    this._dp.push({
      id: this.pid,
      dp: _p
    });
  }

  public get dp(): DPlayer {
    return this._dp.find(_p => {
      return this.pid === _p.id;
    }).dp;
  }

  private readonly _dpOptions: {
    id: number,
    op: DPlayerOptions
  }[] = [];
  public set dpOptions(_o: DPlayerOptions) {
    this._dpOptions.push({
      id: ++this.pid,
      op: Util.safeSet(_o)
    });
  }

  public get dpOptions(): DPlayerOptions {
    return this._dpOptions.find(_o => {
      return this.pid === _o.id;
    }).op;
  }

  constructor(
    @Optional() @Inject('config') private config: any
  ) {
  }

  createPlayer(): Observable<DPlayer> {
    return of(this.dpOptions)
      .pipe(
        mergeMap(_o => of(this.config ? Object.assign(this.config, _o) : _o)),
        switchMap(_o => of(new DPlayer(_o)))
      )
      .pipe(
        tap(_dp => {
          this.dp = _dp;
        })
      );
  }

  destroyPlayer(p?: any): Observable<number> {
    return from(this._dp)
      .pipe(
        filter(_p => _p.dp === p)
      )
      .pipe(
        tap(_p => _p.dp.destroy()),
        switchMap(_p => of(this._dp.indexOf(_p)))
      )
      .pipe(
        tap(_i => this._dp.splice(_i, 1)),
        mapTo(this.pid)
      );
  }

  findInstance(id: number): DPlayer {
    return this._dp.find(_p => {
      return id === _p.id;
    }).dp;
  }

  findOptions(id: number): DPlayerOptions {
    return this._dpOptions.find(_o => {
      return id === _o.id;
    }).op;
  }
}
