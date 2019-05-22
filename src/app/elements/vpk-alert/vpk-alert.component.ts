import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-alert',
  templateUrl: './vpk-alert.component.html',
  styleUrls: ['./vpk-alert.component.scss'],
  host: {'class': 'vpk-alert'}
})
export class VpkAlertComponent implements OnInit {

  @Input() message: string;
  @Input() type: string = 'info';

  constructor() { }

  ngOnInit() {
  }

}
