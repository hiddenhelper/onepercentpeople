import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { WorkHistory } from '@interfaces/work_history';

@Injectable({
  providedIn: 'root'
})
export class WorkHistoryService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/user/work-history', params).pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/user/work-history/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  create(work_history: WorkHistory): Observable<any> {
    return this.apiService.post<any>('/user/work-history', { work_history: work_history }).pipe(
      tap((response: any) => {

      })
    );
  }

  update(work_history: WorkHistory): Observable<any> {
    return this.apiService.put<any>(`/user/work-history/${work_history.id}`, { work_history: work_history }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/user/work-history/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }
}
