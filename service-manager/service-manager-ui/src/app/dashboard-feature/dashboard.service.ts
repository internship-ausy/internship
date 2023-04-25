import { Injectable } from "@angular/core";
import { Service } from "../shared/models/service.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

export interface ServiceResponseData {
  data: number;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private baseUrl: string = `${environment.apiUrl}/Reservation`;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userData')!})
  }

  addService(service: Service) {
    return this.http.post<ServiceResponseData>(
      `${this.baseUrl}/AddReservation`,
      service,
      { headers: this.headers }
      );
  }
}
