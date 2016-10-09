import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  login: {username?: string, password?: string} = {};
  submitted: boolean = false;

  constructor(public navCtrl: NavController, public appData: AppData) {}

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
