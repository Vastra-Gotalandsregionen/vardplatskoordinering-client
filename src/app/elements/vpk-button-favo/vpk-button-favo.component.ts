import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { GlobalStateService } from '../../service/global-state.service';
import { StateService } from '../../service/state.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { FavoriteLink } from '../../domain/FavoriteLink';

@Component({
  selector: 'vpk-button-favo',
  templateUrl: './vpk-button-favo.component.html',
  styleUrls: ['./vpk-button-favo.component.scss']
})
export class VpkButtonFavoComponent implements OnInit {

  @Input() color: string;
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() name: string;

  public isFavorite: boolean = false;

  @HostBinding('class')
  get classes(): string {

    let classes = 'vpk-button';

    if (this.class != undefined) {
      classes = classes + ' ' + this.class;
    }
    return classes;
  }


  buttonElementClass: string = '';


  constructor(private global: GlobalStateService, private stateService: StateService, private http: HttpClient, private authService: AuthService) {
    global.getManagementId().subscribe(n => console.log('managementId', n));
    console.log(stateService);
    http.get('api/favorite-link/username/' + authService.getLoggedInUserId() + '?url="' + encodeURIComponent(location.pathname.replace('/', '_')) + '"').subscribe(r => {
      console.log('Result for favo', r);
      this.isFavorite = r != null;
    });
  }

  ngOnInit() {
    console.log(this.authService.getToken());
  }

  public toggleFavoriteForCurrentPage() {
    const favo = new FavoriteLink();
    favo.name = this.name;
    var info = location.pathname.split('/')[1];
    info = info.charAt(0).toUpperCase() + info.substring(1);
    favo.info = info;
    favo.url = location.pathname;

    console.log('toggleFavoriteForCurrentPage', favo);
    this.http.put('/api/favorite-link/user/' + this.authService.getLoggedInUserId(), favo).subscribe((result: FavoriteLink) => {
      console.log('Saved as', result);
      this.isFavorite = true;
    });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

}
