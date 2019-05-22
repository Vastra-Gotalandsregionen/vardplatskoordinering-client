import { Component, OnInit, ViewChild } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'app-styleguide',
  templateUrl: './styleguide.component.html',
  styleUrls: ['./styleguide.component.scss']
})
export class StyleguideComponent implements OnInit {

  cardNavItems: NavItem[] = [];
  listNavItems: NavItem[] = [];

  alertMessage: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate eleifend fermentum. Maecenas pellentesque sollicitudin rhoncus.';

  constructor() { }

  ngOnInit() {
    this.cardNavItems = this.getCardNavItems();
    this.listNavItems = this.getListNavItems();
  }

  getCardNavItems(): NavItem[] {
    let navItems: NavItem[]  = [];

    let navItem1 = new NavItem('Hem', 'Välj', '/hem', '', '');
    let navItem2 = new NavItem('Koordinering', 'Välj', '/koordinering', '', '');
    let navItem3 = new NavItem('Administration', 'Välj', '/administration', '', '');
    let navItem4 = new NavItem('Google', 'Välj', '', 'http://www.google.se', '');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);
    navItems.push(navItem4);

    return navItems;
  }

  getListNavItems(): NavItem[] {
    let navItems: NavItem[]  = [];

    let navItem1 = new NavItem('Till startsidan', '', '/hem', '', 'arrow-right');
    let navItem2 = new NavItem('Ladda ner', '', '#download-dummy', '', 'file-download');
    let navItem3 = new NavItem('Google', '', '', 'http://www.google.se', 'arrow-right');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);

    return navItems;
  }  

}
