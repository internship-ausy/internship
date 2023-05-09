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

setOptions({
  theme: 'windows',
  themeVariant: 'light',
  clickToCreate: false,
  dragToCreate: false,
  dragToMove: false,
  dragToResize: false,
  eventDelete: true,
});

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleComponent implements OnInit {
  formatDate = formatDate;

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
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule() {
    this.dashboardService.getSchedule().subscribe(res => this.myEvents = res.data)
  }

  onEventDoubleClick(event: any) {
    let id = event.event.id;
    this.popoverService.openSnackBarAction(
      this.translate.instant("actionPopover.editTitle"),
      this.translate.instant("actionPopover.editMessage"),
      this.translate.instant("actionPopover.cancel"),
      this.translate.instant("actionPopover.action")
    )

    this.popoverService.actionPopoverEmitter.pipe(take(1))
      .subscribe(okButtonPressed => {
        if (okButtonPressed) {
          this.router.navigate([`edit-service/${id}`])
        }
      })
  }
}
