import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '@app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    public router: Router
  ) { }

  get(params: object): Observable<any> {
    return this.apiService.get<any>('/user').pipe(
      tap((response: any) => {

      })
    );
  }

  update(user: User): Observable<any> {
    return this.apiService.put<any>('/user', { user: user }).pipe(
      tap((response: any) => {

      })
    );
  }

  markFinishedOnboarding(): Observable<any> {

    return this.apiService.put<any>('/user/finished-onboarding', {}).pipe(
      tap((response: any) => {
        if (response.user)
          this.authService.setUser(response.user);
      })
    );
  }

  /**
   *
   * @param file Image file
   * @returns Observable
   */
  saveProfilePhoto(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photoFile', file, file.name);

    return this.apiService.postForm<any>(`/user/profile-photo`, formData).pipe(
      tap((response: any) => {

      })
    );
  }

}
