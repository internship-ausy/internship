import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Reservation } from '../shared/models/reservation.model';
import { DashboardService } from './dashboard.service';

@Injectable({ providedIn: 'root' })
export class StateDashboardService {
  reservations$ = new BehaviorSubject<Reservation[]>([]);
  private deleteReservation$ = new Subject<number>();

  constructor(private dashboardService: DashboardService) {
    this.dashboardService
      .getService()
      .subscribe((reservations) => this.reservations$.next(reservations.data));

    this.deleteReservation$.subscribe((id: number) => {
      this.reservations$.next(
        this.reservations$.getValue().filter((reservation) => {
          return reservation.id != id;
        })
      );
    });
  }

  deleteReservation(id: number) {
    this.deleteReservation$.next(id);
  }
}
