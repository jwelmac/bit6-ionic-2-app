import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AppData, AUTH_KEY }  from "../providers/app-data";


@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild("content") nav: NavController;

  constructor(
    public platform: Platform,
    private appData: AppData,
    private storage: Storage
  ) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        //initBit6
        this.appData.initBit6();
      });

      //Set the root page
      this.storage.get(AUTH_KEY).then( value => {
          if (appData.b6 && value){
              appData.b6.session.resume(value, err => {
                  if (err) {
                      this.rootPage = LoginPage;
                      setTimeout(() => appData.showToast(err), 1000);
                  } else {
                      this.rootPage = TabsPage;
                      console.log('Bit6:', appData.b6);
                  }
              });
          } else {
            this.rootPage = LoginPage;
          }
      });
  }

  logout() {
    this.storage.remove(AUTH_KEY)
                .then(() => this.nav.push(LoginPage));
  }
}
