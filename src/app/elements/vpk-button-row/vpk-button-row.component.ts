import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-button-row',
  templateUrl: './vpk-button-row.component.html',
  styleUrls: ['./vpk-button-row.component.scss']
})
export class VpkButtonRowComponent implements OnInit {

  @Input() align: string = 'left';

  constructor() { }

  ngOnInit() {
  }

}
