import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {GlobalStateService} from '../../service/global-state.service';
import {StateService} from '../../service/state.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {FavoriteLink} from '../../domain/FavoriteLink';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'vpk-button-favo',
  templateUrl: './vpk-button-favo.component.html',
  styleUrls: ['./vpk-button-favo.component.scss']
})
export class VpkButtonFavoComponent implements OnInit {

  @Input() color: string;
  @Input() class = '';
  @Input() disabled = false;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() name: string;

  public isFavorite = false;

  public model: FavoriteLink = null;

  loggedIn: boolean;

  @HostBinding('class')
  get classes(): string {

    let classes = 'vpk-button';

    if (this.class !== undefined) {
      classes = classes + ' ' + this.class;
    }
    return classes;
  }

  constructor(private global: GlobalStateService,
              private stateService: StateService,
              private http: HttpClient,
              public authService: AuthService) {
    const fetchUrl = 'api/favorite-link/username/' + authService.getLoggedInUserId() + '?url='
      + encodeURIComponent(location.pathname.replace('/', '_')) + '';

    http.get(fetchUrl).subscribe((r: FavoriteLink[]) => {
      this.isFavorite = r.length === 1;
      if (r.length === 1) {
        this.model = r[0];
      } else {
        this.model = null;
        this.isFavorite = false;
      }
    });
  }

  ngOnInit() {
    this.authService.isUserLoggedIn.pipe(
      switchMap(loggedIn => {
        this.loggedIn = loggedIn;
        if (loggedIn) {
          const fetchUrl = 'api/favorite-link/username/' + this.authService.getLoggedInUserId() + '?url='
            + encodeURIComponent(location.pathname.replace('/', '_')) + '';
          return this.http.get(fetchUrl);
        } else {
          return of([]);
        }
      })
    ).subscribe((r: FavoriteLink[]) => {
        this.isFavorite = r.length === 1;
        if (r.length === 1) {
          this.model = r[0];
        } else {
          this.model = null;
          this.isFavorite = false;
        }
      });
  }

  public toggleFavoriteForCurrentPage() {
    if (!this.isFavorite) {
      const favo = new FavoriteLink();
      favo.name = document.getElementsByClassName('vpk-title-row-heading')[0].textContent.split(',')[0];

      favo.info = this.name;
      favo.url = location.pathname;

      this.http.put('/api/favorite-link/user/' + this.authService.getLoggedInUserId(), favo).subscribe((result: FavoriteLink) => {
        this.isFavorite = true;
        this.model = result;
      });
    } else {
      this.http.delete('/api/favorite-link/' + this.model.id).subscribe(r => {
        this.isFavorite = false;
        this.model = null;
      });
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}
