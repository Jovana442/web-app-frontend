import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ProizvodService } from './../services/proizvod.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Proizvod } from '../models/proizvod.model';
import { MatDialog } from '@angular/material/dialog';
import { Proizvodjac } from '../models/proizvodjac.model';
import { ProizvodDialogComponent } from '../dialog/proizvod-dialog/proizvod-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];

  //dataSource: Observable<Proizvod[]>;
  dataSource: MatTableDataSource<Proizvod>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public HttpClient: HttpClient,
              public proizvodService: ProizvodService, 
              public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, naziv: string, proizvodjac: Proizvodjac){
    const dialogRef = this.dialog.open(ProizvodDialogComponent, { data: { id: id, naziv: naziv, proizvodjac: proizvodjac } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.proizvodService.getAllProizvod();
    this.proizvodService.getAllProizvod().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'proizvodjac': return data[property].naziv.toLocaleLowerCase();
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
