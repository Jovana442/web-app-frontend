import { HttpClient } from '@angular/common/http';
import { RacunDialogComponent } from './../dialog/racun-dialog/racun-dialog.component';
import { RacunService } from './../services/racun.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Racun } from '../models/racun.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
      displayedColumns = ['id', 'datum', 'nacinPlacanja', 'actions'];
      //dataSource: Observable<Racun[]>;
      
      dataSource: MatTableDataSource<Racun>;

      @ViewChild(MatPaginator)
      paginator: MatPaginator;
      @ViewChild(MatSort)
      sort: MatSort;

      currentDate = new Date();

      selektovanRacun: Racun;


  constructor(public httpClient: HttpClient,
    public racunService: RacunService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.racunService.getAllRacun();
    this.racunService.getAllRacun().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  public openDialog(flag: number, id: number, datum: Date, nacinPlacanja: string) {
    const dialogRef = this.dialog.open(RacunDialogComponent, { data: {id: id, datum: new Date(datum), nacinPlacanja: nacinPlacanja } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }
    });
  }

  public selectRow(row){
    this.selektovanRacun = row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
