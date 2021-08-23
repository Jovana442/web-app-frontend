import { RacunService } from './../../services/racun.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              public racunService: RacunService

  ) { }

  public add(): void {
    this.racunService.addRacun(this.data);
    this.snackBar.open('Uspešno dodat račun ' + this.data.id, 'U redu', {duration: 3000});
  }

  public update(): void {
    this.racunService.updateRacun(this.data);
    this.snackBar.open('Uspešno modifikovan račun ' + this.data.id, 'U redu', {duration: 3000});
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id);
    this.snackBar.open('Uspešno obrisan račun ' + this.data.id, 'U redu', {duration: 3000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  ngOnInit(): void {
  }

}
