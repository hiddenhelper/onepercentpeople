import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
// import { Role } from '@interfaces/role';


@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/education-levels').pipe(
      tap((response: any) => {

      })
    );
  }
}

