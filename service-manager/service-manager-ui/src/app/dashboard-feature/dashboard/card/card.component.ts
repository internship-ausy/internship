import { Component, Input, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/shared/models/dashboardCard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() cardContent: DashboardCard = new DashboardCard();

  constructor(private dashboardService: DashboardService) {}


  ngOnInit(): void {

  }

  onEdit() {

  }

  onDelete(id: number) {
    this.dashboardService.deleteService(id).subscribe();
  }
}
