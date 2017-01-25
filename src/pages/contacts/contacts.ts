import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../../components';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  headerIcons: TabHeaderIcon[];
  tabHeader: TabHeader;

  constructor(public navCtrl: NavController) {
    this.headerIcons = [{name: "person-add"}];
    this.tabHeader = new TabHeader("Contacts", this.headerIcons);
  }

}
