import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppData }  from "./app-data";


//Authorization storage key
export const AUTH_KEY = 'bit6_auth';

@Injectable()
export class AuthService {
  public config: any;
  //Should user stay logged in?
  public keepLoggedIn: boolean = false;

  constructor(
    public appData: AppData,
    public storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    //Set keepLoggedIn
    this.storage.get('keepLoggedIn')
                .then(value => this.keepLoggedIn = value);
  }

  initConfig() {
    //Set config
    this.config = this.appData.config.AUTH;
  }

  getUserType() {
    if (!this.config) {
        this.initConfig();
    }
    return this.config.username.type;
  }

  // Common click handler for signup and login buttons
  authClicked(ident, pass, isNewUser = false, uri = "usr"): Promise<any> {
      //Show loading indicator
      let loading = this.loadingCtrl.create({
        content: 'Logging in to Bit6...',
        dismissOnPageChange: true
      });
      loading.present();


      // Call either login or signup function
      let fn = isNewUser ? 'signup' : 'login';
      return new Promise( (resolve, reject) => {
        if(this.appData.b6) {
            this.appData.b6.session[fn]({'identity': uri+":"+ident, 'password': pass}, err => {
                var msg = isNewUser ? 'New user' : 'Login';
                if (err) {
                    this.authFailed(err, loading, reject);
                }
                else {
                    if (this.keepLoggedIn) {
                        // Save auth data
                        this.storage.set(AUTH_KEY, this.appData.b6.session.save());
                    }
                    resolve(msg+": "+ident+" - logged in");
                    this.appData.completeLogin();
                }
            });
        } else {
            this.authFailed("Bit6 not initialized.", loading, reject);
        }
      });
    }

    /**
    * Respond to an authentication failure
    * @param {any} err - Error Object or string containing error message
    * @param {Loading} loading - LoadingController instance
    * @param {any} reject - Promise reject callback
    */
    authFailed(err: any, loading: Loading, reject: any) {
      loading.dismiss();
      this.appData.handleError(err, reject);
    }

    /**
    * Resume a previously saved session.
    * @param {any} authToken - Authorization token saved from b6.session.save()
    * @return A Promise resolution or rejection
    */
    resumeSession(authToken: any) {
      return new Promise( (resolve, reject) => {
          if (this.appData.b6.session && authToken){
              this.appData.b6.session.resume(authToken, err => {
                  if (err) {
                      reject();
                      setTimeout(() => this.appData.showToast(err), 1000);
                  } else {
                      resolve();
                      this.appData.completeLogin();
                  }
              });
          } else {
              reject();
          }
      });
    }

    //Store login data to resume session
    rememberLogin(event) {
      this.storage.set('keepLoggedIn', event.checked)
                  .then(() => this.keepLoggedIn = event.checked);
    }

}
