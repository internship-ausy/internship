import { Component, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/shared/models/dashboardCard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservations: DashboardCard[];

  ngOnInit(): void {

  }
}
