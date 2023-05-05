import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  setOptions,
  MbscEventcalendarView,
  MbscCalendarEvent,
  MbscResource,
  formatDate,
} from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
