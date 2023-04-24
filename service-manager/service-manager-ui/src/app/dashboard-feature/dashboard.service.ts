import { Injectable } from "@angular/core";
import { Service } from "../shared/models/service.model";
import { HttpClient } from "@angular/common/http";

export interface ServiceResponseData {
  data: number;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  addService(service: Service) {
    return this.http.post<ServiceResponseData>("https://localhost:7252/Reservation/AddReservation", service);
  }
}
