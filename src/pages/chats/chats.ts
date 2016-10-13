import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';

/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  headerIcons: TabHeaderIcon[] = [{name: "create"}];
  tabHeader: TabHeader = new TabHeader("Chats", this.headerIcons);

  constructor(public navCtrl: NavController) {}
}
