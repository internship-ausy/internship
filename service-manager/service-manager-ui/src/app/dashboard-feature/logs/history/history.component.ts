import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../dashboard.service';
import { HistoryLog } from 'src/app/shared/models/historyLog.model';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarTooltip } from 'src/app/shared/models/snackbarTooltip.model';
import { Tooltip } from 'src/app/shared/models/tooltip.model';
import { TooltipService } from '../../schedule/tooltip/tooltip.service';
import { TooltipComponent } from '../../schedule/tooltip/tooltip.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements AfterViewInit, AfterViewChecked, OnInit {
  displayedColumns: string[] = ['name', 'plateNumber', 'date', 'workstation', 'description', 'buttons'];
  dataSource: MatTableDataSource<HistoryLog>;
  viewDetails: MatSnackBarRef<TooltipComponent>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private dashboardService: DashboardService,
    private tooltipService: TooltipService
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let historyReservations: HistoryLog[];

      this.dashboardService.getHistoryReservations()
        .subscribe((reservations) => {
          historyReservations = reservations.data;
          this.dataSource = new MatTableDataSource(historyReservations);
          this.dataSource.paginator = this.paginator;
          console.log(reservations);

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


  onViewReservation() {
    // let currentReservation: Tooltip = event.event.reservation;
    // let date = currentReservation.date.slice(0, 10);
    // let hour =
    //   new Date(currentReservation.date)
    //   .toLocaleTimeString()
    //   .replace(/([\d])(:[\d]{2})(.*)/, '$1') +
    // (new Date(event.event.reservation.date).getHours() > 12 ? ' PM' : ' AM');
    // let tooltip: SnackbarTooltip = new SnackbarTooltip(
    //   currentReservation.firstName,
    //   currentReservation.lastName,
    //   currentReservation.plateNumber,
    //   currentReservation.carMake,
    //   currentReservation.carModel,
    //   currentReservation.description.replaceAll('; ',';\n-    '),
    //   date,
    //   hour,
    //   currentReservation.workStation,
    //   currentReservation.estimate
    // );
    // this.viewDetails = this.tooltipService.openSnackBarTooltip(tooltip);
    // this.tooltipService.openSnackBarView(tooltip);
  }

}
