import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  setOptions,
  MbscEventcalendarView,
  MbscCalendarEvent,
  MbscResource,
  formatDate,
} from '@mobiscroll/angular';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Tooltip } from 'src/app/shared/models/tooltip.model';
import { SnackbarTooltip } from 'src/app/shared/models/snackbarTooltip.model';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipService } from './tooltip/tooltip.service';

setOptions({
  theme: 'windows',
  themeVariant: 'light',
  clickToCreate: false,
  dragToCreate: false,
  dragToMove: false,
  dragToResize: false,
  eventDelete: true,
  showEventTooltip: false,
});

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleComponent implements OnInit {
  formatDate = formatDate;
  snack: MatSnackBarRef<TooltipComponent>;

  invalid = [
    {
      recurring: {
        repeat: 'weekly',
        weekDays: 'SA,SU',
      },
    },
    {
      start: '12:00',
      end: '13:00',
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,TU,WE,TH,FR',
      },
    },
    {
      start: '17:00',
      end: '18:00',
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,TU,WE,TH,FR',
      },
    },
  ];

  view: MbscEventcalendarView = {
    schedule: {
      type: 'week',
      allDay: false,
      startDay: 1,
      endDay: 5,
      startTime: '08:00',
      endTime: '18:00',
    },
  };

  myEvents: MbscCalendarEvent[] = [];

  myResources: MbscResource[] = [
    {
      id: 1,
      name: 'ws 1',
      color: 'var(--tertiary-container)',
    },
    {
      id: 2,
      name: 'ws 2',
      color: 'var(--tertiary-container)',
    },
    {
      id: 3,
      name: 'ws 3',
      color: 'var(--tertiary-container)',
    },
  ];

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private popoverService: PopoverService,
    private tooltipService: TooltipService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule() {
    this.dashboardService
      .getSchedule()
      .subscribe((res) => (this.myEvents = res.data));
  }

  onEventDoubleClick(event: any) {
    let id = event.event.id;
    this.popoverService.openSnackBarAction(
      this.translate.instant('actionPopover.editTitle'),
      this.translate.instant('actionPopover.editMessage'),
      this.translate.instant('actionPopover.cancel'),
      this.translate.instant('actionPopover.action')
    );

    this.popoverService.actionPopoverEmitter
      .pipe(take(1))
      .subscribe((okButtonPressed) => {
        if (okButtonPressed) {
          this.router.navigate([`edit-service/${id}`]);
        }
      });
  }

  onCellDoubleClick(event: any) {
    let isoFullDate: string = event.date.toISOString();
    let date = isoFullDate.slice(0, 10);
    let hour =
      new Date(isoFullDate)
        .toLocaleTimeString()
        .replace(/([\d])(:[\d]{2})(.*)/, '$1') +
      (new Date(isoFullDate).getHours() > 12 ? ' PM' : ' AM');
    let ws = event.resource;

    this.popoverService.openSnackBarAction(
      this.translate.instant('actionPopover.addTitle'),
      this.translate.instant('actionPopover.addMessage'),
      this.translate.instant('actionPopover.cancel'),
      this.translate.instant('actionPopover.action')
    );

    this.popoverService.actionPopoverEmitter
      .pipe(take(1))
      .subscribe((okButtonPressed) => {
        if (okButtonPressed) {
          this.router.navigate([`add-service/${date}/${hour}/${ws}`]);
        }
      });
  }

  hoverIn(event: any) {
    let currentReservation: Tooltip = event.event.reservation;
    let date = currentReservation.date.slice(0, 10);
    let hour =
      new Date(currentReservation.date)
        .toLocaleTimeString()
        .replace(/([\d])(:[\d]{2})(.*)/, '$1') +
      (new Date(event.event.reservation.date).getHours() > 12 ? ' PM' : ' AM');

    let tooltip: SnackbarTooltip = new SnackbarTooltip(
      currentReservation.firstName,
      currentReservation.lastName,
      currentReservation.plateNumber,
      currentReservation.carMake,
      currentReservation.carModel,
      currentReservation.description.replaceAll('; ',';\n-    '),
      date,
      hour,
      currentReservation.workStation,
      currentReservation.estimate
    );
    this.snack = this.tooltipService.openSnackBarTooltip(tooltip);
    console.log(event.event.reservation);
  }

  hoverOut() {
    setTimeout(() => {
      this.snack.dismiss();
    }, 500);
  }
}
