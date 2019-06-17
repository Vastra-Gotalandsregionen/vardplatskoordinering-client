import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {FavoriteLink} from '../../domain/FavoriteLink';
import {NavItem} from '../../domain/NavItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public navItems: NavItem[] = [];

  public favoriteLinks: FavoriteLink[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
    this.http.get('/api/favorite-link/username/' + this.auth.getLoggedInUserId()).subscribe((fos: FavoriteLink[]) => {
      console.log(fos);
      this.navItems = this.toNavItems(fos);
      this.favoriteLinks = fos;
    });
  }

  private toNavItems(fromThese: FavoriteLink[]): NavItem[] {
    const results: NavItem[] = [];
    for (const item of fromThese) {
      const nav = new NavItem(item.name, item.info, '', item.url, '');
      results.push(nav);
    }
    return results;
  }

}
