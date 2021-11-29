import { Routes } from '@angular/router';
import { PageLoadingComponent } from '@components/page-loading/page-loading.component';
// Guards
import { AuthGuardService } from '@guards/auth-guard/auth-guard.service';
import { DashboardRedirectGuardService } from '@guards/dashboard-redirect-guard/dashboard-redirect-guard.service';

const redirectRoutes: Routes = [
  {
    path: 'dashboard',
    component: PageLoadingComponent,
    canActivate: [AuthGuardService, DashboardRedirectGuardService]
  },
];

export default redirectRoutes;
