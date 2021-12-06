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
}
