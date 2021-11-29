import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { TalentProfile } from '@app/interfaces/talent_profile';

@Injectable({
  providedIn: 'root'
})
export class TalentProfileService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/user/talent-profiles', params).pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/user/talent-profiles/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  create(talent_profile: TalentProfile): Observable<any> {
    return this.apiService.post<any>('/user/talent-profiles', { talent_profile: talent_profile }).pipe(
      tap((response: any) => {

      })
    );
  }

  update(talent_profile: TalentProfile): Observable<any> {
    return this.apiService.put<any>(`/user/talent-profiles/${talent_profile.id}`, { talent_profile: talent_profile }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/user/talent-profiles/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

}
