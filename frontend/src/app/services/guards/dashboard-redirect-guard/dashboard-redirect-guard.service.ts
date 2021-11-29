import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardRedirectGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.authService.isTalent()) {
      this._router.navigate(['talent']);
    } else if (this.authService.isEmployer()) {
      this._router.navigate(['employer']);
    } else {
      this._router.navigate(['login']);
    }

    return false;
  }

}
