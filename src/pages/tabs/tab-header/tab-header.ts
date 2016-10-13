import { Component, Input } from '@angular/core';

export interface TabHeaderIcon {
  name: string,
  modal?: any
}

export class TabHeader {
  constructor (
    public title: string,
    public icons: Array<TabHeaderIcon> = []
  ){
  }
}

@Component({
  selector: 'tab-header',
  templateUrl: 'tab-header.html'
})
export class TabHeaderComponent {
  @Input() tabHeader: TabHeader;

  constructor() {}

  showModal(modal) {
    if (modal){
      console.log("Showing Modal: ", modal);
    } else {
      console.log("No modal set");
    }
  }
}
