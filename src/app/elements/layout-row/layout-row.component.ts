import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-row',
  templateUrl: './layout-row.component.html',
  styleUrls: ['./layout-row.component.scss'],
  host: {'class': 'layout-row'}
})
export class LayoutRowComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
