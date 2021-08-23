import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RacunDialogComponent } from '../dialog/racun-dialog/racun-dialog.component';
import { StavkaRacunaDialogComponent } from '../dialog/stavka-racuna-dialog/stavka-racuna-dialog.component';
import { Proizvod } from '../models/proizvod.model';
import { Racun } from '../models/racun.model';
import { StavkaRacuna } from '../models/stavka-racuna.model';
import { StavkaRacunaService } from '../services/stavka-racuna.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit {

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'racun', 'proizvod', 'actions'];

  //dataSource: Observable<StavkaRacuna[]>;
  dataSource: MatTableDataSource<StavkaRacuna>;

  @Input()
  selektovanRacun: Racun;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public httpClient: HttpClient,
    public stavkaRacunaService: StavkaRacunaService,
              public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChange() {
    if(this.selektovanRacun.id){
      this.loadData();
    }
  
  }
  

  public loadData(){
    //this.dataSource = this.stavkaRacunaService.getAllStavkaRacuna();
    this.stavkaRacunaService.getStavkeRacuna(this.selektovanRacun.id).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'redniBroj': return data[property];
          case 'kolicina': return data[property];
          case 'cena': return data[property];
          case 'racun': return data[property];
          case 'proizvod': return data[property].naziv.toLocaleLowerCase();
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  

  public openDialog(flag: number, id: number, redniBroj: number, kolicina: number, jedinicaMere: number, cena: number,
    racun: Racun, proizvod: Proizvod){
      const dialogRef = this.dialog.open(StavkaRacunaDialogComponent, { data: { id: id, redniBroj: redniBroj, kolicina: kolicina, 
        jedinicaMere: jedinicaMere, cena: cena, racun: this.selektovanRacun, proizvod: proizvod } });
        dialogRef.componentInstance.flag = flag;
        dialogRef.afterClosed().subscribe(result => {
          if(result === 1) {
            this.loadData();
          }
        })
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }

}
