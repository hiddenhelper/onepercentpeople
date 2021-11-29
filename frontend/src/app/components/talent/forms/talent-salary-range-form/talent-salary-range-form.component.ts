import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TalentProfileService } from '@services/talent-profile/talent-profile.service';
import { CurrencyService } from '@services/currency/currency.service';
import { Currency } from '@interfaces/currency';

import { TalentProfile } from '@app/interfaces/talent_profile';


@Component({
  selector: 'talent-salary-range-form',
  templateUrl: './talent-salary-range-form.component.html',
  styleUrls: ['./talent-salary-range-form.component.scss']
})
export class TalentSalaryRangeFormComponent implements OnInit {

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

  private ngUnsubscribe = new Subject();
  public salaryForm: FormGroup;
  public currencies: Currency[] = [];
  public salaryPeriods: any[] = [];
  public filteredCurrencies: Observable<Currency[]>;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private currencyService: CurrencyService,
    private talentProfileService: TalentProfileService,
    private toastr: ToastrService
  ) {

    this.salaryForm = this.fb.group({
      salaryPeriod: [null, [Validators.required]],
      salaryMin: [null, [Validators.required]],
      salaryMax: [null, [Validators.required]],
      // salaryCurrency: [null, [Validators.required]],
    });
    this.setSalaryPeriods();
  }

  ngOnInit(): void {
    // this.loadCurrencies();
    this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  }

  /**
   * Sets the default values in the form if the user already has some.
   */
  setDefaults() {
    if (this.talentProfile?.expected_salary) {
      this.salaryForm.controls['salaryPeriod'].setValue(this.getSalaryPeriodsByPeriod(this.talentProfile?.expected_salary?.period));
      this.salaryForm.controls['salaryMin'].setValue(this.talentProfile?.expected_salary?.min);
      this.salaryForm.controls['salaryMax'].setValue(this.talentProfile?.expected_salary?.max);
    }
  }


  onSubmit(): void {
    this.updateTalentProfile();
  }

  updateTalentProfile(): void {
    this.errorMessage = "";

    if (!this.salaryForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.setLoading(true);

    const { value: period } = this.salaryForm.controls['salaryPeriod'].value;
    const min = this.salaryForm.controls['salaryMin'].value;
    const max = this.salaryForm.controls['salaryMax'].value;
    const currency_id = 152;// USD //this.salaryForm.controls['salaryCurrency'].value;

    // Create a clone.
    let tp: TalentProfile = JSON.parse(JSON.stringify(this.talentProfile));
    tp.expected_salary = {
      period,
      min,
      max,
      currency_id
    };

    this.talentProfileService.update(tp).subscribe(response => {
      this.talentProfile = response.talent_profile;
      this.formEvent.emit({ name: 'finished', talent_profile: this.talentProfile, source: 'talent-salary-range-form' });
      this.setLoading(false);
    }, error => {
      this.setLoading(false);
    });
  }

  /**
   *
   */
  getSalaryPeriodsByPeriod(period: string | any): object {
    return this.salaryPeriods.find(obj => obj.value === period);
  }

  /**
   *
   */
  setSalaryPeriods(): void {
    this.salaryPeriods = [
      { id: 1, title: "Hourly Rate", value: 'hour', icon: "clock" },
      { id: 2, title: "Monthly Rate", value: 'month', icon: "moon" },
      { id: 3, title: "Yearly Rate", value: 'year', icon: "calendar" }
    ];
  }

  /**
   *
   */
  loadCurrencies(): void {
    this.currencyService.getAll({}).subscribe(data => {
      this.currencies = data.currencies;
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'talent-salary-range-form' });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.eventsSubscription.unsubscribe();
  }

}
