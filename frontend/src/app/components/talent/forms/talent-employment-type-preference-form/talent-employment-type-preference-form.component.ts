import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { TalentProfileService } from '@services/talent-profile/talent-profile.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'talent-employment-type-preference-form',
  templateUrl: './talent-employment-type-preference-form.component.html',
  styleUrls: ['./talent-employment-type-preference-form.component.scss']
})
export class TalentEmploymentTypePreferenceFormComponent implements OnInit {

  private eventsSubscription: Subscription;

  @Input() events: Observable<void>;

  @Output() formEvent = new EventEmitter();

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showButtons: boolean = true;

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

  public employmentTypes: any[] = [];

  public employmentTypesForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private talentProfileService: TalentProfileService,
  ) {

    this.employmentTypesForm = this.fb.group({
      employmentType: [null, [Validators.required]],
    });
    this.setEmploymentTypes();
  }

  ngOnInit(): void {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  }

  /**
  * Sets the default values in the form if the user already has some.
  */
  setDefaults() {
    if (this.talentProfile?.employment_type_preference_id)
      this.employmentTypesForm.controls['employmentType'].setValue(this.getEmploymentType(this.talentProfile?.employment_type_preference_id));
  }

  getEmploymentType(id: number): object {
    return this.employmentTypes.find(obj => obj.id === id);
  }

  setEmploymentTypes(): void {
    this.employmentTypes = [
      { id: 1, title: "Full-time", description: "(40 hours/week)", icon: "🔥" },
      { id: 2, title: "Part-time", description: "(20 hours/week)", icon: "🙌" },
      // Not allowing hourly jobs at the moment.
      // { id: 3, title: "Hourly", description: "(Up to 10 hours/week)", icon: "💪" }
    ];
  }

  onSubmit() {
    this.updateTalentProfile();
  }

  updateTalentProfile(): void {
    this.errorMessage = "";

    if (!this.employmentTypesForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.setLoading(true);

    const employmentType = this.employmentTypesForm.controls['employmentType'].value;

    // Create a clone.
    let tp: TalentProfile = JSON.parse(JSON.stringify(this.talentProfile));
    tp.employment_type_preference_id = employmentType.id;

    this.talentProfileService.update(tp).subscribe(
      (response) => {
        this.talentProfile = response.talent_profile;
        this.formEvent.emit({ name: 'finished', talent_profile: this.talentProfile, source: 'talent-employment-type-preference-form' });
        this.setLoading(false);
      },
      (error) => {
        this.setLoading(false);
      });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-employment-type-preference-form' });
  }

  ngOnDestroy() {
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }
}
