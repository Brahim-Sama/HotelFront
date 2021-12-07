import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/classes/admin';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(s?: string): Observable<Admin[]> {
    console.log(environment.backendUri + 'admin');
    return this.http.get<Admin[]>(
      environment.backendUri + 'admin',
      this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(
      environment.backendUri + 'admin/' + id,
      this.config.httpOptions
    );
  }

  getById(id?: number): Observable<Admin> {
    return this.http.get<Admin>(
      environment.backendUri + 'admin/' + id,
      this.config.httpOptions
    );
  }

  editAdmin(id?: number): Observable<any> {
    return this.http.put(
      environment.backendUri + 'admin/' + id,
      this.config.httpOptions
    );
  }

  add(a: Admin): Observable<any> {
    return this.http.post(
      environment.backendUri + 'admin',
      a,
      this.config.httpOptions
    );
  }

  update(a: Admin): Observable<any> {
    return this.http.put(
      environment.backendUri + 'admin/' + a.id,
      a,
      this.config.httpOptions
    );
  }
}
