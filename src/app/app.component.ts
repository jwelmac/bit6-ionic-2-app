import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AppData }  from "../providers/app-data";
import { AuthService, AUTH_KEY }  from "../providers/auth-service";


@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild("content") nav: NavController;

  constructor(
    platform: Platform,
    private appData: AppData,
    public authService: AuthService,
    private storage: Storage
  ) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        //initBit6
        appData.initBit6();

        //Set the root page
        storage.get(AUTH_KEY).then( value => {
            authService.resumeSession(value)
                   .then( () => this.rootPage = TabsPage)
                   .catch( () => this.rootPage = LoginPage);
        });
      });
  }

  logout() {
    this.storage.remove(AUTH_KEY)
                .then(() => this.nav.push(LoginPage));
  }
}
