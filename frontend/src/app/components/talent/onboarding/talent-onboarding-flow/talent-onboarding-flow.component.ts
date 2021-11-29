import { Component, OnInit, Input } from '@angular/core';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { User } from '@app/interfaces/user';
import { AuthService } from '@services/auth/auth.service';
import { UserService } from '@services/user/user.service';
import { TalentProfileService } from '@services/talent-profile/talent-profile.service';
import { WorkHistoryService } from '@services/work-history/work-history.service';
import { EducationService } from '@services/education/education.service';
import { VideoService } from '@services/video/video.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { Education } from '@app/interfaces/education';
import { WorkHistory } from '@app/interfaces/work_history';
import { Location } from '@angular/common';
import { Video } from '@app/interfaces/video';
import { Router } from '@angular/router';

@Component({
  selector: 'talent-onboarding-flow',
  templateUrl: './talent-onboarding-flow.component.html',
  styleUrls: ['./talent-onboarding-flow.component.scss']
})
export class TalentOnboardingFlowComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  eventsSubject: Subject<void> = new Subject<void>();

  talentProfile: TalentProfile | null = null;

  work_histories: WorkHistory[] = [];

  educations: Education[] = [];

  videos: Video[] = [];

  /**
   * Stores which step the user is currently on and show be shown.
   */
  step: number = 1;

  /**
   * Current user.
   */
  user: User | null;

  public loading: boolean = false;

  private workHistoryLoaded: boolean = false;
  private educationLoaded: boolean = false;
  private talentProfileLoaded: boolean = false;
  private videosLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private talentProfileService: TalentProfileService,
    private workHistoryService: WorkHistoryService,
    private educationService: EducationService,
    private location: Location,
    private videoService: VideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTalentProfile();
    this.loadWorkHistory();
    this.loadEducationHistory();
    this.loadVideos();
  }

  /**
   * Load the user's talent profile if it exists.
   * If it doesn't exist. Create one.
   */
  loadTalentProfile(): void {
    this.talentProfileService.getAll({}).subscribe(data => {
      if (data.talent_profiles && data.talent_profiles.length > 0)
        this.talentProfile = data.talent_profiles[0];
      else
        this.createEmptyTalentProfile();
      this.talentProfileLoaded = true;
      this.showUserCorrectStep();
    }, error => {
      this.talentProfileLoaded = true;
      this.showUserCorrectStep();
    });
  }

  loadWorkHistory(): void {
    this.workHistoryService.getAll({}).subscribe(data => {
      this.work_histories = data.work_history;
      this.workHistoryLoaded = true;
      this.showUserCorrectStep();
    });
  }

  loadEducationHistory(): void {
    this.educationService.getAll({}).subscribe(data => {
      this.educations = data.educations;
      this.educationLoaded = true;
      this.showUserCorrectStep();
    });
  }

  loadVideos(): void {
    this.videoService.getAll({}).subscribe(data => {
      this.videos = data.videos;
      this.videosLoaded = true;
      this.showUserCorrectStep();
    });
  }

  createEmptyTalentProfile(): void {
    this.talentProfileService.create({}).subscribe(response => {
      this.talentProfile = response.talent_profile;

    }, error => {

    });

  }

  /**
   * This takes the user to the correct step in the onboarding process.
   * This is important for if they refresh the page or come back to it later.
   */
  showUserCorrectStep() {
    if (this.talentProfileLoaded && this.educationLoaded && this.workHistoryLoaded && this.videosLoaded) {
      this.step = this.calculateNextStep();
      this.updatePageUrl();
    }
  }

  /**
   * This emits an event to the child component, to tell it that the next button has been clicked.
   */
  emitEventToChild() {
    this.eventsSubject.next();
  }

  /**
   * This uses the data loaded to figure out which step the user should be on.
   */
  calculateNextStep(): number {
    if (!this.talentProfile?.english_proficiency_id) {
      return 1;
    } else if (!this.talentProfile?.employment_type_preference_id) {
      return 2;
      // } else if (!this.talentProfile?.employment_type_preference_id) {
      //   return 3;
    } else if (!this.talentProfile?.expected_salary) {
      return 4;
    } else if (this.work_histories.length < 1) {
      return 5;
    } else if (this.educations.length < 1) {
      return 6;
    } else if (!this.user?.profile_photo_url) {
      return 7;
    } else if (this.videos.length < 1) {
      return 8;
    } else if (this.videos.length === 1) {
      return 9;
    } else if (this.videos.length === 2) {
      return 10;
    } else if (this.videos.length > 2) {
      this.finishOnboarding();
    }

    // last step
    return 10;
  }

  /**
   * Called when the user clicks the "Next" button.
   */
  nextClicked(): void {
    this.emitEventToChild();
    // TODO: Temporary. Take this out when there's a component for step 3.
    if (this.step === 3) {
      this.showNextStep();
    }
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
    if (this.step < 10) {
      this.step++;

      // Skip step 3
      if (this.step === 3) {
        this.step++;
      }
    } else if (this.step === 10)
      this.finishOnboarding();
    this.updatePageUrl();
  }

  /**
   * Go back to displaying the previous step.
   */
  showPreviousStep(): void {
    if (this.step > 1) {
      this.step--;
      if (this.step === 3) {
        this.step--;
      }
    }
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
   * Catches events from the individual form components and then takes the necessary action.
   * @param $event
   */
  handleFormEvents($event: any): void {
    // console.log('handling caught event', $event);
    // Update the talent profile if included.
    if ($event.talent_profile) {
      this.talentProfile = $event.talent_profile;
    }
    if ($event.video) {
      this.videos.push($event.video);
    }

    // Add or replace education
    if ($event.education) {
      if (!!this.educations.find(edu => edu.id === $event.education.id))
        this.educations[this.educations.findIndex(edu => edu.id === $event.education.id)] = $event.education;
      else
        this.educations.push($event.education);
    }

    // Add or replace work history
    if ($event.work_history) {
      if (!!this.work_histories.find(w => w.id === $event.work_history.id))
        this.work_histories[this.work_histories.findIndex(w => w.id === $event.work_history.id)] = $event.work_history;
      else
        this.work_histories.push($event.work_history);
    }

    if ($event.name === 'finished') {
      this.showNextStep();
    }

    if ($event.name === 'set-loading') {
      this.loading = $event.loading;
    }
  }

  /**
   *
   */
  submit(): void {

  }

  /**
   * Mark the user as having completed the onboarding and redirect them to the dashboard.
   */
  finishOnboarding(): void {
    this.userService.markFinishedOnboarding().subscribe(
      (response) => {
        this.router.navigateByUrl('/talent')
      }, (error) => {

      });
  }

}
