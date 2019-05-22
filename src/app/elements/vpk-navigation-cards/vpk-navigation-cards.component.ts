import { Component, Input, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'vpk-navigation-cards',
  templateUrl: './vpk-navigation-cards.component.html',
  styleUrls: ['./vpk-navigation-cards.component.scss'],
  host: {'class': 'vpk-navigation-cards'}
})
export class VpkNavigationCardsComponent implements OnInit {

  @Input() navItems: NavItem[];

  constructor() { }

  ngOnInit() {
  }

  

}
