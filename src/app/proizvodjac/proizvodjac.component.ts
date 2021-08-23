import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProizvodjacDialogComponent } from '../dialog/proizvodjac-dialog/proizvodjac-dialog.component';
import { Proizvodjac } from '../models/proizvodjac.model';
import { ProizvodjacService } from '../services/proizvodjac.service';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];

  //dataSource: Observable<Proizvodjac[]>;
  dataSource: MatTableDataSource<Proizvodjac>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  
  constructor(public httpClient: HttpClient,
    public proizvodjacService: ProizvodjacService,
    public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, adresa: string, kontakt: string, naziv: string ) {
    const dialogRef = this.dialog.open(ProizvodjacDialogComponent, { data: { id: id, adresa: adresa, kontakt: kontakt, naziv: naziv } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    //this.dataSource = this.proizvodjacService.getAllProizvodjac();
    this.proizvodjacService.getAllProizvodjac().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



}
