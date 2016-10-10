import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader } from '../tab-header/tab-header';
/*
  Generated class for the Calls page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calls',
  templateUrl: 'calls.html'
})
export class CallsPage {
  tabHeader: TabHeader = new TabHeader("Calls");
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
