import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkHistoryService } from '@services/work-history/work-history.service';
import { WorkHistory } from '@app/interfaces/work_history';
import { Observable, Subscription } from 'rxjs';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { CountryService } from '@services/country/country.service';
import { Country } from '@app/interfaces/country';

@Component({
  selector: 'talent-work-history-form',
  templateUrl: './talent-work-history-form.component.html',
  styleUrls: ['./talent-work-history-form.component.scss']
})
export class TalentWorkHistoryFormComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showButtons: boolean = true;

  /**
   * Event emitter for form events.
   */
  @Output() formEvent = new EventEmitter();

  /**
   *
   */
  @Input() talentProfile: TalentProfile | null;

  private _work_history: WorkHistory | null;
  /**
   * A WorkHistory object.
   */
  @Input()
  get work_history(): WorkHistory | null { return this._work_history; }
  set work_history(work_history: WorkHistory | null) {
    this._work_history = work_history;
    this.setDefaults();
  }

  /**
   * Form error message to show user.
   */
  public errorMessage: string = "";

  /**
   * State of form request.
   */
  public loading: boolean = false;

  /**
   *
   */
  public workExperienceForm: FormGroup;

  public months: any[] = [];
  public years: any[] = [];
  public countries: Country[] = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private workHistoryService: WorkHistoryService,
    private toastr: ToastrService,
    private countryService: CountryService,
  ) {
    this.workExperienceForm = this.fb.group({
      resume: [null],
      job_title: [null, Validators.required],
      company: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      current_employment: [0],
      from_month: [null, [Validators.required, Validators.pattern(/(^0?[1-9]$)|(^1[0-2]$)/)]],
      to_month: [null, [Validators.required, Validators.pattern(/(^0?[1-9]$)|(^1[0-2]$)/)]],
      from_year: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      to_year: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      description: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
    this.loadCountries();
    this.loadMonths();
    this.loadYears();
  }

  setDefaults(): void {
    if (this.work_history) {
      this.workExperienceForm.controls['job_title'].setValue(this.work_history.job_title);
      this.workExperienceForm.controls['company'].setValue(this.work_history?.company);
      this.workExperienceForm.controls['city'].setValue(this.work_history?.city);
      this.workExperienceForm.controls['country'].setValue(this.work_history?.country_id);
      this.workExperienceForm.controls['current_employment'].setValue(this.work_history?.current_employment);
      this.workExperienceForm.controls['from_month'].setValue(this.work_history?.from_month);
      this.workExperienceForm.controls['to_month'].setValue(this.work_history?.to_month);
      this.workExperienceForm.controls['from_year'].setValue(this.work_history?.from_year);
      this.workExperienceForm.controls['to_year'].setValue(this.work_history?.to_year);
      this.workExperienceForm.controls['description'].setValue(this.work_history?.description);
    }
  }

  /**
     * Builds a list of months to use in dropdowns
     */
  loadMonths(): void {
    const names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (let index = 1; index <= 12; index++) {
      this.months.push({ title: `${index} - ${names[index - 1]}`, value: index });
    }
  }

  /**
   * Builds a list of years to use in dropdowns
   */
  loadYears(): void {
    const current_year = new Date().getFullYear();

    for (let index = current_year + 5; index >= current_year - 60; index--) {
      this.years.push({ title: index, value: index });
    }
  }

  loadCountries(): void {
    this.countryService.getAll({}).subscribe(
      (response) => {

        this.countries = response.countries;
      },
      (error) => {

      },
    );
  }

  /**
   * When user clicks save on the work history form, ths should be called.
   *
   * @returns void
   */
  onSubmit(): void {
    this.errorMessage = "";

    if (!this.workExperienceForm.valid) {
      this.errorMessage = "There are errors in your input. Please correct them before continuing";
      return;
    }

    this.setLoading(true);

    const wh = this.buildWorkHistoryObject();

    if (wh.id && wh.id > 0) {
      this.updateWorkHistory(wh);
    } else {
      this.createNewWorkHistory(wh);
    }
  }

  /**
   * Build a work history object from the form input and starting with the work history prop.
   * @returns WorkHistory
   */
  buildWorkHistoryObject(): WorkHistory {
    // const resume = this.workExperienceForm.controls['resume'].value;
    const job_title = this.workExperienceForm.controls['job_title'].value;
    const company = this.workExperienceForm.controls['company'].value;
    const city = this.workExperienceForm.controls['city'].value;
    const country = this.workExperienceForm.controls['country'].value;
    const current_employment = this.workExperienceForm.controls['current_employment'].value;
    const from_month = this.workExperienceForm.controls['from_month'].value;
    const from_year = this.workExperienceForm.controls['from_year'].value;
    const to_month = this.workExperienceForm.controls['to_month'].value;
    const to_year = this.workExperienceForm.controls['to_year'].value;
    const description = this.workExperienceForm.controls['description'].value;

    // Create a clone.
    let wh: WorkHistory = this.work_history ? JSON.parse(JSON.stringify(this.work_history)) : {};
    // TODO: resume needs to be stored outside of work history object
    // wh.resume = resume;

    wh.job_title = job_title;
    wh.company = company;
    wh.city = city;
    wh.country_id = country;
    wh.current_employment = current_employment;
    wh.from_month = from_month;
    wh.from_year = from_year;
    wh.to_month = to_month;
    wh.to_year = to_year;
    wh.description = description;

    return wh
  }

  /**
   * Update the existing work history object
   *
   * @param wh
   */
  updateWorkHistory(wh: WorkHistory): void {
    this.workHistoryService.update(wh)
      .subscribe(
        (response) => {
          this.setLoading(false);
          this.work_history = response.work_history;
          this.formEvent.emit({ name: 'finished', work_history: this.work_history, source: 'talent-work-history-form' });
        },
        (error) => {
          this.setLoading(false);
          if (error.status === 422) {
            this.errorMessage = "Invalid data. Please enter your input and try again.";
          } else {
            this.errorMessage = "Something went wrong. Please try again.";
          }
        },
      );
  }

  /**
   * Store the new work history object
   *
   * @param wh
   */
  createNewWorkHistory(wh: WorkHistory): void {
    this.workHistoryService.create(wh)
      .subscribe(
        (response) => {
          this.setLoading(false);
          this.work_history = response.work_history;
          this.formEvent.emit({ name: 'finished', work_history: this.work_history, source: 'talent-work-history-form' });
        },
        (error) => {
          this.setLoading(false);
          if (error.status === 422) {
            this.errorMessage = "Invalid data. Please enter your input and try again.";
          } else {
            this.errorMessage = "Something went wrong. Please try again.";
          }
        },
      );
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-work-history-form' });
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }
}
