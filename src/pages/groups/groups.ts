import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../../components';
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
  headerIcons: TabHeaderIcon[] = [{name: "add-circle"}];
  tabHeader: TabHeader = new TabHeader("Groups", this.headerIcons);

  constructor(public navCtrl: NavController) {}

}
