import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from "../tabs/tabs";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      // this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    console.log("Signup clicked");
  }

}
