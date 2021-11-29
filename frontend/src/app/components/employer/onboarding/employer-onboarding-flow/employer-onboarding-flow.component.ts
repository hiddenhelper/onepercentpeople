import { Component, OnInit, Input } from '@angular/core';
import { Company } from '@app/interfaces/company';
import { User } from '@app/interfaces/user';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { CompanyService } from '@services/employer/company/company.service';
import { UserService } from '@services/user/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'employer-onboarding-flow',
  templateUrl: './employer-onboarding-flow.component.html',
  styleUrls: ['./employer-onboarding-flow.component.scss']
})
export class EmployerOnboardingFlowComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  eventsSubject: Subject<void> = new Subject<void>();

  company: Company | null = null;

  loading: boolean = false;

  /**
   * Stores which step the user is currently on and show be shown.
   */
  step: number = 1;

  /**
   * Current user.
   */
  user: User | null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private companyService: CompanyService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadCompany();
  }

  loadCompany(): void {
    this.companyService.getAll({}).subscribe((data) => {
      if (data.companies && data.companies.length > 0)
        this.company = data.companies[0];
    });

  }

  /**
   * This emits an event to the child component, to tell it that the next button has been clicked.
   */
  emitEventToChild() {
    this.eventsSubject.next();
  }

  /**
   * Catches events from the individual form components and then takes the necessary action.
   * @param $event
   */
  handleFormEvents($event: any): void {
    // console.log('handling caught event', $event);
    // Update the company if included.
    if ($event.company) {
      this.company = $event.company;
    }

    if ($event.name === 'finished') {
      this.showNextStep();
    }

    if ($event.name === 'set-loading') {
      this.loading = $event.loading;
    }
  }

  /**
   * Called when the user clicks the "Next" button.
   */
  nextClicked(): void {
    this.emitEventToChild();
    // TODO: Temporary. Take this out when there's a component for step 3.
    // if (this.step === 3 || this.step === 7) {
    // this.showNextStep();
    // }
  }

  /**
   * Called when the user clicks the "Back" button.
   */
  backClicked(): void {
    this.showPreviousStep();
  }

  /**
   * Display the next step.
   */
  showNextStep(): void {
    if (this.step < 10)
      this.step++;

    if (this.step > 1)
      this.markFinishedOnboarding();

    this.updatePageUrl();
  }

  /**
   * Go back to displaying the previous step.
   */
  showPreviousStep(): void {
    if (this.step > 1)
      this.step--;
    this.updatePageUrl();
  }

  /**
   * Updates the browser location to include ?step={currentStep}
   */
  updatePageUrl(): void {
    let currentPath = this.location.path();
    currentPath = currentPath.split('?')[0];

    this.location.replaceState(`${currentPath}?step=${this.step}`);
  }

  /**
   * Mark the user as finished onboarding.
   * No Redirect here, because they are now working on posting their first job.
   */
  markFinishedOnboarding(): void {
    this.userService.markFinishedOnboarding().subscribe(
      (response) => {

      }, (error) => {

      });
  }
}
