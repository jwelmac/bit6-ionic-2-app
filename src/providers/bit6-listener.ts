import { Injectable, NgZone } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

import { AppData }  from "./app-data";

@Injectable()
export class Bit6Listener {

  constructor(private zone: NgZone) {
  }

  init(appData: AppData) {
    // A conversation has changed
    appData.b6.on('conversation', (c, op) => {
        console.log('onConv', c);
        this.zone.run(() => appData.setBit6Updated());
    });
  }

}
