export class NavItem {
  label: string;
  subLabel: string;
  routerLink: string;
  url: string;
  icon: string;
  target: string;

constructor(label: string, subLabel: string, routerLink: string, url: string, icon: string, target: string) {

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

  if(target != '') {
    this.target = target;
  } else {
    this.target = "_self";
  }


}

}
