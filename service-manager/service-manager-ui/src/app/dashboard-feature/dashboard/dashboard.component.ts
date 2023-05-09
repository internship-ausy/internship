import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { StateDashboardService } from '../state-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  startIndex : number;
  reservations: Reservation[];
  reservationsDisplayed: Reservation[];
  reservationCount : number;
  reservationsPerPage = 6;
  nextReservations: Reservation[];

  constructor(private stateDashboardService: StateDashboardService) {}

  ngOnInit(): void {
    this.displayReservations();
    console.log(this.reservationsDisplayed.length)
  }

  displayReservations() {
    this.stateDashboardService.reservations$.subscribe((reservations) => {
      this.reservations = reservations;
      this.reservationCount = reservations.length;
      this.reservations = this.reservations
        .filter((r) => {
          return new Date(r.endDate) > new Date(Date());
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

  onSeeMore() {
    {
      this.startIndex = this.reservationsDisplayed.length;
      this.nextReservations = this.reservations.slice(this.startIndex, this.startIndex + 6);
      this.reservationsDisplayed = this.reservationsDisplayed.concat(this.nextReservations);
      console.log(this.reservations.length)
    }
  }
}
