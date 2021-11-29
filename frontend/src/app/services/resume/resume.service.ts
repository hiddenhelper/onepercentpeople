import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Resume } from '@app/interfaces/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/user/resumes', params).pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/user/resumes/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  create(file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resumeFile', file, file.name);

    return this.apiService.postForm<any>('/user/resumes', formData).pipe(
      tap((response: any) => {

      })
    );
  }

  update(resume: Resume): Observable<any> {
    return this.apiService.put<any>(`/user/resumes/${resume.id}`, { resume: resume }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/user/resumes/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }
}
