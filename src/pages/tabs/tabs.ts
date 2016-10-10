import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { GroupsPage } from '../groups/groups';
import { ContactsPage } from '../contacts/contacts';
import { CallsPage } from '../calls/calls';

export interface TabRoot {
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
  public tabs: TabRoot[] = [
    {title: "Chats", icon: "ios-chatbubbles", component: ChatsPage},
    {title: "Contacts", icon: "ios-person", component: ContactsPage},
    {title: "Groups", icon: "ios-people", component: GroupsPage},
    {title: "Calls", icon: "ios-call", component: CallsPage}
  ];

  constructor() {

  }
}
