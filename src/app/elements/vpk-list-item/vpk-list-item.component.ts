import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-list-item',
  templateUrl: './vpk-list-item.component.html',
  styleUrls: ['./vpk-list-item.component.scss'],
  host: {'class': 'vpk-list-item'}
})
export class VpkListItemComponent implements OnInit {

  @Input() text: string = '';
  @Input() url: string = '';
  @Input() icon: string;
  @Input() iconSet: string;

  constructor() { }

  ngOnInit() {
  }

}
