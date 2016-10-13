import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListPage {

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
