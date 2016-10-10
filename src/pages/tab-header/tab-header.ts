import { Component, Input } from '@angular/core';

/*
  Generated class for the TabHeader page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class TabHeader {
  constructor (
    public title: string,
    public icon: string = ""
  ){}
}

@Component({
  selector: 'tab-header',
  templateUrl: 'tab-header.html'
})
export class TabHeaderComponent {
  @Input() tabHeader: TabHeader;

  constructor() {}
}
