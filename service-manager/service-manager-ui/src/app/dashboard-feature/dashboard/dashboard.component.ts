import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { StateDashboardService } from '../state-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reservations: Reservation[];
  reservationsDisplayed: Reservation[];
  reservationsPerPage = 6;

  constructor(private stateDashboardService: StateDashboardService) {}

  ngOnInit(): void {
    this.displayReservations();
  }

  displayReservations() {
    this.stateDashboardService.reservations$.subscribe((reservations) => {
      this.reservations = reservations;
      this.reservations = this.reservations
        .filter((r) => {
          return new Date(r.date) > new Date(Date());
        })
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

      if (this.reservations.length > this.reservationsPerPage) {
        this.reservationsDisplayed = this.reservations.slice(0, 6);
      } else {
        this.reservationsDisplayed = this.reservations;
      }
    });
  }

  onSeeMore() {}
}
