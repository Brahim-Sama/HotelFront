import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/classes/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(s?: string): Observable<Client[]> {
    console.log(environment.backendUri + 'client');
    return this.http.get<Client[]>(
      environment.backendUri + 'client',
      this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(
      environment.backendUri + 'client/' + id,
      this.config.httpOptions
    );
  }

  getById(id?: number): Observable<Client> {
    return this.http.get<Client>(
      environment.backendUri + 'client/' + id,
      this.config.httpOptions
    );
  }

  editClient(id?: number): Observable<any> {
    return this.http.put(
      environment.backendUri + 'client/' + id,
      this.config.httpOptions
    );
  }

  add(c: Client): Observable<any> {
    return this.http.post(
      environment.backendUri + 'client',
      c,
      this.config.httpOptions
    );
  }

  update(c: Client): Observable<any> {
    return this.http.put(
      environment.backendUri + 'client/' + c.id,
      c,
      this.config.httpOptions
    );
  }
}
