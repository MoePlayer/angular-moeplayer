import { Component } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public type = true;
  public eventLog = [];

  constructor(
    private DPService: DPlayerService
  ) {
  }

  resize() {
    this.eventLog.push('resize');
  }

  canplay() {
    this.eventLog.push('canplay');
  }
}
