import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hotel } from 'src/app/classes/hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(s?: string): Observable<Hotel[]> {
    console.log(environment.backendUri + 'hotel');
    return this.http.get<Hotel[]>(
      environment.backendUri + 'hotel',
      this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(
      environment.backendUri + 'hotel/' + id,
      this.config.httpOptions
    );
  }

  getById(id?: number): Observable<Hotel> {
    return this.http.get<Hotel>(
      environment.backendUri + 'hotel/' + id,
      this.config.httpOptions
    );
  }

  editHotel(id?: number): Observable<any> {
    return this.http.put(
      environment.backendUri + 'hotel/' + id,
      this.config.httpOptions
    );
  }

  add(c: Hotel): Observable<any> {
    return this.http.post(
      environment.backendUri + 'hotel',
      c,
      this.config.httpOptions
    );
  }

  update(c: Hotel): Observable<any> {
    return this.http.put(
      environment.backendUri + 'hotel/' + c.id,
      c,
      this.config.httpOptions
    );
  }
}
