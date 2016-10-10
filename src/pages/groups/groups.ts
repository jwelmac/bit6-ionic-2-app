import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader } from '../tab-header/tab-header';
/*
  Generated class for the Groups page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {
  tabHeader: TabHeader = new TabHeader("Groups", "ios-add-circle-outline");

  constructor(public navCtrl: NavController) {}

}
