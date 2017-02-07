import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';

import { UcFirst } from "../pipes/ucfirst";

import { MyApp } from './app.component';
import { TabHeaderComponent } from '../components';
import {
  AboutPage, ContactListPage, ContactsPage, TabsPage, LoginPage, ChatListPage, ChatListItem,
  GroupsPage, CallsPage
} from '../pages';
import { AppData, Bit6Listener, AuthService }  from "../providers";

//Configure cloud settings
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': ""
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactListPage,
    ContactsPage,
    TabsPage,
    TabHeaderComponent,
    LoginPage,
    ChatListPage,
    ChatListItem,
    GroupsPage,
    CallsPage,
    UcFirst
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactListPage,
    ContactsPage,
    TabsPage,
    TabHeaderComponent,
    LoginPage,
    ChatListPage,
    ChatListItem,
    GroupsPage,
    CallsPage
  ],
  providers: [AppData, Storage, AuthService, Bit6Listener]
})
export class AppModule {}
