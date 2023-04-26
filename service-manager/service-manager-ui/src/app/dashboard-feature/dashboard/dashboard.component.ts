import { Component, Input, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/shared/models/dashboardCard.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservations: DashboardCard[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.dashboardService.getService().subscribe(res => this.reservations = res.data);
  }
}
