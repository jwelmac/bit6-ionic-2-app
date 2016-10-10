import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader } from '../tab-header/tab-header';

/*
  Generated class for the Contacts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  tabHeader: TabHeader = new TabHeader("Contacts", "ios-person-add-outline");

  constructor(public navCtrl: NavController) {}

}
