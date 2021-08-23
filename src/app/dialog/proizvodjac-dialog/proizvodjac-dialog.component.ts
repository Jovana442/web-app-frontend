import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {

  public flag: number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public proizvodjacService: ProizvodjacService
  ) { }

  

  public add(): void {
    this.proizvodjacService.addProizvodjac(this.data);
    this.snackBar.open('Uspešno dodat proizvođač ' + this.data.id, 'U redu', {duration:3000});
  }

  public update(): void {
    this.proizvodjacService.updateProizvodjac(this.data);
    this.snackBar.open('Uspešno izmenjen proizvođač ' + this.data.id, 'U redu', {duration: 3000});
  }

  public delete(): void {
    this.proizvodjacService.deleteProizvodjac(this.data.id);
    this.snackBar.open('Uspešno obrisan proizvođač ' + this.data.id, 'U redu', {duration:1000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 3000});
  }

  ngOnInit(): void {
  }



}
