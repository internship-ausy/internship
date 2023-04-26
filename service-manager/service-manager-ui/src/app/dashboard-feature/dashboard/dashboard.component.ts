import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { DashboardService } from '../dashboard.service';
import { StateDashboardService } from '../state-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservations: Reservation[];

  constructor(private dashboardService: DashboardService, private stateDashboardService: StateDashboardService) {
    // dashboardService.getDashboardCards().subscribe({
    //   next: (res) => {
    //     this.reservations = res.data;
    //     console.log(this.reservations);
    //   }
    // })
  }

  ngOnInit(): void {
    this.displayAddReservations();
  }

  displayAddReservations() {
    this.stateDashboardService.reservations$
      .subscribe(reservations => this.reservations = reservations)
  }
}
