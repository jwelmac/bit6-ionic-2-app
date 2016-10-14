import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

declare var Bit6;

@Injectable()
export class AppData {
  //Bit6 instance
  public b6: any;
  //Config param
  private configUrl: string = "app.config.json";
  //App configuration
  public config: any;

  constructor(
    public http: Http,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.http.get(this.configUrl)
             .map(res => res.json())
             .subscribe(data => this.config = data,
                        err => this.handleError);
  }

  //Initialize Bit6
  initBit6() {
    try {
      this.b6 = Bit6.init(this.config.API);
    } catch (Error) {
      console.log("Bit6 not found. Ensure you are serving using Phonegap or Cordova?");
    }
  }

  handleError(error: any, cb: any = false) {
    let msg = (error.message || error);
    this.showToast('Error: '+msg);
    cb ? cb(msg) : null;
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      duration: 5000,
      closeButtonText: "OK"
    });

    toast.present();
  }

  setDisplayName(): string {
    return this.b6.session.displayName = this.b6.getNameFromIdentity(this.b6.session.identity);
  }

  getDisplayName(): string {
    return this.b6 ? this.b6.session.displayName : "User Name";
  }
}
