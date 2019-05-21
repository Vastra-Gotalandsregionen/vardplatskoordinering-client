import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-button',
  templateUrl: './vpk-button.component.html',
  styleUrls: ['./vpk-button.component.scss']
})
export class VpkButtonComponent implements OnInit {

  
  @Input() color: string;
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() iconPosition: string = 'left';
  @Input() iconSize: string = 'sg';
  @Input() label: string;
  @Input() tooltip: string;
  

  constructor() { }

  ngOnInit() {
  }

}
