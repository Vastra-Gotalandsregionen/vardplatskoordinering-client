import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-card',
  templateUrl: './vpk-card.component.html',
  styleUrls: ['./vpk-card.component.scss']
})
export class VpkCardComponent implements OnInit {

  @Input() heading: string;
  @Input() icon: string;
  @Input() iconSet = 'fas';
  @Input() draggable: false;

  constructor() { }

  ngOnInit() {
  }

}
