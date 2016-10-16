import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable }  from "rxjs/Observable"; // tslint:disable-line

import { ChatInterface } from '../pages/chat-list/chat-list-item/chat-list-item';
import { Bit6Listener }  from "./bit6-listener";

declare var Bit6;

@Injectable()
export class AppData {
  //Bit6 instance
  public b6: any;
  // Is Bit6 ready
  private updated = new BehaviorSubject<boolean>(false);
  bit6Updated$ = this.updated.asObservable();
  //Config param
  private configUrl: string = "app.config.json";
  //App configuration
  public config: any;

  constructor(
    public http: Http,
    public storage: Storage,
    private toastCtrl: ToastController,
    private listener: Bit6Listener
  ) {
    this.http.get(this.configUrl)
             .map(res => res.json())
             .subscribe(data => this.config = data,
                        err => this.handleError);
  }

  //Initialize Bit6
  initBit6() {
    try {
      this.b6 = Bit6.init(this.config.API);
    } catch (Error) {
      console.log("Bit6 not found. Ensure you are serving using Phonegap or Cordova?");
    }
  }

  addListeners() {
    this.listener.init(this);
  }

  //Called whenever Bit6 is updated
  setBit6Updated() {
    this.updated.next(true);
    console.log("Bit6 Updated");
  }

  handleError(error: any, cb: any = false) {
    let msg = (error.message || error);
    this.showToast('Error: '+msg);
    cb ? cb(msg) : null;
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      duration: 5000,
      closeButtonText: "OK"
    });

    toast.present();
  }

  /* Display Name Functions*/
  setDisplayName(): string {
    return this.b6.session.displayName = this.getNameFromIdentity(this.b6.session.identity);
  }

  getNameFromIdentity(uri: string): string {
    let txt = this.b6.getNameFromIdentity(uri);
    // Set first
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }

  getDisplayName(): string {
    return this.b6 ? this.b6.session.displayName : "User Name";
  }

  /* Conversation Functions */
  getChatList() {
    let chats = {};
    if (this.b6) {
      chats = Object.keys(this.b6.conversations)
                    .map(uri => {
                      let lastMsg = this.b6.conversations[uri].getLastMessage();
                      let chat: ChatInterface = {
                        from: this.getNameFromIdentity(uri),
                        uri: uri,
                        lastMessage: this.getMessageContent(lastMsg),
                        updated: this.getMessageUpdateTime(lastMsg)
                      };
                      return chat;
                    });
    }
    return chats;
  }

  //Get the content of a message
  getMessageContent(msg: any): string {
    let latestText = '';
    if (msg) {
        // Show the text from the latest conversation
        if (msg.content) {
            latestText = msg.content;
        }
        // If no text, but has an attachment, show the mime type
        else if (msg.data && msg.data.type) {
            latestText = msg.data.type;
        }
    }
   return latestText;
  }

  //Get the time a message was last updated
  getMessageUpdateTime(msg: any): string {
    return 'now';
  }
}
