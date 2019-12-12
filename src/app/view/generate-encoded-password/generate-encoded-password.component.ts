import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-generate-encoded-password',
  templateUrl: './generate-encoded-password.component.html',
  styleUrls: ['./generate-encoded-password.component.scss']
})
export class GenerateEncodedPasswordComponent implements OnInit {
  password: string;
  generated: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  generate() {
    this.http.post('/api/login/genpass', this.password, {responseType: 'text'}).subscribe(
      response => this.generated = response
    );
  }
}
