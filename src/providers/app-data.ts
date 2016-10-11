import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

declare var Bit6;

//Authorization storage key
export const AUTH_KEY = 'bit6_auth';

/*
  Generated class for the AppData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppData {
  //Bit6 instance
  public b6: any;
  //Should user stay logged in?
  public keepLoggedIn: boolean = false;
  // Current username
  public displayName: string;
  //Config param
  private configUrl: string = "app.config.json";
  //App configuration
  private config: any;

  constructor(
    public http: Http,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.http.get(this.configUrl)
             .map(res => res.json())
             .subscribe(data => this.config = data,
                        err => this.handleError);

    this.storage.get('keepLoggedIn')
                .then(value => this.keepLoggedIn = value);
  }

  //Initialize Bit6
  initBit6() {
    try {
      this.b6 = Bit6.init(this.config.API);
    } catch (Error) {
      console.log("Bit6 not found. Ensure you are serving using Phonegap or Cordova?");
    }
  }

  // Common click handler for signup and login buttons
  authClicked(ident, pass, isNewUser = false, uri = "usr"): Promise<any> {
      // Call either login or signup function
      var fn = isNewUser ? 'signup' : 'login';
      return new Promise( (resolve, reject) => {
          // var msg = isNewUser ? 'New user' : 'Login';
          // if (this.keepLoggedIn) {
          //     // Save auth data
          //     msg = msg+": "+ident+" - logged in";
          //     this.storage.set(AUTH_KEY, msg);
          //     resolve(msg);
          // } else {
          //     var err = {message: "Error message", line: 65};
          //     this.handleError(err);
          //     reject(err);
          // }
        this.b6.session[fn]({'identity': uri+":"+ident, 'password': pass}, err => {
            var msg = isNewUser ? 'New user' : 'Login';
            if (err) {
                msg += ': ' + err.message;
                this.handleError(msg);
                reject(err);
            }
            else {
                if (this.keepLoggedIn) {
                    // Save auth data
                    this.storage.set(AUTH_KEY, this.b6.session.save());
                }
                resolve(msg+": "+ident+" - logged in");
            }
        });
      });
  }


  //Store login data to resume session
  rememberLogin(event) {
    this.storage.set('keepLoggedIn', event.checked)
                .then(() => this.keepLoggedIn = event.checked);
  }

  private handleError(error: any) {
    this.showToast('Error: '+(error.message || error));
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      duration: 3000,
      closeButtonText: "OK"
    });

    toast.present();
  }

  setDisplayName(): string {
    return this.b6.session.displayName = this.b6.getNameFromIdentity(this.b6.session.identity);
  }

}
