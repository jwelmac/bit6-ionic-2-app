import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from "../tabs/tabs";
import { AuthService }  from "../../providers/auth-service";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {
    username?: string,
    userType?: string,
    password?: string,
    passwordCheck?: string,
    passwordsMatch?: boolean
  } = {};
  submitted: boolean = false;
  signup: boolean = false;
  passwordCheck: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService
  ) {
    this.login.passwordsMatch = false;
    this.login.userType = authService.getUserType();
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.authService.authClicked(this.login.username, this.login.password, this.signup)
                  .then( msg => this.navCtrl.push(TabsPage).then( () => console.log(msg) ))
                  .catch( msg => console.log("Auth Error:", msg));
    }
  }

  toggleSignup() {
    this.signup = !this.signup;
  }

  checkPasswordsMatch() {
    this.login.passwordsMatch = (this.login.password === this.login.passwordCheck);
  }

}
