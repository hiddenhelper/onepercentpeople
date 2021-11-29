import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from "src/environments/environment";

// Third Party
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';

// App
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { AddAPIHeadersInterceptor } from './interceptors/add-api-headers-interceptor';

// Layouts
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { LayoutDashboardComponent } from './layouts/layout-dashboard/layout-dashboard.component';
import { LayoutOnboardingComponent } from './layouts/layout-onboarding/layout-onboarding.component';

// Pages
import { LoginComponent } from '@pages/auth/login/login.component';
import { ForgotPasswordPageComponent } from '@pages/auth/forgot-password-page/forgot-password-page.component';
import { EmployerSignupComponent } from '@pages/employer-signup/employer-signup.component';
import { HomeComponent } from '@pages/landing/home/home.component';
import { TalentDashboardComponent } from '@pages/talent/talent-dashboard/talent-dashboard.component';
import { EmployerDashboardComponent } from '@pages/employer/employer-dashboard/employer-dashboard.component';
import { AboutComponent } from '@pages/landing/about/about.component';
import { TermsComponent } from '@pages/landing/terms/terms.component';
import { ContactUsComponent } from '@pages/landing/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '@pages/landing/privacy-policy/privacy-policy.component';
import { CareersComponent } from '@pages/landing/careers/careers.component';
import { FaqComponent } from '@pages/landing/faq/faq.component';
import { EmployerNewJobPageComponent } from '@pages/employer/employer-new-job-page/employer-new-job-page.component';
import { EmployerEditJobPageComponent } from '@pages/employer/employer-edit-job-page/employer-edit-job-page.component';
// import { PlaidComponent } from '@pages/plaid/plaid.component';
import { LogoutComponent } from '@pages/auth/logout/logout.component';
import { EmployerViewJobsComponent } from '@pages/employer/employer-view-jobs/employer-view-jobs.component';
import { PricingComponent } from '@pages/landing/pricing/pricing.component';
import { EmployerRegisterComponent } from '@pages/auth/employer-register/employer-register.component';
import { TalentRegisterComponent } from '@pages/auth/talent-register/talent-register.component';
import { EmployerViewJobPageComponent } from '@pages/employer/employer-view-job-page/employer-view-job-page.component';
import { ViewJobPageComponent } from '@pages/talent/view-job-page/view-job-page.component';
import { FindJobsPageComponent } from '@pages/talent/find-jobs-page/find-jobs-page.component';
import { ApplyPageComponent } from '@pages/talent/apply-page/apply-page.component';
import { EmployerEmployeesPageComponent } from '@pages/employer/employer-employees-page/employer-employees-page.component';
import { EmployerEmployeePageComponent } from '@pages/employer/employer-employee-page/employer-employee-page.component';
import { EmployerApplicantsPageComponent } from '@pages/employer/employer-applicants-page/employer-applicants-page.component';
import { EmployerApplicantPageComponent } from '@pages/employer/employer-applicant-page/employer-applicant-page.component';
import { EmployerJobApplicantsPageComponent } from '@pages/employer/employer-job-applicants-page/employer-job-applicants-page.component';
import { EmployerSettingsPageComponent } from '@pages/employer/employer-settings-page/employer-settings-page.component';
import { EmployerMessagesPageComponent } from '@pages/employer/employer-messages-page/employer-messages-page.component';
import { EmployerOnboardingPageComponent } from '@pages/employer/employer-onboarding-page/employer-onboarding-page.component';
import { TalentProfilePageComponent } from '@pages/talent/talent-profile-page/talent-profile-page.component';
import { TalentMyJobsPageComponent } from '@pages/talent/talent-my-jobs-page/talent-my-jobs-page.component';
import { TalentMessagesPageComponent } from '@pages/talent/talent-messages-page/talent-messages-page.component';
import { TalentSettingsPageComponent } from '@pages/talent/talent-settings-page/talent-settings-page.component';
import { TalentEmploymentOverviewPageComponent } from '@pages/talent/talent-employment-overview-page/talent-employment-overview-page.component';
import { TalentOnboardingPageComponent } from '@pages/talent/talent-onboarding-page/talent-onboarding-page.component';
import { PageNotFoundComponent } from '@pages/errors/page-not-found/page-not-found.component';

// Pipes
import { DateAgoPipe } from './pipes/date-ago.pipe';

// Components
import { TalentSignupComponent } from '@components/talent/talent-signup/talent-signup.component';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { EmployerSidebarComponent } from '@components/employer/employer-sidebar/employer-sidebar.component';
import { JobsComponent } from '@components/employer/jobs/jobs.component';
import { TalentSidebarComponent } from '@components/talent/talent-sidebar/talent-sidebar.component';
import { EmployerJobFormComponent } from '@app/components/employer/forms/employer-job-form/employer-job-form.component';
import { EmployerCreateJobStepperComponent } from '@components/employer/employer-create-job-stepper/employer-create-job-stepper.component';
import { StripeConnectComponent } from '@components/stripe/employer/stripe-connect/stripe-connect.component';
import { NavComponent } from '@components/navigation/nav/nav.component';
import { HeroComponent } from '@components/home/sections/hero/hero.component';
import { TalentMapComponent } from '@components/home/sections/talent-map/talent-map.component';
import { HiringStepsComponent } from '@components/home/sections/hiring-steps/hiring-steps.component';
import { ProductHighlightsComponent } from '@components/home/sections/product-highlights/product-highlights.component';
import { ViewTalentComponent } from '@components/home/sections/view-talent/view-talent.component';
import { RolesComponent } from '@components/home/sections/roles/roles.component';
import { TestimonialsComponent } from '@components/home/sections/testimonials/testimonials.component';
import { JoinBannerComponent } from '@components/banners/join-banner/join-banner.component';
import { TalentCardComponent } from '@components/home/items/talent-card/talent-card.component';
import { LoginFormComponent } from '@components/auth/login-form/login-form.component';
import { TalentRegisterFormComponent } from '@components/auth/talent-register-form/talent-register-form.component';
import { EmployerRegisterFormComponent } from '@components/auth/employer-register-form/employer-register-form.component';
import { AboutHeroComponent } from '@components/about/sections/about-hero/about-hero.component';
import { AboutOurPeopleComponent } from '@components/about/sections/about-our-people/about-our-people.component';
import { AboutMissionComponent } from '@components/about/sections/about-mission/about-mission.component';
import { DashboardNavComponent } from '@components/navigation/dashboard-nav/dashboard-nav.component';
import { EmployerJobListItemComponent } from '@components/employer/employer-job-list-item/employer-job-list-item.component';
import { JobDetailsComponent } from '@components/employer/job-details/job-details.component';
import { PageLoadingComponent } from '@components/page-loading/page-loading.component';
import { ViewJobsComponent } from '@components/talent/view-jobs/view-jobs.component';
import { JobListItemComponent } from '@components/talent/job-list-item/job-list-item.component';
import { ViewJobComponent } from '@components/talent/view-job/view-job.component';
import { ApplyToJobComponent } from '@components/talent/apply-to-job/apply-to-job.component';
import { EmployerJobResponsesComponent } from '@components/employer/employer-job-responses/employer-job-responses.component';
import { EmployerJobOverviewCardComponent } from '@components/employer/employer-job-overview-card/employer-job-overview-card.component';
import { EmployerJobResponseListItemComponent } from '@components/employer/employer-job-response-list-item/employer-job-response-list-item.component';
import { EmployerJobResponseComponent } from '@components/employer/employer-job-response/employer-job-response.component';
import { EmployerApplicantActionsCardComponent } from '@components/employer/employer-applicant-actions-card/employer-applicant-actions-card.component';
import { EmployerAllJobResponsesComponent } from '@components/employer/employer-all-job-responses/employer-all-job-responses.component';
import { EmployerAllJobResponsesFiltersComponent } from '@components/employer/employer-all-job-responses-filters/employer-all-job-responses-filters.component';
import { EmployerSettingsSidebarComponent } from '@components/employer/employer-settings-sidebar/employer-settings-sidebar.component';
import { EmployerSettingsProfileComponent } from '@components/employer/employer-settings-profile/employer-settings-profile.component';
import { EmployerSettingsBankingComponent } from '@components/employer/employer-settings-banking/employer-settings-banking.component';
import { TalentProfileSidebarComponent } from '@components/talent/talent-profile-sidebar/talent-profile-sidebar.component';
import { TalentProfileBasicComponent } from '@components/talent/talent-profile-basic/talent-profile-basic.component';
import { TalentProfileWorkExperienceComponent } from '@components/talent/talent-profile-work-experience/talent-profile-work-experience.component';
import { TalentProfileEducationComponent } from '@components/talent/talent-profile-education/talent-profile-education.component';
import { TalentProfileVideosComponent } from '@components/talent/talent-profile-videos/talent-profile-videos.component';
import { TalentSettingsSidebarComponent } from '@components/talent/talent-settings-sidebar/talent-settings-sidebar.component';
import { TalentSettingsBankingComponent } from '@components/talent/talent-settings-banking/talent-settings-banking.component';
import { TalentMyJobsComponent } from '@components/talent/talent-my-jobs/talent-my-jobs.component';
import { TalentMyJobsListItemComponent } from '@components/talent/talent-my-jobs-list-item/talent-my-jobs-list-item.component';
import { TalentEmploymentOverviewComponent } from '@components/talent/talent-employment-overview/talent-employment-overview.component';
import { ChatComponent } from '@components/chat/chat/chat.component';
import { ChatBoxComponent } from '@components/chat/chat-box/chat-box.component';
import { TalentWorkHistoryFormComponent } from '@components/talent/forms/talent-work-history-form/talent-work-history-form.component';
import { TalentEducationFormComponent } from '@components/talent/forms/talent-education-form/talent-education-form.component';
import { TalentProfileFormComponent } from '@components/talent/forms/talent-profile-form/talent-profile-form.component';
import { TalentOnboardingFlowComponent } from '@components/talent/onboarding/talent-onboarding-flow/talent-onboarding-flow.component';
import { TalentSalaryRangeFormComponent } from '@components/talent/forms/talent-salary-range-form/talent-salary-range-form.component';
import { TalentEnglishProficiencyFormComponent } from '@components/talent/forms/talent-english-proficiency-form/talent-english-proficiency-form.component';
import { TalentEmploymentTypePreferenceFormComponent } from '@components/talent/forms/talent-employment-type-preference-form/talent-employment-type-preference-form.component';
import { TalentPreferredRolesFormComponent } from '@components/talent/forms/talent-preferred-roles-form/talent-preferred-roles-form.component';
import { EmployerOnboardingFlowComponent } from '@components/employer/onboarding/employer-onboarding-flow/employer-onboarding-flow.component';
import { CompanyDetailsFormComponent } from '@components/employer/forms/company-details-form/company-details-form.component';
import { VideoPlayerComponent } from '@components/video/video-player/video-player.component';
import { VideoRecorderComponent } from '@components/video/video-recorder/video-recorder.component';
import { BtnSpinnerComponent } from '@components/general/btn-spinner/btn-spinner.component';
import { HeroIconComponent } from '@components/general/hero-icon/hero-icon.component';
import { DropdownComponent } from '@components/general/dropdown/dropdown.component';
import { TalentProfilePhotoFormComponent } from '@components/talent/forms/talent-profile-photo-form/talent-profile-photo-form.component';
import { TalentProfileComponent } from '@components/talent/talent-profile/talent-profile.component';
import { EmployerSettingsComponent } from '@components/employer/employer-settings/employer-settings.component';
import { TalentSettingsComponent } from '@components/talent/talent-settings/talent-settings.component';
import { ForgotPasswordFormComponent } from '@components/auth/forgot-password-form/forgot-password-form.component';
import { TalentResumeFormComponent } from '@components/talent/forms/talent-resume-form/talent-resume-form.component';
import { TalentResumesListComponent } from '@components/talent/talent-resumes-list/talent-resumes-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TalentSignupComponent,
    LoginComponent,
    EmployerSignupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TalentDashboardComponent,
    EmployerDashboardComponent,
    EmployerSidebarComponent,
    JobsComponent,
    TalentSidebarComponent,
    EmployerJobFormComponent,
    EmployerCreateJobStepperComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    ContactUsComponent,
    FaqComponent,
    EmployerNewJobPageComponent,
    // PlaidComponent,
    StripeConnectComponent,
    NavComponent,
    LayoutDefaultComponent,
    HeroComponent,
    TalentMapComponent,
    ProductHighlightsComponent,
    HiringStepsComponent,
    ViewTalentComponent,
    RolesComponent,
    TestimonialsComponent,
    JoinBannerComponent,
    PricingComponent,
    TalentCardComponent,
    LoginFormComponent,
    TalentRegisterFormComponent,
    EmployerRegisterFormComponent,
    EmployerRegisterComponent,
    TalentRegisterComponent,
    AboutHeroComponent,
    AboutOurPeopleComponent,
    AboutMissionComponent,
    CareersComponent,
    LayoutDashboardComponent,
    DashboardNavComponent,
    LogoutComponent,
    EmployerViewJobsComponent,
    EmployerJobListItemComponent,
    JobDetailsComponent,
    EmployerViewJobPageComponent,
    PageLoadingComponent,
    ViewJobsComponent,
    JobListItemComponent,
    ViewJobPageComponent,
    FindJobsPageComponent,
    ViewJobComponent,
    ApplyPageComponent,
    ApplyToJobComponent,
    EmployerEmployeesPageComponent,
    EmployerEmployeePageComponent,
    EmployerApplicantsPageComponent,
    EmployerApplicantPageComponent,
    EmployerJobApplicantsPageComponent,
    EmployerSettingsPageComponent,
    EmployerMessagesPageComponent,
    TalentProfilePageComponent,
    TalentMyJobsPageComponent,
    TalentMessagesPageComponent,
    TalentSettingsPageComponent,
    EmployerJobResponsesComponent,
    EmployerJobOverviewCardComponent,
    EmployerJobResponseListItemComponent,
    EmployerJobResponseComponent,
    EmployerApplicantActionsCardComponent,
    EmployerAllJobResponsesComponent,
    EmployerAllJobResponsesFiltersComponent,
    EmployerSettingsSidebarComponent,
    EmployerSettingsProfileComponent,
    EmployerSettingsBankingComponent,
    TalentProfileSidebarComponent,
    TalentProfileBasicComponent,
    TalentProfileWorkExperienceComponent,
    TalentProfileEducationComponent,
    TalentProfileVideosComponent,
    TalentSettingsSidebarComponent,
    TalentSettingsBankingComponent,
    TalentMyJobsComponent,
    TalentMyJobsListItemComponent,
    TalentEmploymentOverviewPageComponent,
    TalentEmploymentOverviewComponent,
    ChatComponent,
    ChatBoxComponent,
    TalentWorkHistoryFormComponent,
    TalentEducationFormComponent,
    TalentProfileFormComponent,
    LayoutOnboardingComponent,
    TalentOnboardingPageComponent,
    TalentOnboardingFlowComponent,
    TalentSalaryRangeFormComponent,
    TalentEnglishProficiencyFormComponent,
    TalentEmploymentTypePreferenceFormComponent,
    TalentPreferredRolesFormComponent,
    EmployerOnboardingPageComponent,
    EmployerOnboardingFlowComponent,
    CompanyDetailsFormComponent,
    VideoPlayerComponent,
    BtnSpinnerComponent,
    HeroIconComponent,
    VideoRecorderComponent,
    DropdownComponent,
    DateAgoPipe,
    TalentProfilePhotoFormComponent,
    TalentProfileComponent,
    PageNotFoundComponent,
    EmployerSettingsComponent,
    TalentSettingsComponent,
    ForgotPasswordPageComponent,
    ForgotPasswordFormComponent,
    EmployerEditJobPageComponent,
    TalentResumeFormComponent,
    TalentResumesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([], { scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    CookieModule,
    // NgxPlaidLinkModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    NgSelectModule,
    QuillModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddAPIHeadersInterceptor,
    multi: true,
  },
    ScreenTrackingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
