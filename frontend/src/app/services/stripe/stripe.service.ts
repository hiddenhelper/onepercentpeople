import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getStripeConnectLinks(accountId: string): Observable<any> {
    return this.apiService.post<any>('/stripe/connect/employer', { accountId: accountId }).pipe(
      tap(response => {
        // if (response.code == 'auth/success') {
        // this.setToken(response.JWT);
        // this.router.navigateByUrl('/employer-dashboard');
        // } else {
        // alert('Error');
        // }
      })
    );
  }
}
