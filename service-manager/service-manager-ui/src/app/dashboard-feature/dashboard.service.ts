import { Injectable } from '@angular/core';
import { Service } from '../shared/models/service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EditService } from "src/app/shared/models/editService.model";

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

  editService(service: Service) {
    return this.http.put<ServiceResponseData>(
      `${this.baseUrl}/EditReservation`,
      service,

    );
  }

  getReservation(serviceId: number) {
  return this.http.get<ServiceResponseData>(
    `${this.baseUrl}/GetReservationByID?reservationID=${serviceId}`,
    { headers: this.headers }
  );
  }

  getSchedule() {
    return this.http.get<ServiceResponseData>(
      `${this.baseUrl}/GetSchedule`,
      { headers: this.headers }
    )
  }

  getHistoryReservations() {
    return this.http.get<ServiceResponseData>(
      `${this.baseUrl}/GetHistoryReservations`,
      { headers: this.headers }
    )
  }
}
