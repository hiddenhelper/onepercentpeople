import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
// import { Country } from '@interfaces/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/countries').pipe(
      tap((response: any) => {

      })
    );
  }
}
