import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../../components';
import { ContactListPage }  from "../contacts/contact-list/contact-list";

@Component({
  selector: 'page-calls',
  templateUrl: 'calls.html'
})
export class CallsPage {
  headerIcons: TabHeaderIcon[] = [
    {name: "videocam"},
    {name: "call", modal: ContactListPage}
  ];
  tabHeader: TabHeader = new TabHeader("Calls", this.headerIcons);
  public selectedType: string = "all";
  public callTypes = [
    {value: "all", text: "All"},
    {value: "missed", text: "Missed"},
    {value: "video", text: "Video"},
    {value: "audio", text: "Audio"},
  ];

  constructor(public navCtrl: NavController) {}

  selectCallType(event) {
      this.selectedType = event.value;
  }

}
