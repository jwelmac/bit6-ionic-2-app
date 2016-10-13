import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToastController, LoadingController } from 'ionic-angular';
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

  constructor(
    public http: Http,
    public storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
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
      //Show loading indicator
      let loading = this.loadingCtrl.create({
        content: 'Logging in to Bit6...',
        dismissOnPageChange: true
      });
      loading.present();

      // Call either login or signup function
      let fn = isNewUser ? 'signup' : 'login';
      return new Promise( (resolve, reject) => {
        this.b6.session[fn]({'identity': uri+":"+ident, 'password': pass}, err => {
            var msg = isNewUser ? 'New user' : 'Login';
            if (err) {
                msg += ': ' + err.message;
                this.handleError(msg);
                reject(err);
                loading.dismiss();
            }
            else {
                if (this.keepLoggedIn) {
                    // Save auth data
                    this.storage.set(AUTH_KEY, this.b6.session.save());
                }
                resolve(msg+": "+ident+" - logged in");
                this.completeLogin();
            }
        });
      });
  }

  /*
  * Resume a previously saved session.
  * @param authToken Object - Authorization token saved from b6.session.save()
  * A Promise resolution or rejection
  */
  resumeSession(authToken) {
    return new Promise( (resolve, reject) => {
        if (this.b6.session && authToken){
            this.b6.session.resume(authToken, err => {
                if (err) {
                    reject();
                    setTimeout(() => this.showToast(err), 1000);
                } else {
                    resolve();
                    console.log('Bit6:', this.b6);
                    this.completeLogin();
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

  //Perform functions and/or set variables to complete the login process
  completeLogin() {
    this.setDisplayName();
  }

  private handleError(error: any) {
    this.showToast('Error: '+(error.message || error));
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
