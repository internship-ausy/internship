import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentDate!: string;

  constructor(public datePipe: DatePipe) {

  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'dd MMM yyyy')!;
  }
}

