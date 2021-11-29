import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Job } from '@interfaces/job';


@Injectable({
  providedIn: 'root'
})
export class EmployerJobService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/employer/jobs').pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/employer/jobs/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }
  /**
   * Store a new job instance.
   *
   * @param job: Job
   * @param options: {draft:boolean} optional
   * @returns
   */
  create(job: Job, options: object = {}): Observable<any> {
    return this.apiService.post<any>('/employer/jobs', { job: job, options: options }).pipe(
      tap(
        (response: any) => {
        },
        (error: any) => {
        })
    );
  }

  update(job: Job): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job.id}`, { job: job }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/employer/jobs/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  pause(job: Job): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job.id}/pause`, { job: job }).pipe(
      tap((response: any) => {

      })
    );
  }

  postJob(job: Job): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job.id}/post`, { job: job }).pipe(
      tap((response: any) => {

      })
    );
  }

  resume(job: Job): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job.id}/resume`, { job: job }).pipe(
      tap((response: any) => {

      })
    );
  }

}
