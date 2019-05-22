export class NavItem {
  label: string;
  subLabel: string;
  routerLink: string;
  url: string;
  icon: string;


  constructor(label: string, subLabel: string, routerLink: string, url: string, icon: string) {

    if(label != '') {
      this.label = label;
    }

    if(subLabel != '') {
      this.subLabel = subLabel;
    }

    if(routerLink != '') {
      this.routerLink = routerLink;
    }

    if(url != '') {
      this.url = url;
    }

    if(icon != '') {
      this.icon = icon;
    }

}  

}
