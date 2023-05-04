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
  clickToCreate: true,
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
  constructor(private http: HttpClient) {}

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

  // milestones = [{
  //     date: '2023-05-01T00:00',
  //     name: 'Project review',
  //     color: '#f5da7b'
  // }, {
  //     date: '2023-05-02T00:00',
  //     name: 'Product shipping',
  //     color: '#acf3a3'
  // }, {
  //     date: '2023-05-04T00:00',
  //     name: 'Cycle finish',
  //     color: '#ff84a0'
  // }];

  myEvents: MbscCalendarEvent[] = [
    {
      start: '2023-05-01T08:00',
      end: '2023-05-01T09:00',
      title: 'service',
      resource: [1, 3],
      color: '#35bb5a',
    },
    {
      start: '2023-05-01T09:00',
      end: '2023-05-01T10:00',
      title: 'service',
      resource: [1, 3],
      color: '#35bb5a',
    },

    {
      start: '2023-05-02T08:00',
      end: '2023-05-02T14:00',
      title: 'service',
      resource: [1, 2, 3],
      color: '#35bb5a',
    },
    {
      start: '2023-05-03T08:00',
      end: '2023-05-03T17:00',
      title: 'service',
      resource: [1, 2, 3],
      color: '#35bb5a',
    },
    {
      start: '2023-05-04T08:00',
      end: '2023-05-04T17:00',
      title: 'service',
      resource: [1, 2, 3],
      color: '#35bb5a',
    },
    {
      start: '2023-05-05T08:00',
      end: '2023-05-05T17:00',
      title: 'service',
      resource: [1, 2, 3],
      color: '#35bb5a',
    },
  ];

  myResources: MbscResource[] = [
    {
      id: 1,
      name: 'ws 1',
      color: '#61943D',
    },
    {
      id: 2,
      name: 'ws 2',
      color: '#61943D',
    },
    {
      id: 3,
      name: 'ws 3',
      color: '#61943D',
    },
  ];

  formatDate = formatDate;

  ngOnInit(): void {
    this.http
      .jsonp<MbscCalendarEvent[]>(
        'https://trial.mobiscroll.com/resource-events/',
        'callback'
      )
      .subscribe((resp) => {
        //this.myEvents = resp;
      });
  }

  // getTask(date: any): any {
  //     return this.milestones.find((obj) => +new Date(obj.date) === +date) || {};
  // }
}
