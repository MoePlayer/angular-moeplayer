<p align="center">
  <img src="https://i.imgur.com/Ku8opUv.png" width="100">
</p>

[![npm](https://img.shields.io/npm/v/angular-dplayer.svg)](https://www.npmjs.com/package/angular-dplayer)
[![npm](https://img.shields.io/npm/l/angular-dplayer.svg)](https://github.com/MoePlayer/angular-moeplayer/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/angular-dplayer.svg)](https://www.npmjs.com/package/angular-dplayer)

# Angular-DPlayer

> An Angular 6.x video player component based on [DPlayer](https://github.com/DIYgod/DPlayer).

## Install

```bash
npm install angular-dplayer --save
```

## @Component

#### Example Browser App Usage

> style.css
```css
@import "~dplayer/dist/DPlayer.min.css";
```

> app.module.ts
```typescript
import { DPlayerModule } from 'angular-dplayer';

@NgModule({
  imports: [
    DPlayerModule
  ]
})
```

> app.component.ts
```typescript
import { Component } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';

@Component({
  selector: 'app-root',
  template: `<d-player preload="auto" [video]="{url: 'http://example.com/video.mp4'}" [(volume)]="volume" (resize)="onResize()"></d-player>`
})
export class AppComponent {
  constructor(
    private DPService: DPlayerService
  ) {
  }

  onResize() {
    console.log('resize');
  }
}

```

#### Attribute Like A Native Video Element

```angular2html
<d-player src="http://example.com/video.webm" poster="http://example.com/poster.jpg"></d-player>
```

#### Advanced Usage

> enable hls or dash suppot by directive

```angular2html
<d-player dpHls [video]="{url: 'http://example.com/video.m3u8'}"></d-player>
```

> FLV Live Stream

```angular2html
<d-player dpFlv [live]="true" [video]="{url: 'http://example.com/video.flv'}"></d-player>
```

> control video status

```typescript
import { Component } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';

@Component({
  selector: 'app-root',
  template: `<d-player #player [video]="{url: 'http://example.com/video.mp4'}" (resize)="onResize(player)"></d-player>`
})
export class AppComponent {
  constructor(
    private DPService: DPlayerService
  ) {
  }

  onResize(player) {
    player.pause();
  }
}
```

## Options
[DPlayer Options Doc](http://dplayer.js.org/#/home?id=options)

## Events
[DPlayer Events Doc](http://dplayer.js.org/#/home?id=event-binding)

## API
[APIs](http://dplayer.js.org/#/home?id=api)

## Related
- [DPlayer](https://github.com/DIYgod/DPlayer)
- [vue-dplayer](https://github.com/MoePlayer/vue-dplayer)
- [react-dplayer](https://github.com/MoePlayer/react-dplayer)

# License

This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
