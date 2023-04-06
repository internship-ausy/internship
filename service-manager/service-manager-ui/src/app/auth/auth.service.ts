import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../shared/models/registerUser.model';

export interface AuthResponseData {
  data: number;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: RegisterUser) {
    return this.http.post<AuthResponseData>(
      'https://localhost:7252/Auth/Register',
      {
        FullName: user.fullName,
        Username: user.username,
        Email: user.email,
        Password: user.password
      }
    )
  }
}
