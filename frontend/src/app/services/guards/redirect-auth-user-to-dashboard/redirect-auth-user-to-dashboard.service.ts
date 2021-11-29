import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthUserToDashboardService implements CanActivate {

  constructor(
    private _router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Let non-authenticated users view page.
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this._router.navigate(['dashboard']);

    return false;
  }

}
