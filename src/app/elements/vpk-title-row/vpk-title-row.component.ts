import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-title-row',
  templateUrl: './vpk-title-row.component.html',
  styleUrls: ['./vpk-title-row.component.scss'],
  host: {'class': 'vpk-title-row'}
})
export class VpkTitleRowComponent implements OnInit {

  @Input() headingColumnWidth: number = 8;
  @Input() controlsColumnWidth: number = 4;
  @Input() heading: string;

  constructor() { }

  ngOnInit() {
  }

}
