import { ProizvodService } from './../../services/proizvod.service';
import { RacunService } from './../../services/racun.service';
import { StavkaRacunaService } from './../../services/stavka-racuna.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { Proizvod } from 'src/app/models/proizvod.model';
import { Racun } from 'src/app/models/racun.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StavkaRacuna } from 'src/app/models/stavka-racuna.model';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit {

  public flag: number;

  racuni: Racun[];
  proizvodi: Proizvod[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: StavkaRacuna,
              public stavkaRacunaService: StavkaRacunaService,
              public racunService: RacunService,
              public proizvodService: ProizvodService
              

  ) { }

  ngOnInit(): void {
    this.racunService.getAllRacun().subscribe(racuni =>
      this.racuni = racuni);
      this.proizvodService.getAllProizvod().subscribe(proizvodi =>
        this.proizvodi = proizvodi);
  }

  public add(): void {
    this.stavkaRacunaService.addStavkaRacuna(this.data);
    this.snackBar.open('Uspesno dodata stavka racuna broj ' + this.data.redniBroj, 'U redu', {duration: 3000});
  }

  public update(): void{
    this.stavkaRacunaService.updateStavkaRacuna(this.data);
    this.snackBar.open('Uspesno izmenjena stavka racuna broj ' + this.data.redniBroj, 'U redu', {duration: 3000});
  }

  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id);
    this.snackBar.open('Uspesno obrisana stavka racuna broj ' + this.data.redniBroj, 'U redu', {duration: 3000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareTo(a, b){
    return a.id === b.id;
  }

}
