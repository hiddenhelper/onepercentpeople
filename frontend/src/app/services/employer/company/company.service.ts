import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Company } from '@interfaces/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/employer/companies').pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/employer/companies/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  create(company: Company): Observable<any> {
    return this.apiService.post<any>('/employer/companies', { company: company }).pipe(
      tap((response: any) => {

      })
    );
  }

  /**
   *
   * @param company_id
   * @param file Image file
   * @returns Observable
   */
  saveLogo(company_id: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('logoFile', file, file.name);

    return this.apiService.postForm<any>(`/employer/companies/${company_id}/logo`, formData).pipe(
      tap((response: any) => {

      })
    );
  }

  update(company: Company): Observable<any> {
    return this.apiService.put<any>(`/employer/companies/${company.id}`, { company: company }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/employer/companies/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

}
