import { Component } from '@angular/core';

import { ChatListPage,  GroupsPage, ContactsPage, CallsPage } from '../';

export interface TabInterface {
  title: string,
  icon: string,
  component: any
}

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public tabs: TabInterface[];

  constructor() {
    this.tabs  = [
      {title: "Chats", icon: "ios-chatbubbles", component: ChatListPage},
      {title: "Contacts", icon: "ios-person", component: ContactsPage},
      {title: "Groups", icon: "ios-people", component: GroupsPage},
      {title: "Calls", icon: "ios-call", component: CallsPage}
    ];
  }
}
