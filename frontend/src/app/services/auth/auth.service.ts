import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hasPlaidToken = false;

  constructor(
    public apiService: ApiService,
    public router: Router,
  ) { }

  login(email: string, password: string): Observable<any> {

    return this.apiService.post<any>('/auth/login', { email, password }).pipe(
      tap((response: any) => {
        if (response.code == 'auth/success') {
          this.setUser(response.user);
          this.router.navigateByUrl('/dashboard');
        } else {
          // alert('Error');
        }
      })
    );
  }

  employerRegister(first_name: string, last_name: string, email: string, password: string, phone: string): Observable<any> {
    return this.apiService.post<any>('/auth/employer/register', { first_name, last_name, email, password, phone }).pipe(
      tap((response: any) => {
        if (response.code == 'auth/success') {
          this.setUser(response.user);
          this.router.navigateByUrl('/employer/start?register=complete');
        } else {
        }
      })
    );
  }

  talentRegister(first_name: string, last_name: string, email: string, password: string, country_id: number, city: string): Observable<any> {
    return this.apiService.post<any>('/auth/talent/register', { first_name, last_name, email, password, country_id, city }).pipe(
      tap((response: any) => {
        if (response.code == 'auth/success') {
          this.setUser(response.user);
          this.router.navigateByUrl('/talent/start?register=complete');
        } else {
        }
      })
    );
  }

  forgotPassword(email: string) {
    return this.apiService.post<any>('/auth/password-reset', { email }).pipe(
      tap((response: any) => {

      })
    );
  }

  setUser(user: User): void {
    localStorage.setItem('opp_user', btoa(JSON.stringify(user)));
  }

  getUser(): User | null {
    const userData = localStorage.getItem('opp_user');
    if (!userData)
      return null;

    return JSON.parse(atob(userData));
  }

  isAuthenticated(): boolean {
    const user = this.getUser();

    return user && Number.isInteger(user.id) ? true : false;
  }

  isTalent(): boolean {
    const user = this.getUser();
    if (!user || !this.isAuthenticated()) return false;

    return user.account_type === 1;
  }

  isEmployer(): boolean {
    const user = this.getUser();
    if (!user || !this.isAuthenticated()) return false;

    return user.account_type === 2;
  }

  logout() {
    localStorage.removeItem('opp_user');
  }

  setHasPlaidToken(status: boolean) {
    this.hasPlaidToken = status;
  }
}
