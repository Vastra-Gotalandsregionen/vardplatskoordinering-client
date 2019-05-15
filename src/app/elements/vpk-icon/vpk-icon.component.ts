import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vpk-icon',
  templateUrl: './vpk-icon.component.html',
  styleUrls: ['./vpk-icon.component.scss']
})
export class VpkIconComponent implements OnInit {

  @Input() iconSet: string = 'fas';
  @Input() icon: string = 'circle';
  @Input() size: string = 'lg';

  iconData: string[];

  constructor() { }

  ngOnInit() {
    this.iconData = [];

    this.iconData.push(this.iconSet);
    this.iconData.push(this.icon);

  }

}
