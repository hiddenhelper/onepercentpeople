import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinishOnboardingGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser();

    if (user?.finished_onboarding_at === undefined || user?.finished_onboarding_at === null) {
      if (this.authService.isTalent()) {
        this._router.navigate(['talent/start']);
      } else if (this.authService.isEmployer()) {
        this._router.navigate(['employer/start']);
      }

      return false;
    }

    return true;
  }

}
