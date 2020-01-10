import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {FavoriteLink} from '../../domain/FavoriteLink';
import {NavItem} from '../../domain/NavItem';
import {switchMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public navItems: NavItem[] = [];
  public shortcutNNavItems: NavItem[] = [
    {
      label: 'NU-sjukvården',
      routerLink: '/koordinering/1',
      icon: 'arrow-right',
      subLabel: 'Koordinering',
      target: null,
      url: null
    },
    {
      label: 'NU-sjukvården - Område 1',
      routerLink: '/vpl/1/1',
      icon: 'arrow-right',
      subLabel: 'Vårdplatsläge',
      target: null,
      url: null
    }
  ];

  public favoriteLinks: FavoriteLink[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private userLoggedIn$: Subscription;

  ngOnInit() {
    this.userLoggedIn$ = this.auth.isUserLoggedIn.pipe(
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return this.http.get('/api/favorite-link/username/' + this.auth.getLoggedInUserId());
        } else {
          return of([]);
        }
      })
    ).subscribe((fos: FavoriteLink[]) => {
      this.navItems = this.toNavItems(fos);
      this.favoriteLinks = fos;
    });
  }

  ngOnDestroy(): void {
    this.userLoggedIn$.unsubscribe();
  }

  private toNavItems(fromThese: FavoriteLink[]): NavItem[] {
    const results: NavItem[] = [];
    for (const item of fromThese) {
      const nav = new NavItem(item.name, item.info, item.url, '', 'arrow-right', '');
      results.push(nav);
    }
    return results;
  }

  get loggedIn() {
    return this.auth.isUserLoggedIn.getValue();
  }
}
