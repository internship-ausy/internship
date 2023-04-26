import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardCard } from 'src/app/shared/models/dashboardCard.model';
import { DashboardService } from '../../dashboard.service';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {


  @Input() reservation: DashboardCard;

  constructor(private dashboardService: DashboardService, private popoverService: PopoverService) {}


  ngOnInit(): void {

  }

  onEdit() {

  }

  onDelete() {
    // this.popoverService.openSnackBarAction('text', 'text', 'Cancel', 'Ok')
    this.dashboardService.deleteService(this.reservation.id).subscribe(res => {
      res.data;
    });
  }


}
