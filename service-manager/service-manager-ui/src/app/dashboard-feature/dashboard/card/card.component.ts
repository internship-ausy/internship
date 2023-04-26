import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DashboardCard } from 'src/app/shared/models/dashboardCard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardContent: DashboardCard = new DashboardCard();
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {

  }

  onEdit() {
    this.router.navigate([`edit-service/${this.cardContent.reservationId}`]);
  }

  onDelete() {
    
  }
}
