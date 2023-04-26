import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { DashboardService } from '../../dashboard.service';
import { StateDashboardService } from '../../state-dashboard.service';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { take } from 'rxjs';

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
    private popoverService: PopoverService
  ) {}
  
  ngOnInit(): void {

  }

  onEdit() {
    
  }

  onDelete() {
    this.popoverService.openSnackBarAction("Delte", "Are you sure?", "Cancel", "Ok");
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
