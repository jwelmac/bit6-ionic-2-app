import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
  //Config param
  private configUrl: string = "app.config.json";
  //App configuration
  private config: any;

  constructor(public http: Http, public storage: Storage) {
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
      // var fn = isNewUser ? 'signup' : 'login';
      return new Promise( (resolve, reject) => {
          var msg = isNewUser ? 'New user' : 'Login';
          if (this.keepLoggedIn) {
              // Save auth data
              msg = msg+": "+ident+" - logged in";
              this.storage.set(AUTH_KEY, msg);
              resolve(msg);
          } else {
              reject(msg+": Error Thrown");
          }
        // this.b6.session[fn]({'identity': uri+":"+ident, 'password': pass}, err => {
        //     if (err) {
        //         console.log('auth error', err);
        //         var msg = isNewUser ? 'New user' : 'Login';
        //         msg += ': ' + err.message;
        //         reject(msg);
        //     }
        //     else {
        //         if (this.keepLoggedIn) {
        //             // Save auth data
        //             this.storage.set('bit6_auth', this.b6.session.save());
        //         }
        //         resolve();
        //     }
        // });
      });
  }


  //Store login data to resume session
  rememberLogin(event) {
    this.storage.set('keepLoggedIn', event.checked)
                .then(() => this.keepLoggedIn = event.checked);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
