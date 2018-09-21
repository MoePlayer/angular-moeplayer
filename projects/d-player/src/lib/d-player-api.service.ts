import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DPlayerApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  sendDanmaku(options: any) {
    this.http
      .post(options.url, options.data)
      .pipe(
        mergeMap((data: any) => data.code !== 0 ? throwError(data.msg) : of(data.data))
      )
      .subscribe(options.success, options.error);
  }

  readDanmaku(options: any) {
    this.http
      .get(options.url)
      .pipe(
        mergeMap((data: any) => data.code !== 0 ? throwError(data.msg) : of(
          data.data.map((item) => (
            {
              time: item[0],
              type: item[1],
              color: item[2],
              author: item[3],
              text: item[4]
            }
          ))
        ))
      )
      .subscribe(options.success, options.error);
  }
}
