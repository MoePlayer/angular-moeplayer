import { Injectable } from '@angular/core';
import DPlayer, { DPlayerOptions } from 'dplayer';

@Injectable()
export class DPlayerService {
  private _ids: number;
  private readonly _dp: {
    id: number,
    dp: DPlayer
  }[];
  private readonly _dpOptions: {
    id: number,
    op: DPlayerOptions
  }[];

  constructor() {
    this._ids = -1;
    this._dp = [];
    this._dpOptions = [];
  }

  setOptions(options: DPlayerOptions): DPlayerService {
    this._dpOptions.push({
      id: ++this._ids,
      op: this.safeSet(options)
    });
    return this;
  }

  createPlayer(): DPlayer {
    const ref = this._dpOptions.find(_ => {
      return _.id === this._ids;
    });
    try {
      const _dp = new DPlayer(<DPlayerOptions>ref.op);
      this._dp.push({
        id: this._ids,
        dp: _dp
      });
      return _dp;
    } catch (e) {
      console.warn('dplayer init failed');
    }
  }

  destroyPlayer(id?: number): void {
    if (Number.isInteger(id)) {
      try {
        const _dp = this._dp.find((_) => {
          return id === _.id;
        });
        _dp.dp.destroy();
        this._dp.splice(this._dp.indexOf(_dp), 1);
      } catch (e) {
        console.warn('dplayer destroy failed');
      }
    } else {
      this._dp.forEach((_, i, a) => {
        try {
          _.dp.destroy();
          a.splice(i, 1);
        } catch (e) {
          console.warn('dplayers destroy failed');
        }
      });
    }
  }

  getInstance(id?: number): DPlayer {
    let _id = -1;
    if (Number.isInteger(id)) {
      _id = id;
    } else {
      _id = this._ids;
    }
    return this._dp.find(_ => {
      return _id === _.id;
    }).dp;
  }

  getPID(): number {
    return this._ids;
  }

  getOptions(id?: number): DPlayerOptions {
    let _id = -1;
    if (Number.isInteger(id)) {
      _id = id;
    } else {
      _id = this._ids;
    }
    return this._dpOptions.find(_ => {
      return _id === _.id;
    }).op;
  }

  private safeSet(obj: any): any {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'undefined') {
        delete obj[key];
      }
    });
    return obj;
  }
}
