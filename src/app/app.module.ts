import { StavkaRacunaService } from './services/stavka-racuna.service';
import { RacunService } from './services/racun.service';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { VoziloComponent } from './vozilo/vozilo.component';
import { AutomobilComponent } from './vozilo/automobil/automobil.component';
import { ProizvodComponent } from './proizvod/proizvod.component';
import { ProizvodjacComponent } from './proizvodjac/proizvodjac.component';
import { RacunComponent } from './racun/racun.component';
import { StavkaRacunaComponent } from './stavka-racuna/stavka-racuna.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';
import { HttpClientModule } from '@angular/common/http';
import { ProizvodService } from './services/proizvod.service';
import { ProizvodjacService } from './services/proizvodjac.service';
import { RacunDialogComponent } from './dialog/racun-dialog/racun-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProizvodjacDialogComponent } from './dialog/proizvodjac-dialog/proizvodjac-dialog.component';
import { ProizvodDialogComponent } from './dialog/proizvod-dialog/proizvod-dialog.component';
import { StavkaRacunaDialogComponent } from './dialog/stavka-racuna-dialog/stavka-racuna-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

const Routes = [{ path: 'proizvod', component: ProizvodComponent },
                { path: 'proizvodjac', component: ProizvodjacComponent },
                { path: 'racun', component: RacunComponent },
                { path: 'stavkaRacuna', component: StavkaRacunaComponent },
                { path: 'home', component: HomeComponent },
                { path: 'author', component: AuthorComponent },
                { path: 'about', component: AboutComponent },
                { path: '', redirectTo: 'home', pathMatch: 'full' }];

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent,
    ProizvodComponent,
    ProizvodjacComponent,
    RacunComponent,
    StavkaRacunaComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    RacunDialogComponent,
    ProizvodjacDialogComponent,
    ProizvodDialogComponent,
    StavkaRacunaDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
  
    RouterModule.forRoot(Routes)


  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ProizvodService, ProizvodjacService, RacunService, StavkaRacunaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
