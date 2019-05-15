import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-list',
  templateUrl: './vpk-list.component.html',
  styleUrls: ['./vpk-list.component.scss'],
  host: {'class': 'vpk-list'}
})
export class VpkListComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
