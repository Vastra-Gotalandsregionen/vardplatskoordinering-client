import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../service/state.service';
import { AuthService } from '../../service/auth.service';
import { TokenResponse } from '../../domain/token-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userId: string;
  password: string;

  @Output() loggedIn = new EventEmitter<void>();

  loginMessage: string;

  constructor(private http: HttpClient,
              private stateService: StateService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.http.post('/api/login', {username: this.userId, password: this.password})
      .subscribe((response: TokenResponse) => {

        this.loggedIn.emit();
        this.authService.jwt = response.token;
      });
  }

}
