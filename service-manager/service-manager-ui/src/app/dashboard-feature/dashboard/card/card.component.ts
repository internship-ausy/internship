import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(private dashboardService: DashboardService) {}

  onDelete(id: number) {
    this.dashboardService.deleteService(id).subscribe();
  }
}
