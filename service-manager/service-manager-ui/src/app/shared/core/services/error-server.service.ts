
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private http: HttpClient) { }

  get401() {
    return this.http.get('http://httpstat.us/401');
  }
}
