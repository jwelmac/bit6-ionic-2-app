import { Component } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";


@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage: any;
  showLogin: boolean;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.showLogin = true;

    //Set the root page
    this.rootPage = this.showLogin ? LoginPage : TabsPage;
  }
}
