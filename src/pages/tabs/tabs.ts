import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

export interface TabRoot {
  title: string,
  icon: string,
  component: any
}

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public tabs: TabRoot[] = [
    {title: "Home", icon: "home", component: HomePage},
    {title: "About", icon: "information-circle", component: AboutPage},
    {title: "Contact", icon: "contacts", component: ContactPage}
  ];

  constructor() {

  }
}
