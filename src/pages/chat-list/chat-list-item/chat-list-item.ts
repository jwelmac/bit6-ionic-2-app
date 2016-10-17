import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface ChatInterface {
  from: string,
  uri: string,
  lastMessage: {
    received: boolean,
    content: string
  },
  updated: number,
  status: {
    icon: string,
    color: string
  },
  messages: Array<any>,
  unread: number
}

@Component({
  selector: 'chat-list-item',
  templateUrl: 'chat-list-item.html'
})
export class ChatListItem {
  @Input() chat: ChatInterface;
  constructor(public navCtrl: NavController) {}
}
