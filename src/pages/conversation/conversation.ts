import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'conversation.html'
})
export class ConversationPage {
  conv: any;

  constructor(
    public viewCtrl: ViewController,
    private navParams: NavParams
  ) {
    this.conv.to = "Other User";
  }

  ionViewDidLoad() {
    console.log('Hello Conversation Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
