import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Ucfirst } from "../pipes/ucfirst";

import { MyApp } from './app.component';
import { TabHeaderComponent } from '../components';
import {
  AboutPage, ContactListPage, ContactsPage, TabsPage, LoginPage, ChatListPage, ChatListItem,
  GroupsPage, CallsPage
} from '../pages';
import { AppData, Bit6Listener, AuthService }  from "../providers";

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
    Ucfirst
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
