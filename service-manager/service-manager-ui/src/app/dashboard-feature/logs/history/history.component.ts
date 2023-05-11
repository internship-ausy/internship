import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StateDashboardService } from '../../state-dashboard.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements AfterViewInit, AfterViewChecked, OnInit {
  displayedColumns: string[] = ['name', 'plateNumber', 'date', 'workstation', 'description', 'buttons'];
  dataSource: MatTableDataSource<Reservation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private stateDashboardService: StateDashboardService
  ) {}
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let historyReservations: Reservation[];
      this.stateDashboardService.reservations$
        .subscribe((reservations: Reservation[]) => {
          historyReservations = reservations
            .filter(r => {
              return new Date(r.endDate) < new Date(Date());
            })
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
          this.dataSource = new MatTableDataSource(historyReservations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })

    })
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

