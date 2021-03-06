import { Component, ViewChild , NgZone} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { TabsPage, LoginPage } from '../pages';
import { AppData, AuthService, AUTH_KEY }  from "../providers";


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
    private storage: Storage,
    private zone: NgZone
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
    this.appData.b6.session.logout();
    this.storage.remove(AUTH_KEY).then(() =>
          this.nav.push(LoginPage)
    );
    location.reload();
  }
}
