import { Component, Input, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'vpk-list',
  templateUrl: './vpk-list.component.html',
  styleUrls: ['./vpk-list.component.scss'],
  host: {'class': 'vpk-list'}
})
export class VpkListComponent implements OnInit {

  @Input() navItems: NavItem[];

  constructor() { }

  ngOnInit() {
  }

}
