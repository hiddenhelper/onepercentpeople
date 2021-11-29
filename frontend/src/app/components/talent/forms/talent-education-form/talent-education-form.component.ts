import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EducationService } from '@services/education/education.service';
import { EducationLevelService } from '@services/education-level/education-level.service';
import { Education } from '@app/interfaces/education';
import { Observable, Subscription } from 'rxjs';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { CountryService } from '@services/country/country.service';
import { Country } from '@app/interfaces/country';
import { EducationLevel } from '@app/interfaces/education_level';

@Component({
  selector: 'talent-education-form',
  templateUrl: './talent-education-form.component.html',
  styleUrls: ['./talent-education-form.component.scss']
})
export class TalentEducationFormComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showButtons: boolean = true;


  @Output() formEvent = new EventEmitter();

  /**
   *
   */
  @Input() talentProfile: TalentProfile | null;

  /**
   * Form error message to show user.
   */
  errorMessage: string = "";

  /**
   * State of form request.
   */
  loading: boolean = false;


  private _education: Education | null;
  /**
   * An Education object.
   */
  @Input()
  get education(): Education | null { return this._education; }
  set education(education: Education | null) {
    this._education = education;
    this.setDefaults();
  }

  /**
   *
   */
  public educationForm: FormGroup;

  public countries: Country[] = [];

  public education_levels: EducationLevel[] = [];

  public months: any[] = [];
  public years: any[] = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private educationService: EducationService,
    private toastr: ToastrService,
    private countryService: CountryService,
    private educationLevelService: EducationLevelService,
  ) {
    this.educationForm = this.fb.group({
      education_level: [null, Validators.required],
      field_of_study: [null, Validators.required],
      school_name: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      // current_school: [null, Validators.required],
      from_month: [null, [Validators.required, Validators.pattern(/(^0?[1-9]$)|(^1[0-2]$)/)]],
      to_month: [null, [Validators.required, Validators.pattern(/(^0?[1-9]$)|(^1[0-2]$)/)]],
      from_year: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      to_year: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
    });
  }



  ngOnInit(): void {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
    this.loadEducationLevels();
    this.loadCountries();
    this.loadMonths();
    this.loadYears();
  }

  setDefaults(): void {
    if (this.education) {
      this.educationForm.controls['education_level'].setValue(this.education.education_level_id);
      this.educationForm.controls['field_of_study'].setValue(this.education.field_of_study);
      this.educationForm.controls['school_name'].setValue(this.education.school_name);
      this.educationForm.controls['city'].setValue(this.education?.city);
      this.educationForm.controls['country'].setValue(this.education?.country_id);
      // this.educationForm.controls['current_school'].setValue(this.education?.current_school);
      this.educationForm.controls['from_month'].setValue(this.education?.from_month);
      this.educationForm.controls['to_month'].setValue(this.education?.to_month);
      this.educationForm.controls['from_year'].setValue(this.education?.from_year);
      this.educationForm.controls['to_year'].setValue(this.education?.to_year);
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

    for (let index = current_year; index >= current_year - 60; index--) {
      this.years.push({ title: index, value: index });
    }
  }

  loadEducationLevels(): void {
    this.educationLevelService.getAll({}).subscribe(
      (response) => {

        this.education_levels = response.education_levels;
      },
      (error) => {

      },
    );
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

  onSubmit(): void {
    this.errorMessage = "";

    if (!this.educationForm.valid) {
      this.errorMessage = "There are errors in your input. Please correct them before continuing";
      return;
    }

    this.setLoading(true);

    const edu = this.buildEducationObject();

    (edu.id && edu.id > 0) ? this.updateEducation(edu) : this.createNewEducation(edu);
  }

  /**
   * Build an education object from the form input and starting with the education prop.
   * @returns Education
   */
  buildEducationObject(): Education {
    const education_level_id = this.educationForm.controls['education_level'].value;
    const city = this.educationForm.controls['city'].value;
    const country = this.educationForm.controls['country'].value;
    const field_of_study = this.educationForm.controls['field_of_study'].value;
    const school_name = this.educationForm.controls['school_name'].value;
    // const current_school = this.educationForm.controls['current_school'].value;
    const from_month = this.educationForm.controls['from_month'].value;
    const from_year = this.educationForm.controls['from_year'].value;
    const to_month = this.educationForm.controls['to_month'].value;
    const to_year = this.educationForm.controls['to_year'].value;

    // Create a clone.
    let edu: Education = this.education ? JSON.parse(JSON.stringify(this.education)) : {};

    edu.education_level_id = education_level_id;
    edu.school_name = school_name;
    edu.field_of_study = field_of_study;
    edu.city = city;
    edu.country_id = country;
    // edu.current_school = current_school;
    edu.from_month = from_month;
    edu.from_year = from_year;
    edu.to_month = to_month;
    edu.to_year = to_year;

    return edu
  }

  updateEducation(edu: Education): void {
    this.educationService.update(edu).subscribe(response => {
      this.education = response.education;
      this.formEvent.emit({ name: 'finished', education: this.education, source: 'talent-education-form' });
      this.setLoading(false);
    }, error => {
      this.setLoading(false);
    });
  }
  createNewEducation(edu: Education): void {
    this.educationService.create(edu).subscribe(response => {
      this.education = response.education;
      this.formEvent.emit({ name: 'finished', education: this.education, source: 'talent-education-form' });
      this.setLoading(false);
    }, error => {
      this.setLoading(false);
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-education-form' });
  }

  ngOnDestroy() {
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }

}

