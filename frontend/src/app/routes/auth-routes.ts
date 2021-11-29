import { Routes } from '@angular/router';
import { EmployerRegisterComponent } from '@pages/auth/employer-register/employer-register.component';
import { TalentRegisterComponent } from '@pages/auth/talent-register/talent-register.component';
import { LoginComponent } from '@pages/auth/login/login.component';
import { LogoutComponent } from '@pages/auth/logout/logout.component';
import { ForgotPasswordPageComponent } from '@pages/auth/forgot-password-page/forgot-password-page.component';

// Guards
import { NoAuthGuardService } from '@services/guards/no-auth-guard/no-auth-guard.service';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'get-started/talent',
    component: TalentRegisterComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'get-started/employer',
    component: EmployerRegisterComponent,
    canActivate: [NoAuthGuardService]
  },
];

export default authRoutes;
