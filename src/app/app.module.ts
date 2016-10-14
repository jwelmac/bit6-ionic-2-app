import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Ucfirst } from "../pipes/ucfirst";

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactListPage } from '../pages/contacts/contact-list/contact-list';
import { ContactsPage } from '../pages/contacts/contacts';
import { TabsPage } from '../pages/tabs/tabs';
import { TabHeaderComponent } from '../pages/tabs/tab-header/tab-header';
import { LoginPage } from "../pages/login/login";
import { ChatsPage } from '../pages/chats/chats';
import { GroupsPage } from '../pages/groups/groups';
import { CallsPage } from '../pages/calls/calls';
import { AppData }  from "../providers/app-data";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactListPage,
    ContactsPage,
    TabsPage,
    TabHeaderComponent,
    LoginPage,
    ChatsPage,
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
    ChatsPage,
    GroupsPage,
    CallsPage
  ],
  providers: [AppData, Storage]
})
export class AppModule {}
