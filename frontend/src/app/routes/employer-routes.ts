import { Routes } from '@angular/router';
import { EmployerDashboardComponent } from '@pages/employer/employer-dashboard/employer-dashboard.component';
import { EmployerNewJobPageComponent } from '@pages/employer/employer-new-job-page/employer-new-job-page.component';
import { EmployerEditJobPageComponent } from '@pages/employer/employer-edit-job-page/employer-edit-job-page.component';
import { EmployerViewJobsComponent } from '@pages/employer/employer-view-jobs/employer-view-jobs.component';
import { EmployerViewJobPageComponent } from '@pages/employer/employer-view-job-page/employer-view-job-page.component';
import { PlaidComponent } from '@pages/plaid/plaid.component';
import { EmployerEmployeesPageComponent } from '@pages/employer/employer-employees-page/employer-employees-page.component';
import { EmployerEmployeePageComponent } from '@pages/employer/employer-employee-page/employer-employee-page.component';
import { EmployerApplicantsPageComponent } from '@pages/employer/employer-applicants-page/employer-applicants-page.component';
import { EmployerApplicantPageComponent } from '@pages/employer/employer-applicant-page/employer-applicant-page.component';
import { EmployerJobApplicantsPageComponent } from '@pages/employer/employer-job-applicants-page/employer-job-applicants-page.component';
import { EmployerSettingsPageComponent } from '@pages/employer/employer-settings-page/employer-settings-page.component';
import { EmployerMessagesPageComponent } from '@pages/employer/employer-messages-page/employer-messages-page.component';
import { EmployerOnboardingPageComponent } from '@pages/employer/employer-onboarding-page/employer-onboarding-page.component';

// Guards
import { EmployerGuardService } from '@services/guards/employer-guard/employer-guard.service';
import { FinishOnboardingGuardService } from '@services/guards/finish-onboarding-guard/finish-onboarding-guard.service';

const employerRoutes: Routes = [
  {
    path: 'employer',
    component: EmployerDashboardComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/jobs',
    component: EmployerViewJobsComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/jobs/create',
    component: EmployerNewJobPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/jobs/:id',
    component: EmployerViewJobPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/jobs/:id/edit',
    component: EmployerEditJobPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/jobs/:id/applicants',
    component: EmployerJobApplicantsPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/jobs/:id/applicants/:id',
    component: EmployerApplicantPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/applicants',
    component: EmployerApplicantsPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/applicants/:id',
    component: EmployerApplicantPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/employees',
    component: EmployerEmployeesPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/employees/:id',
    component: EmployerEmployeePageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/messages',
    component: EmployerMessagesPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/settings',
    component: EmployerSettingsPageComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/settings/banking',
    component: PlaidComponent,
    canActivate: [EmployerGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'employer/start',
    component: EmployerOnboardingPageComponent,
    canActivate: [EmployerGuardService]
  },


];

export default employerRoutes;
