import { Routes } from '@angular/router';
import { TalentDashboardComponent } from '@pages/talent/talent-dashboard/talent-dashboard.component';
import { FindJobsPageComponent } from '@pages/talent/find-jobs-page/find-jobs-page.component';
import { ViewJobPageComponent } from '@pages/talent/view-job-page/view-job-page.component';
// import { ApplyPageComponent } from '@pages/talent/apply-page/apply-page.component';
import { TalentProfilePageComponent } from '@pages/talent/talent-profile-page/talent-profile-page.component';
import { TalentMyJobsPageComponent } from '@pages/talent/talent-my-jobs-page/talent-my-jobs-page.component';
import { TalentMessagesPageComponent } from '@pages/talent/talent-messages-page/talent-messages-page.component';
import { TalentSettingsPageComponent } from '@pages/talent/talent-settings-page/talent-settings-page.component';
import { TalentEmploymentOverviewPageComponent } from '@pages/talent/talent-employment-overview-page/talent-employment-overview-page.component';
import { TalentOnboardingPageComponent } from '@pages/talent/talent-onboarding-page/talent-onboarding-page.component';

// Guards
import { TalentGuardService } from '@services/guards/talent-guard/talent-guard.service';
import { FinishOnboardingGuardService } from '@services/guards/finish-onboarding-guard/finish-onboarding-guard.service';

const talentRoutes: Routes = [
  {
    path: 'talent',
    component: TalentDashboardComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'jobs',
    component: FindJobsPageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'jobs/:id',
    component: ViewJobPageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  // {
  //   path: 'jobs/:id/apply',
  //   component: ApplyPageComponent,
  //   canActivate: [TalentGuardService, FinishOnboardingGuardService]
  // },
  {
    path: 'talent/my-jobs',
    component: TalentMyJobsPageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'talent/my-jobs/:id',
    component: TalentEmploymentOverviewPageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'talent/profile',
    component: TalentProfilePageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'talent/messages',
    component: TalentMessagesPageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'talent/settings',
    component: TalentSettingsPageComponent,
    canActivate: [TalentGuardService, FinishOnboardingGuardService]
  },
  {
    path: 'talent/start',
    component: TalentOnboardingPageComponent,
    canActivate: [TalentGuardService]
  },
];

export default talentRoutes;
