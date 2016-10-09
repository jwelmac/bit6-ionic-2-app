import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { ChatsPage } from '../pages/chats/chats';
import { GroupsPage } from '../pages/groups/groups';
import { CallsPage } from '../pages/calls/calls';
import { AppData }  from "../providers/app-data";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    LoginPage,
    ChatsPage,
    GroupsPage,
    CallsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    LoginPage,
    ChatsPage,
    GroupsPage,
    CallsPage
  ],
  providers: [AppData]
})
export class AppModule {}
