import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { UserService } from '@services/user/user.service';
import { AuthService } from '@services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '@app/interfaces/user';

@Component({
  selector: 'talent-profile-photo-form',
  templateUrl: './talent-profile-photo-form.component.html',
  styleUrls: ['./talent-profile-photo-form.component.scss']
})
export class TalentProfilePhotoFormComponent implements OnInit {

  private photoFile: File;

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

  public profilePhotoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
  ) {

    this.profilePhotoForm = this.fb.group({
      photo: [null, [Validators.required]],
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
   * Called when the user selects a new file for their profile photo.
   * Catch the file from the event and save it as this.photoFile to be
   * used in onSubmit later.
   *
   * @param event
   */
  onFileChanged(event): void {
    this.photoFile = event.target.files[0];
  }

  /**
   * Perform a request to upload and save the image file.
   *
   * @returns
   */
  onSubmit() {
    // If photoFile is not set, we do not need to do perform the request.
    if (!this.photoFile) {
      // If they already have a profile photo, they can go on to the next step.
      if (this.user?.profile_photo_url) {
        this.formEvent.emit({ name: 'finished', user: this.user, source: 'talent-profile-photo-form' });
      }
      this.setLoading(false);
      return;
    }

    return this.userService.saveProfilePhoto(this.photoFile).subscribe(
      (response) => {
        this.setLoading(false);
        if (response.user) {
          this.user = response.user;
          this.authService.setUser(response.user);
        }
        this.formEvent.emit({ name: 'finished', user: this.user, source: 'talent-profile-photo-form' });
      },
      (error) => {
        this.setLoading(false);
      });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-profile-photo-form' });
  }

  ngOnDestroy() {
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }
}
