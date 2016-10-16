import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface ChatInterface {
  from: string,
  uri: string,
  lastMessage: string,
  updated: string
}

@Component({
  selector: 'chat-list-item',
  templateUrl: 'chat-list-item.html'
})
export class ChatListItem {
  @Input() chat: ChatInterface;
  constructor(public navCtrl: NavController) {}
}
