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
  theme: 'none',
  themeVariant: 'none',
  clickToCreate: false,
  dragToCreate: true,
  dragToMove: true,
  dragToResize: true,
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
      title: 'Lunch break',
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
      endTime: '17:00',
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
      start: '2023-05-03T08:00',
      end: '2023-05-03T17:00',
      title: 'service',
      resource: 1,
      color: '#35bb5a',
    },
    {
      start: '2023-05-03T11:00',
      end: '2023-05-03T14:00',
      title: 'break',
      resource: 1,
      color: '#913aa7',
    },
    {
      start: '2023-04-30T10:00',
      end: '2023-04-30T15:00',
      title: 'Impact Training',
      resource: [2, 3],
      color: '#35bb5a',
    },
    {
      start: '2023-05-01T10:00',
      end: '2023-05-01T15:00',
      title: 'Impact Training',
      resource: [2, 3],
      color: '#35bb5a',
    },
    {
      start: '2023-05-03T08:30',
      end: '2023-05-03T10:00',
      title: 'Quick mtg. with Martin',
      resource: 3,
      color: '#913aa7',
    },
    // {
    //   start: '2023-05-03T12:00',
    //   end: '2023-05-03T13:00',
    //   title: 'General orientation',
    //   resource: [1, 2, 3],
    //   color: '#a71111',
    // },
    {
      start: '2023-05-04T10:00',
      end: '2023-05-04T11:00',
      title: 'Product team mtg.',
      resource: [2, 3],
      color: '#6e7f29',
    },
    {
      start: '2023-05-05T14:00',
      end: '2023-05-05T16:00',
      title: 'Stakeholder mtg.',
      resource: 1,
      color: '#dcd234',
    },
    {
      start: '2023-05-06T10:00',
      end: '2023-05-06T14:00',
      title: 'Innovation mtg.',
      resource: [1, 2],
      color: '#de3d83',
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
      name: 'ws 3',
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
