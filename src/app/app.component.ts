import { Component } from '@angular/core';
import { DPlayerService } from '../../projects/d-player/src/lib/d-player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private DPService: DPlayerService
  ) {
  }
}
