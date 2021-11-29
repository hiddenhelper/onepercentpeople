import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
// import { Currency } from '@interfaces/currency';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/currencies').pipe(
      tap((response: any) => {

      })
    );
  }
}
