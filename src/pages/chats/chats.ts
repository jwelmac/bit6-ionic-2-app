import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader } from '../tab-header/tab-header';

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
  tabHeader: TabHeader = new TabHeader("Chats", "ios-create-outline");
  
  constructor(public navCtrl: NavController) {}
}
