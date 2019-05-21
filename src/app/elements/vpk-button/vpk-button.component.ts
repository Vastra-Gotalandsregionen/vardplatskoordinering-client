import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-button',
  templateUrl: './vpk-button.component.html',
  styleUrls: ['./vpk-button.component.scss']
})
export class VpkButtonComponent implements OnInit {

  
  @Input() color: string;
  @Input() icon: string;
  @Input() iconPosition: string = 'left';
  @Input() iconSize: string = 'lg';

  constructor() { }

  ngOnInit() {
  }

}
