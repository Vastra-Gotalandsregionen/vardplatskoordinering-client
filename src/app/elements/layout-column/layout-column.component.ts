import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-layout-column',
  templateUrl: './layout-column.component.html',
  styleUrls: ['./layout-column.component.scss'],
  host: {'class': 'vpk-alert'}
})
export class LayoutColumnComponent {

  @Input() width: number;
  @Input() class: string;
  @HostBinding('class')
  get classes(): string {
    let classes = this.getColumnWidthClass();
    // host declaration above seems not work
    classes = classes + ' layout-column';

    if(this.class != undefined) {
      classes = classes + ' ' + this.class;
    }

      return classes;
  }

  private getColumnWidthClass(): string {
      return 'col c' + (this.width ? this.width : 4);
  }


  constructor() {
    
  }

}
