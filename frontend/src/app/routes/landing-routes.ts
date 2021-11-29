import { Routes } from '@angular/router';
import { AboutComponent } from '@pages/landing/about/about.component';
import { ContactUsComponent } from '@pages/landing/contact-us/contact-us.component';
import { FaqComponent } from '@pages/landing/faq/faq.component';
import { HomeComponent } from '@pages/landing/home/home.component';
import { PrivacyPolicyComponent } from '@pages/landing/privacy-policy/privacy-policy.component';
import { TermsComponent } from '@pages/landing/terms/terms.component';
import { PricingComponent } from '@pages/landing/pricing/pricing.component';
import { CareersComponent } from '@pages/landing/careers/careers.component';

// Guards
import { RedirectAuthUserToDashboardService } from '@services/guards/redirect-auth-user-to-dashboard/redirect-auth-user-to-dashboard.service';

const landingRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RedirectAuthUserToDashboardService]
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
];

export default landingRoutes;
