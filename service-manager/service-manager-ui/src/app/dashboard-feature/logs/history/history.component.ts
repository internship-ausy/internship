import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../dashboard.service';
import { HistoryLog } from 'src/app/shared/models/historyLog.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements AfterViewInit, AfterViewChecked, OnInit {
  displayedColumns: string[] = ['name', 'plateNumber', 'date', 'workstation', 'description', 'buttons'];
  dataSource: MatTableDataSource<HistoryLog>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dashboardService: DashboardService
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

}