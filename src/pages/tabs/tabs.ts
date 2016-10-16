import { Component } from '@angular/core';

import { ChatListPage } from '../chat-list/chat-list';
import { GroupsPage } from '../groups/groups';
import { ContactsPage } from '../contacts/contacts';
import { CallsPage } from '../calls/calls';

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
  public tabs: TabInterface[] = [
    {title: "Chats", icon: "ios-chatbubbles", component: ChatListPage},
    {title: "Contacts", icon: "ios-person", component: ContactsPage},
    {title: "Groups", icon: "ios-people", component: GroupsPage},
    {title: "Calls", icon: "ios-call", component: CallsPage}
  ];

  constructor() {

  }
}
