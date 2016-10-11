import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TabsPage } from "../tabs/tabs";
import { AppData }  from "../../providers/app-data";

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
    password?: string,
    passwordCheck?: string,
    passwordsMatch?: boolean
  } = {};
  submitted: boolean = false;
  signup: boolean = false;
  passwordCheck: any;

  constructor(
    public navCtrl: NavController,
    public appData: AppData,
    private toastCtrl: ToastController
  ) {
    this.login.passwordsMatch = false;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.appData.authClicked(this.login.username, this.login.password, this.signup)
                  .then( msg => this.navCtrl.push(TabsPage).then( () => this.showToast(msg) ))
                  .catch( msg => this.showToast(msg));
    }
  }

  onSignup(form) {
    this.signup = !this.signup;
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

  checkPasswordsMatch() {
    this.login.passwordsMatch = (this.login.password === this.login.passwordCheck);
  }

}
