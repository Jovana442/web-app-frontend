import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { StavkaRacuna } from '../models/stavka-racuna.model';

@Injectable()
export class StavkaRacunaService {
    racuni: StavkaRacuna[];
    //private readonly API_URL = 'http://localhost:8083/stavkaRacuna/';

    //private readonly API_URL_P = 'http://localhost:8083/stavkeRacuna/';

    private readonly API_URL = 'https://rpp-backend-im40.herokuapp.com/stavkaRacuna/';
    private readonly API_URL_P = 'https://rpp-backend-im40.herokuapp.com/stavkeRacuna/';
    dataChange: BehaviorSubject<StavkaRacuna[]> = new BehaviorSubject<StavkaRacuna[]>([]);

    constructor(private httpClient: HttpClient){

    }

    public getAllStavkaRacuna(): Observable<StavkaRacuna[]>{
        this.httpClient.get<StavkaRacuna[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.racuni=data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });

        return this.dataChange.asObservable();
    }

    public getStavkeRacuna(idRacuna: number): Observable<StavkaRacuna[]> {
        this.httpClient.get<StavkaRacuna[]>(this.API_URL_P + idRacuna).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });

        return this.dataChange.asObservable();
    }

    public addStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.post(this.API_URL, stavkaRacuna).subscribe();
    }

    public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.put(this.API_URL + stavkaRacuna.id, stavkaRacuna).subscribe();
    }

    public deleteStavkaRacuna(id: number):void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }

}

