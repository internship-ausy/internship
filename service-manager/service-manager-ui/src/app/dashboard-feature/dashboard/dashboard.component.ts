import { Component, OnInit } from '@angular/core';
import { StateDashboardService } from '../state-dashboard.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservations: Reservation[];

  constructor(private stateDashboardService: StateDashboardService) {}

  ngOnInit(): void {
    this.displayAddReservations();
  }

  displayAddReservations() {
    this.stateDashboardService.reservations$.subscribe(reservations => this.reservations = reservations);
  }
}
