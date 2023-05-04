import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Reservation } from "../shared/models/reservation.model";
import { DashboardService } from "./dashboard.service";
import { Service } from "../shared/models/service.model";

@Injectable({ providedIn: 'root' })
export class StateDashboardService {
    reservations$ = new BehaviorSubject<Reservation[]>([]);
    // @ts-ignore
    private shouldUpdateReservation$ = new BehaviorSubject<Reservation>(null);
    private deleteReservation$ = new Subject<number>();
    private updateReservation$ = new Subject<Reservation>();

    constructor(private dashboardService: DashboardService) {
        this.dashboardService.getDashboardCards()
            .subscribe(reservations => this.reservations$.next(reservations.data));

        this.deleteReservation$.subscribe((id: number) => {
            this.reservations$.next(this.reservations$.getValue()
                .filter(reseration => {
                    return reseration.id != id;
                }))
        });

        this.updateReservation$.subscribe((editedReservation) => {
            this.reservations$.next(this.reservations$.getValue().map(reservation => {
                return reservation.id === editedReservation.id ? editedReservation : reservation;
            }))
        });
    }

    deleteReservation(id: number) {
        this.deleteReservation$.next(id);
    }

    shouldUpdateReservation(editReservation: Reservation) {
        this.shouldUpdateReservation$.next(editReservation);
    }

    getUpdatedReservation(): Observable<Reservation> {
        return this.shouldUpdateReservation$;
    }

    updateReservation(payload: Service) {
        this.dashboardService.editService(payload)
            .subscribe(response => {
                this.updateReservation$.next(response.data);
            })
    }
}
