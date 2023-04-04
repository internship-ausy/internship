
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private http: HttpClient) { }


  get401() {
    return this.http.get('http://httpstat.us/401');
  }
}
