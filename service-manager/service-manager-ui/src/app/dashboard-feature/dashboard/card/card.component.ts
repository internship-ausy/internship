import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { DashboardService } from '../../dashboard.service';
import { StateDashboardService } from '../../state-dashboard.service';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() reservation: Reservation;

  constructor(
    private dashboardService: DashboardService,
    private stateDashboardService: StateDashboardService,
    private popoverService: PopoverService,
    private router: Router,
    private translate: TranslateService
  ) {}
  
  ngOnInit(): void {

  }

  onEdit() {
    this.router.navigate([`edit-service/${this.reservation.id}`]);
  }

  onDelete() {
    this.popoverService.openSnackBarAction(
      this.translate.instant("actionPopover.deleteTitle"),
      this.translate.instant("actionPopover.deleteMessage"),
      this.translate.instant("actionPopover.deleteCancel"),
      this.translate.instant("actionPopover.deleteAction")
    );
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
