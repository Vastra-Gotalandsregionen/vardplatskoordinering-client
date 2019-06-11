import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private returnUrl: string;

  isLoggedIn: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  private subscription: Subscription;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;

    this.subscription = this.authService.isUserLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loggedIn() {
    this.router.navigate([this.returnUrl || '/']);
  }
}
