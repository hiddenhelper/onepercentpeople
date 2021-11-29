import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { ResumeService } from '@services/resume/resume.service';
import { AuthService } from '@services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '@app/interfaces/user';


@Component({
  selector: 'talent-resume-form',
  templateUrl: './talent-resume-form.component.html',
  styleUrls: ['./talent-resume-form.component.scss']
})
export class TalentResumeFormComponent implements OnInit {

  private resumeFile: File;

  private eventsSubscription: Subscription;

  @Input() events: Observable<void>;

  @Output() formEvent = new EventEmitter();

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showButtons: boolean = true;

  /**
   * Current user.
   */
  @Input() user: User | null;

  private _talentProfile: TalentProfile | null;
  /**
   *
   */
  @Input()
  get talentProfile(): TalentProfile | null { return this._talentProfile; }
  set talentProfile(talent_profile: TalentProfile | null) {
    this._talentProfile = talent_profile;
    this.setDefaults();
  }

  /**
   * Error message to show the user on form submission fail.
   */
  errorMessage: string = ""

  /**
   * Store the loading state of the form request.
   */
  loading: boolean = false

  public resumeForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private resumeService: ResumeService,
    private authService: AuthService,
  ) {

    this.resumeForm = this.fb.group({
      resume: [null, [Validators.required]],
    });

  }

  ngOnInit(): void {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  }

  /**
  * Sets the default values in the form if the user already has some.
  */
  setDefaults() {

  }

  /**
   * Called when the user selects a new file for their resume.
   * Catch the file from the event and save it as this.resumeFile to be
   * used in onSubmit later.
   *
   * @param event
   */
  onFileChanged(event): void {
    this.resumeFile = event.target.files[0];
  }

  /**
   * Perform a request to upload and save the resume file.
   *
   * @returns
   */
  onSubmit() {
    // If resumeFile is not set, we do not need to do perform the request.
    if (!this.resumeFile) {
      // this.formEvent.emit({ name: 'finished', user: this.user, source: 'talent-resume-form' });
      this.setLoading(false);
      return;
    }

    return this.resumeService.create(this.resumeFile).subscribe(
      (response) => {
        this.setLoading(false);
        this.formEvent.emit({ name: 'finished', resume: response.resume, source: 'talent-resume-form' });
      },
      (error) => {
        this.setLoading(false);
      });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-resume-form' });
  }

  ngOnDestroy() {
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }
}
