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
    this.login.passwordsMatch = true;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      // this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    // let toast = this.toastCtrl.create({
    //   message: "Signup to be implemented",
    //   showCloseButton: true,
    //   closeButtonText: "OK"
    // });
    //
    // toast.present();
    this.signup = !this.signup;
    console.log("Signup clicked");
  }

  checkPasswordsMatch() {
    this.login.passwordsMatch = (this.login.password === this.login.passwordCheck);
    console.log("password match checked");
  }

}
