import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Racun } from "../models/racun.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RacunService{
    racuni: Racun[];
    //private readonly API_URL = 'http://localhost:8083/racun/';
    private readonly API_URL = 'https://rpp-backend-im40.herokuapp.com/racun/';

    dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);

    constructor(private httpClient: HttpClient){

    }

    public getAllRacun() : Observable<Racun[]>{
        this.httpClient.get<Racun[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.racuni = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
          return this.dataChange.asObservable();
    }

    public addRacun(racun: Racun): void {
        this.httpClient.post(this.API_URL, racun).subscribe();

    }

    public updateRacun(racun: Racun): void {
        this.httpClient.put(this.API_URL + racun.id, racun).subscribe();
    }

    public deleteRacun(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }

    

}