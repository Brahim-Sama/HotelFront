import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resa } from 'src/app/classes/resa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResaService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(s?: string): Observable<Resa[]> {
    console.log(environment.backendUri + 'resa');
    return this.http.get<Resa[]>(
      environment.backendUri + 'resa',
      this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(
      environment.backendUri + 'resa/' + id,
      this.config.httpOptions
    );
  }

  getById(id?: number): Observable<Resa> {
    return this.http.get<Resa>(
      environment.backendUri + 'resa/' + id,
      this.config.httpOptions
    );
  }

  editResa(id?: number): Observable<any> {
    return this.http.put(
      environment.backendUri + 'resa/' + id,
      this.config.httpOptions
    );
  }

  add(r: Resa): Observable<any> {
    return this.http.post(
      environment.backendUri + 'resa',
      r,
      this.config.httpOptions
    );
  }

  update(r: Resa): Observable<any> {
    return this.http.put(
      environment.backendUri + 'resa/' + r.id,
      r,
      this.config.httpOptions
    );
  }
}
