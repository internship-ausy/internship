import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryLog } from 'src/app/shared/models/historyLog.model';
import { DashboardService } from '../../dashboard.service';
import { PopoverService } from 'src/app/shared/core/services/popover.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent {
  displayedColumns: string[] = ['name', 'plateNumber', 'date', 'workstation', 'description', 'buttons'];
  dataSource: MatTableDataSource<HistoryLog>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dashboardService: DashboardService,
    private popoverService: PopoverService
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let upcomingReservations: HistoryLog[];

      this.dashboardService.getUpcomingReservations()
        .subscribe((reservations) => {
          upcomingReservations = reservations.data;
          this.dataSource = new MatTableDataSource(upcomingReservations);
          this.dataSource.paginator = this.paginator;
        });

    });
  }

  ngAfterViewChecked(): void {
    const paginatorLabel = document.getElementsByClassName('mat-mdc-paginator-range-label')[0];
    let numberOfPages = this.paginator.getNumberOfPages().toString();
    let currentPage = (this.paginator.pageIndex + 1).toString();
    paginatorLabel.innerHTML = currentPage + ' of ' + numberOfPages;

}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onViewUpcomingReservation(reservation: any) {
    this.popoverService.openSnackBarView(reservation);
  }
}
