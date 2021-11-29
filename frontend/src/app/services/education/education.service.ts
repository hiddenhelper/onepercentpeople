import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Education } from '@interfaces/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/user/education', params).pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/user/education/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  create(education: Education): Observable<any> {
    return this.apiService.post<any>('/user/education', { education: education }).pipe(
      tap((response: any) => {

      })
    );
  }

  update(education: Education): Observable<any> {
    return this.apiService.put<any>(`/user/education/${education.id}`, { education: education }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/user/education/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }
}
