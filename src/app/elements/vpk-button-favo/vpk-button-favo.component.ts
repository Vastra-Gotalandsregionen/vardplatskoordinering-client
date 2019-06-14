import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {GlobalStateService} from '../../service/global-state.service';
import {StateService} from '../../service/state.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {FavoriteLink} from '../../domain/FavoriteLink';

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

  public model: FavoriteLink = null;

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
    const fetchUrl = 'api/favorite-link/username/' + authService.getLoggedInUserId() + '?url="' + encodeURIComponent(location.pathname.replace('/', '_')) + '"';
    console.log(fetchUrl);
    http.get(fetchUrl).subscribe((r: FavoriteLink[]) => {
      console.log('Result for favo', r);
      this.isFavorite = r.length == 1;
      if (r.length == 1) {
        this.model = r[0];
      } else {
        this.model = null;
        this.isFavorite = false;
      }
    });
  }

  ngOnInit() {
    console.log(this.authService.getToken());
  }

  public toggleFavoriteForCurrentPage() {
    if (!this.isFavorite) {
      const favo = new FavoriteLink();
      favo.name = document.getElementsByClassName('vpk-title-row-heading')[0].textContent.split(',')[0];

      favo.info = this.name;
      favo.url = location.pathname;

      console.log('toggleFavoriteForCurrentPage', favo);
      this.http.put('/api/favorite-link/user/' + this.authService.getLoggedInUserId(), favo).subscribe((result: FavoriteLink) => {
        console.log('Saved as', result);
        this.isFavorite = true;
        this.model = result;
      });
    } else {
      this.http.delete('/api/favorite-link/' + this.model.id).subscribe(r => {
        console.log('Removed ', r);
        this.isFavorite = false;
        this.model = null;
      });
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

}
