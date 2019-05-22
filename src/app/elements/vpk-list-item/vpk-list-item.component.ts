import { Component, Input, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'vpk-list-item',
  templateUrl: './vpk-list-item.component.html',
  styleUrls: ['./vpk-list-item.component.scss'],
  host: {'class': 'vpk-list-item'}
})
export class VpkListItemComponent implements OnInit {

  @Input() navItem: NavItem[];

  constructor() { }

  ngOnInit() {
  }

}
