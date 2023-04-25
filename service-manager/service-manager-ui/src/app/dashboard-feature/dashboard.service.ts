import { Injectable } from "@angular/core";
import { Service } from "../shared/models/service.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export interface ServiceResponseData {
  data: number;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userData')!})
  }

  addService(service: Service) {
    return this.http.post<ServiceResponseData>(
      "https://localhost:7252/Reservation/AddReservation", 
      service,
      { headers: this.headers }
      );
  }
}
