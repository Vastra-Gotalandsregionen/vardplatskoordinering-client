import { Component, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  docsList1: NavItem[] = [];
  docsList2: NavItem[] = [];

  constructor() { }

  ngOnInit() {
    this.docsList1 = this.getMockDocsList1();
    this.docsList2 = this.getMockDocsList2();
  }

  getMockDocsList1(): NavItem[] {
    let navItems: NavItem[]  = [];

    let navItem1 = new NavItem('Åtgärdstrappan', '', 'http://www.google.se', '', 'file-download');
    let navItem2 = new NavItem('Vårdplatskoordinerings funktioner', '', 'http://www.google.se', '', 'file-download');
    let navItem3 = new NavItem('Dirigeringsanvisningar', '', 'http://www.google.se', '', 'file-download');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);

    return navItems;
  }

  getMockDocsList2(): NavItem[] {
    let navItems: NavItem[]  = [];

    let navItem1 = new NavItem('Länk till annan sida', '', 'http://www.google.se', '', 'link');
    let navItem2 = new NavItem('Information om Vårdplatskoordinering', '', 'http://www.google.se', '', 'link');

    navItems.push(navItem1);
    navItems.push(navItem2);

    return navItems;
  }


}
