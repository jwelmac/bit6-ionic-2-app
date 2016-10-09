import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Calls Page');
  }

}
