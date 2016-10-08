import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AppData }  from "../providers/app-data";

declare var Bit6;

@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage: any;
  showLogin: boolean;

  constructor(platform: Platform, private appData: AppData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //initBit6
      this.initBit6();
    });

    this.showLogin = true;

    //Set the root page
    this.rootPage = this.showLogin ? LoginPage : TabsPage;
  }

  initBit6() {
    var apikey = this.appData.getApiKey();
    console.log("Apikey: ", apikey);
    this.appData.b6 = Bit6.init(apikey);
    console.log(this.appData.b6);
  }
}
