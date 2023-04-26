import { Component } from '@angular/core';
import { take } from 'rxjs';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  constructor(private router: Router) {}
  
  onEdit() {
    this.router.navigate([`edit-service/${7}`]);
  }

}
