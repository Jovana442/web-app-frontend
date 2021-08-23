import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/models/proizvod.model';
import { Proizvodjac } from 'src/app/models/proizvodjac.model';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {
  proizvodjaci: Proizvodjac[];

  public flag: number;
  
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProizvodDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Proizvod,
              public proizvodService: ProizvodService,
              public proizvodjacService: ProizvodjacService) {

               }

  public add(): void{
    this.proizvodService.addProizvod(this.data);
    this.snackBar.open('Uspešno dodat proizvod: ' + this.data.id, 'U redu', {duration:3000});
  }

  public update(): void{
    this.proizvodService.updateProizvod(this.data);
    this.snackBar.open('Uspešno izmenjen proizvod: ' + this.data.id, 'U redu', {duration: 3000});
  }

  public delete(): void{
    this.proizvodService.deleteProizvod(this.data.id);
    this.snackBar.open('Uspešno obrisan proizvod: ' + this.data.id, 'U redu', {duration: 3000});
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration:2000});
  }

  ngOnInit(): void {
    this.proizvodjacService.getAllProizvodjac().subscribe(proizvodjaci =>
      this.proizvodjaci = proizvodjaci);
  }

  compareTo(a, b){
    return a.id === b.id;
  }

}
