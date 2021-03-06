import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../../app.component';
import { FooterComponent } from '../footer/footer.component';
import { ConfigService } from '../../services/config.service';
import { Admin } from 'src/app/classes/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FooterComponent],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private app: AppComponent,
    private config: ConfigService
  ) {}

  ngOnInit(): void {}

  authenticate() {
    let u = { username: this.username, password: this.password };

    // http://localhost:8080/api/login
    this.http.post<Admin>(environment.backendUri + 'login', u).subscribe({
      next: (data) => {
        sessionStorage.setItem('connected', '1');
        sessionStorage.setItem('admin', JSON.stringify(data));
        this.router.navigate(['client']);
        this.app.admin = data;

        this.config.httpOptions.headers = new HttpHeaders({
          Authorization: 'Basic ' + data.password,
        });

        console.log('Basic ' + data.password);
        console.log(this.config.httpOptions.headers);
      },
    });
  }
}
