import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../domain/NavItem';
import { HttpClient } from '@angular/common/http';
import { Administration } from '../../../domain/Administration';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-vpl-areas',
  templateUrl: './vpl-areas.component.html',
  styleUrls: ['./vpl-areas.component.scss']
})
export class VplAreasComponent implements OnInit {

  administrations: Administration[];
  navItems: NavItem[] = [];

  private management: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private authService: AuthService) {
    this.management = route.snapshot.params.management;
  }

  ngOnInit() {
    const options = {params: {management: this.management, administrations: []}};

    if (this.authService.isAuthenticated()) {
      options.params.administrations = this.authService.getAdministrationIds();
    }

    this.http.get('/api/administration', options)
      .subscribe((administrations: Administration[]) => {
        this.administrations = administrations;

        for (const administration of administrations) {
          const navItem = new NavItem(administration.verks, 'Välj', administration.id.toString(), '', 'arrow-right', '');
          this.navItems.push(navItem);
        }
      });
  }

}

