import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import {TabHeader} from './';

//Component to display tab header
@Component({
  selector: 'tab-header',
  templateUrl: 'tab-header.html'
})
export class TabHeaderComponent {
  @Input() tabHeader: TabHeader;

  constructor(public modalCtrl: ModalController) {}

  showModal(modalPage) {
    if (modalPage){
      let modal = this.modalCtrl.create(modalPage);
      modal.present();
    } else {
      console.log("No modal set");
    }
  }
}
