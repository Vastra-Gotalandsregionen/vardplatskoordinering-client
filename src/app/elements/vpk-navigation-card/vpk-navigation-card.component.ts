import { Component, Input, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'vpk-navigation-card',
  templateUrl: './vpk-navigation-card.component.html',
  styleUrls: ['./vpk-navigation-card.component.scss'],
  host: {'class': 'vpk-navigation-card'}
})
export class VpkNavigationCardComponent implements OnInit {

  @Input() navItem: NavItem;

  constructor() { }

  ngOnInit() {
  }

  

}
