import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var Bit6;

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
  private config: any;

  constructor(public http: Http) {
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

  // Common click handler for signup and login buttons
  authClicked(ident, pass, isNewUser, uri = "usr") {
      // Call either login or signup function
      var fn = isNewUser ? 'signup' : 'login';
      this.b6.session[fn]({'identity': uri+":"+ident, 'password': pass}, err => {
          if (err) {
              console.log('auth error', err);
              var msg = isNewUser ? 'New user' : 'Login';
              msg += ': ' + err.message;
          }
          else {
              if (this.keepLoggedIn) {
                  // Save auth data
                  window.localStorage.setItem('bit6_auth', JSON.stringify(this.b6.session.save()));
              }
              console.log('auth done');
          }
      });
      return false;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
