import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import landingRoutes from './landing-routes';
import authRoutes from './auth-routes';
import employerRoutes from './employer-routes';
import talentRoutes from './talent-routes';
import redirectRoutes from './redirect-routes';
import errorRoutes from './error-routes';

const routes: Routes = [
  ...landingRoutes,
  ...authRoutes,
  ...employerRoutes,
  ...talentRoutes,
  ...redirectRoutes,
  ...errorRoutes,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
