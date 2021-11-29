import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.authService.isAuthenticated()) {
      this.toastr.error("Please logout and then try again.", "Not allowed");
      return false;
    }

    return true;
  }

}
