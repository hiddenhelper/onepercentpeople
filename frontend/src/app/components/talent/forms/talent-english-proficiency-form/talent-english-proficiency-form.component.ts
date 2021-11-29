import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { TalentProfileService } from '@services/talent-profile/talent-profile.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'talent-english-proficiency-form',
  templateUrl: './talent-english-proficiency-form.component.html',
  styleUrls: ['./talent-english-proficiency-form.component.scss']
})
export class TalentEnglishProficiencyFormComponent implements OnInit {

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

  public englishProficiencies: any[] = [];

  public englishProficiencyForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private talentProfileService: TalentProfileService,
  ) {

    this.englishProficiencyForm = this.fb.group({
      englishProficiency: [this.talentProfile?.english_proficiency_id, [Validators.required]],
    });
    this.setEnglishProficiencies();
  }

  ngOnInit(): void {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  }

  /**
   * Sets the default values in the form if the user already has some.
   */
  setDefaults() {
    if (this.talentProfile?.english_proficiency_id)
      this.englishProficiencyForm.controls['englishProficiency'].setValue(this.getEnglishProficiency(this.talentProfile?.english_proficiency_id));
    // this.englishProficiencyForm.patchValue({ englishProficiency: this.getEnglishProficiency(this.talentProfile?.english_proficiency_id) });
  }

  getEnglishProficiency(id: number): object {
    return this.englishProficiencies.find(obj => obj.id === id);
  }

  onSubmit(): void {
    this.updateTalentProfile();
  }

  updateTalentProfile(): void {
    this.errorMessage = "";

    if (!this.englishProficiencyForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.setLoading(true);

    const englishProficiency = this.englishProficiencyForm.controls['englishProficiency'].value;

    // Create a clone.
    let tp: TalentProfile = JSON.parse(JSON.stringify(this.talentProfile));
    tp.english_proficiency_id = englishProficiency.id;

    this.talentProfileService.update(tp).subscribe(
      (response) => {
        this.talentProfile = response.talent_profile;
        this.formEvent.emit({ name: 'finished', talent_profile: this.talentProfile, source: 'talent-english-proficiency-form' });
        this.setLoading(false);
      },
      (error) => {
        this.setLoading(false);
      });
  }

  setEnglishProficiencies(): void {
    this.englishProficiencies = [
      { id: 1, title: "Basic", description: "", icon: "⭐️" },
      { id: 2, title: "Intermediate", description: "", icon: "🌟" },
      { id: 3, title: "Advanced", description: "", icon: "⚡️" },
      { id: 4, title: "Native/Fluent", description: "", icon: "🔥" }
    ];
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-english-proficiency-form' });
  }

  ngOnDestroy() {
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }
}
