import { Component, Input, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/shared/models/dashboardCard.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardContent: DashboardCard = new DashboardCard();
  
  ngOnInit(): void {

  }

  onEdit() {
    
  }

  onDelete() {
    
  }
}
