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
    const navItems: NavItem[]  = [];

    const navItem1 = new NavItem('Åtgärdstrappan', '', '', 'https://alfresco.vgregion.se/alfresco/service/vgr/storage/node/content/10660/Vårdplatskoordinering%20inom%20område%20I%20med%20åtgärdstrappa.pdf?a=false&guest=true', 'file-download');
    const navItem2 = new NavItem('Vårdplatsläget instruktion', '', '', 'https://alfresco.vgregion.se/alfresco/service/vgr/storage/node/content/31333/Vårdplatsläget%2c%20instruktion.pdf?a=false&guest=true', 'file-download');
    const navItem3 = new NavItem('Vårdplatskoordineringens funktioner', '', '', 'https://alfresco.vgregion.se/alfresco/service/vgr/storage/node/content/28940/Vårdplatskoordineringens%20funktioner.pdf?a=false&guest=true', 'file-download');
    const navItem4 = new NavItem('Dirigeringsanvisningar', '', '', 'https://alfresco.vgregion.se/alfresco/service/vgr/storage/node/content/38253/Dirigeringsanvisningar%20för%20vårdplatskoordinator.pdf?a=false&guest=true', 'file-download');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);
    navItems.push(navItem4);

    return navItems;
  }

  getMockDocsList2(): NavItem[] {
    const navItems: NavItem[]  = [];

    const navItem1 = new NavItem('Länk till annan sida', '', '', 'http://www.google.se', 'link');
    const navItem2 = new NavItem('Information om Vårdplatskoordinering', '', '', 'http://www.google.se', 'link');
    const navItem3 = new NavItem('Aktuella kommentarer till vårdplatsläget', '', '', 'https://alfresco.vgregion.se/alfresco/service/vgr/storage/node/content/workspace/SpacesStore/c097cabf-540b-4d8f-acc9-3012a06f8f58/Aktuella%20kommentarer%20till%20vårdplatsläget.pdf?a=false&guest=true', 'link');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);

    return navItems;
  }


}
