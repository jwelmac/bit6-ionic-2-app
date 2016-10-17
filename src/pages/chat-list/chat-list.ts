import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';
import { AppData }  from "../../providers/app-data";

import {Subscription} from 'rxjs/Subscription';


/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'chat-list.html'
})
export class ChatListPage {
  headerIcons: TabHeaderIcon[] = [{name: "create"}];
  tabHeader: TabHeader = new TabHeader("Chats", this.headerIcons);
  chatList: any;
  subscription:Subscription;

  constructor(
    public navCtrl: NavController,
    private appData: AppData
  ) {}

  ngOnInit() {
    this.subscription = this.appData.bit6Updated$
       .subscribe(updated => this.chatList = updated ? this.appData.getChatList() : []);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  openChat(chat: any) {
    console.log("Opening chat: ", chat);
  }
}
