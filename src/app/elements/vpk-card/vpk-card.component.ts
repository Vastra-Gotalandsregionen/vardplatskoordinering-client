import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-card',
  templateUrl: './vpk-card.component.html',
  styleUrls: ['./vpk-card.component.scss']
})
export class VpkCardComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() draggable: false;

  constructor() { }

  ngOnInit() {
  }

}
