import { Component } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public type: number;
  public types = [
    'MP4',
    'HLS',
    'DASH',
    'FLV'
  ];
  public eventLog = [];

  constructor(
    private DPService: DPlayerService
  ) {
    this.type = 0;
  }

  changeType() {
    this.type++;
  }
}
