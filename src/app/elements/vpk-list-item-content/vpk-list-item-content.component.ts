import { Component, Input, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'vpk-list-item-content',
  templateUrl: './vpk-list-item-content.component.html',
  styleUrls: ['./vpk-list-item-content.component.scss'],
  host: {'class': 'vpk-list-item-content'}
})
export class VpkListItemContentComponent implements OnInit {

  @Input() navItem: NavItem[];

  constructor() { }

  ngOnInit() {
  }

}
