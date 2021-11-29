import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Job } from '@interfaces/job';
import { JobResponse } from '@interfaces/job_response';


@Injectable({
  providedIn: 'root'
})
export class JobResponseService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  /**
   * Returns all job responses for all jobs posted by the employer.
   * @param params
   * @returns JobResponse[]
   */
  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/employer/jobs/responses').pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   * Returns all job responses for a single job posted by the employer.
   * @param params
   * @returns JobResponse[]
   */
  getAllForJob(job_id: number, params: object): Observable<any> {
    return this.apiService.get<any>(`/employer/jobs/${job_id}/responses`).pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   * Retrieves a single job response object by id.
   * @param id
   * @returns JobResponse
   */
  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/employer/jobs/responses/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   *
   *
   * @param jobResponse
   * @returns
   */
  markInterested(job_id: number, job_response_id: number): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job_id}/responses/${job_response_id}/interested`, {}).pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   *
   *
   * @param jobResponse
   * @returns
   */
  markRejected(job_id: number, job_response_id: number): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job_id}/responses/${job_response_id}/reject`, {}).pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   *
   *
   * @param jobResponse
   * @returns
   */
  hire(job_id: number, job_response_id: number): Observable<any> {
    return this.apiService.put<any>(`/employer/jobs/${job_id}/responses/${job_response_id}/hire`, {}).pipe(
      tap((response: any) => {

      })
    );
  }

}
