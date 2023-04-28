import { Injectable } from '@angular/core';
import { Service } from '../shared/models/service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ServiceResponseData {
  data: any;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl: string = `${environment.apiUrl}/Reservation`;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('userData')!,
    });
  }

  addService(service: Service) {
    return this.http.post<ServiceResponseData>(
      `${this.baseUrl}/AddReservation`,
      service,
      { headers: this.headers }
    );
  }

  getDashboardCards() {
    return this.http.get<ServiceResponseData>(
      `${this.baseUrl}/GetDashboardCard`,
      { headers: this.headers }
    )
  }

  deleteService(id: number)
  {
    const url = `${this.baseUrl}/DeleteReservation?id=${id}`;
    return this.http.delete<ServiceResponseData>(
      url,
      { headers: this.headers }
    );
  }
}
