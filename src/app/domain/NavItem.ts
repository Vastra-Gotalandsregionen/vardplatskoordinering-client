export class NavItem {
  name: string;
  routerLink: string;
  url: string;
  label: string;

  constructor(name: string, routerLink: string, url: string, label: string) {

    if(name != '') {
      this.name = name;
    }

    if(routerLink != '') {
      this.routerLink = routerLink;
    }

    if(url != '') {
      this.url = url;
    }

    if(label != '') {
      this.label = label;
    }
}  

}
