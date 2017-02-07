import { Injectable, NgZone } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

import { AppData }  from "./app-data";
import { UcFirst } from '../pipes/ucfirst';

@Injectable()
export class Bit6Listener {
//Local appData instance
appData: AppData;
listeners: Array<string>;
ucfirst: UcFirst;

  constructor(
    private zone: NgZone
  ) {
    this.listeners = Object.keys(this).map(listener => {
      if (listener.startsWith('on')) return listener.substr(2);
    });
    this.ucfirst = new UcFirst();
  }

  init(appData: AppData) {
    //Copy locally
    this.appData = appData;
    // Add listeners
    for (let listener in this.listeners){
      this.appData.b6.on(listener, (c, op) => {
        this[`on${this.ucfirst.transform(listener)}`](c, op);
      });
    }
  }

  /**
  * Function to run on conversation change
  * @param {any} conv - Conversation Object
  * @param {any} op - Operation performed on conversation
  */
  onConversation(conv: any, op: any){
      console.log('onConv', conv);
      this.zone.run(this.appData.setBit6Updated);
  }

}
