import { Component } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public type: number;
  public eventLog = [];

  constructor(
    private DPService: DPlayerService
  ) {
    this.type = 0;
  }

  resize() {
    this.eventLog.push('resize');
  }

  canplay() {
    this.eventLog.push('canplay');
  }

  changeType(type: number) {
    this.type = type;
  }
}
