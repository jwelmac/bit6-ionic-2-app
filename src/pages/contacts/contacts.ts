import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';

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
  headerIcons: TabHeaderIcon[] = [{name: "ios-person-add-outline"}];
  tabHeader: TabHeader = new TabHeader("Contacts", this.headerIcons);

  constructor(public navCtrl: NavController) {}

}
