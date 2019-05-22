import { Component, Input, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'vpk-navigation-card-content',
  templateUrl: './vpk-navigation-card-content.component.html',
  styleUrls: ['./vpk-navigation-card-content.component.scss'],
  host: {'class': 'vpk-navigation-card-content'}
})
export class VpkNavigationCardContentComponent implements OnInit {

  @Input() navItem: NavItem;

  constructor() { }

  ngOnInit() {
  }

  

}
