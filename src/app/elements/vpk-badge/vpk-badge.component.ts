import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-badge',
  templateUrl: './vpk-badge.component.html',
  styleUrls: ['./vpk-badge.component.scss'],
  host: {'class': 'vpk-badge'}
})
export class VpkBadgeComponent implements OnInit {

  @Input() value: string = '';
  @Input() color: string = ''; // red, green, yellow (default black)
  @Input() size: string = 'm'; // s, m, l, xl
  @Input() autoX: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
