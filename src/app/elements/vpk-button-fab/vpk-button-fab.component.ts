import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-button-fab',
  templateUrl: './vpk-button-fab.component.html',
  styleUrls: ['./vpk-button-fab.component.scss']
})
export class VpkButtonFabComponent implements OnInit {

  
  @Input() color: string;
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() tooltip: string;

  @HostBinding('class')
  get classes(): string {

    let classes = 'vpk-button';

    if(this.class != undefined) {
      classes = classes + ' ' + this.class;
    }

      return classes;
  }



  buttonElementClass: string = '';
  

  constructor() { }

  ngOnInit() {

  }

}
