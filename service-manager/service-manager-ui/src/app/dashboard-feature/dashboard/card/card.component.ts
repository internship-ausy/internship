import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { StateDashboardService } from '../../state-dashboard.service';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() reservation: Reservation;

  constructor(
    private dashboardService: DashboardService,
    private popoverService: PopoverService,
    private stateDashboardService: StateDashboardService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  onEdit() {
    this.router.navigate([`edit-service/${this.cardContent.reservationId}`]);

  }

  onDelete() {
    this.popoverService.openSnackBarAction(this.translate.instant('dashboard.deleteActionTitle'), this.translate.instant('dashboard.deleteActionDescription'), this.translate.instant('dashboard.deleteCancelButton'), "Ok");
    this.popoverService.actionPopoverEmitter.pipe(take(1))
      .subscribe(okButtonPressed => {
        if (okButtonPressed) {
          this.dashboardService.deleteService(this.reservation.id).subscribe(() => {
            this.stateDashboardService.deleteReservation(this.reservation.id);
          });
        }
      })
  }
}
