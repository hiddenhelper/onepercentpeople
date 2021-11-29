import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
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
   * Returns all job responses for user.
   * @param params
   * @returns JobResponse[]
   */
  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/jobs/responses').pipe(
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
    return this.apiService.get<any>(`/jobs/responses/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }
  /**
   * Returns a single job response object belonging to the user.
   * @param job_id
   * @returns JobResponse
   */
  getOneForJob(job_id: number): Observable<any> {
    return this.apiService.get<any>(`/jobs/${job_id}/responses`).pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   * Creates a new JobResponse object.
   * This is how a user applys to a job.
   * @param jobResponse
   * @returns
   */
  create(jobResponse: JobResponse): Observable<any> {
    return this.apiService.post<any>(`/jobs/${jobResponse.job_id}/responses`, { job_response: jobResponse }).pipe(
      tap((response: any) => {

      })
    );
  }

}
