import { Component, HostBinding, Input, OnInit } from '@angular/core';


@Component({
  selector: 'vpk-button',
  templateUrl: './vpk-button.component.html',
  styleUrls: ['./vpk-button.component.scss']
})
export class VpkButtonComponent implements OnInit {

  
  @Input() color: string;
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() iconPosition: string = 'left';
  @Input() iconSize: string = 'sg';
  @Input() label: string;
  @Input() tooltip: string;
  @Input() type: string = 'button';

  @HostBinding('class')
  get classes(): string {

    let classes = 'vpk-button';

      if(this.class != undefined) {
        classes = classes + ' ' + this.class;
      }

      // Add icon size indication
      classes = classes + ' ' + 'vpk-button-icon-' + this.iconSize;

      return classes;
  }



  buttonElementClass: string = '';
  

  constructor() { }

  ngOnInit() {

  }

}
