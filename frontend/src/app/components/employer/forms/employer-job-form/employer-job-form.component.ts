import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmployerJobService } from '@services/employer/job/job.service';
import { RoleService } from '@services/role/role.service';
import { CurrencyService } from '@services/currency/currency.service';

import { Job } from '@interfaces/job';
import { Role } from '@interfaces/role';
import { Currency } from '@interfaces/currency';

@Component({
  selector: 'employer-job-form',
  templateUrl: './employer-job-form.component.html',
  styleUrls: ['./employer-job-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployerJobFormComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public jobForm: FormGroup;
  public loading: boolean = false;
  public roles: Role[] = [];
  public currencies: Currency[] = [];
  public timeCommitments: any[] = [];
  public salaryPeriods: any[] = [];
  public salaryRanges: any = {};
  public filteredCurrencies: Observable<Currency[]>;
  public errorMessage: string = '';
  public selected = -1;

  public step: number = 1;
  @Input('steps') steps = {};
  @Output('onStepChange') stepChanged = new EventEmitter();


  /**
   * If job id is set, user is editing the job and it needs to be loaded.
   */
  @Input() jobId: number = -1;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private employerJobService: EmployerJobService,
    private roleService: RoleService,
    private currencyService: CurrencyService,
    private toastr: ToastrService
  ) {

    this.jobForm = this.fb.group({
      title: [null, [Validators.required]],
      // location: [null, []],
      description: [null, [Validators.required, Validators.minLength(50)]],
      role: [null, [Validators.required]],
      timeCommitment: [null, [Validators.required]],
      salaryPeriod: [null, [Validators.required]],
      // salaryMin: [null, [Validators.required]],
      // salaryMax: [null, [Validators.required]],
      salaryRange: [null, [Validators.required]],
      // salaryCurrency: [null],
    });
  }

  get totalSteps() {
    return Object.keys(this.steps);
  }

  ngOnInit(): void {

    Promise.all([this.loadRoles(), this.setTimeCommitments(), this.setSalaryPeriods(), this.setSalaryRanges()])
      .then((values) => {
        if (this.jobId > 0) {
          this.loadJob();
        }
      });
  }

  displayCurrencyValue(currency: Currency): string {
    return currency && currency.title ? `${currency.iso} - ${currency.title}` : '';
  }

  async loadRoles(): Promise<void> {
    this.roleService.getAll({}).subscribe(data => {
      this.roles = data.roles;
    });
  }

  setTimeCommitments(): void {
    this.timeCommitments = [
      { id: 1, title: "Full-time", description: "(40 hours/week)", icon: "🔥" },
      { id: 2, title: "Part-time", description: "(20 hours/week)", icon: "🙌" },
      // Not allowing hourly jobs at the moment.
      // { id: 3, title: "Hourly", description: "(Up to 10 hours/week)", icon: "💪" }
    ];
  }

  setSalaryPeriods(): void {
    this.salaryPeriods = [
      { id: 1, title: "Hourly Rate", value: 'hour', icon: "clock" },
      { id: 2, title: "Monthly Rate", value: 'month', icon: "moon" },
      { id: 3, title: "Yearly Rate", value: 'year', icon: "calendar" }
    ];
  }

  // default salary ranges based on salary period.

  setSalaryRanges(): void {
    this.salaryRanges = {
      hour: [
        { id: 1, title: "$10 - $12", min: 10, max: 12 },
        { id: 2, title: "$12 - $14", min: 12, max: 14 },
        { id: 3, title: "$15 - $18", min: 15, max: 18 },
        { id: 4, title: "$18 - $20", min: 18, max: 20 },
        { id: 5, title: "$20 - $22", min: 20, max: 22 },
        { id: 6, title: "$22 - $25", min: 22, max: 25 },
        { id: 7, title: "$25 <", min: 25 },
      ],
      month: [
        { id: 1, title: "$500 - $750", min: 500, max: 750 },
        { id: 2, title: "$750 - $1,000", min: 750, max: 1000 },
        { id: 3, title: "$1,000 - $1,500", min: 1000, max: 1500 },
        { id: 4, title: "$1,500 - $2,000", min: 1500, max: 2000 },
        { id: 5, title: "$2,000 - $2,500", min: 2000, max: 2500 },
        { id: 6, title: "$2,500 - $3,000", min: 2500, max: 3000 },
        { id: 7, title: "$3,000 - $3,500", min: 3000, max: 3500 },
        { id: 8, title: "$3,500 - $4,000", min: 3500, max: 4000 },
        { id: 9, title: "$,4000 < ", min: 4000 }
      ],
      year: [
        { id: 1, title: "$6,000 - $9,000", min: 6000, max: 9000 },
        { id: 2, title: "$9,000 - $12,000", min: 9000, max: 12000 },
        { id: 3, title: "$12,000 - $18,000", min: 12000, max: 18000 },
        { id: 4, title: "$18,000 - $24,000", min: 18000, max: 24000 },
        { id: 5, title: "$24,000 - $30,000", min: 24000, max: 30000 },
        { id: 6, title: "$30,000 - $36,000", min: 30000, max: 36000 },
        { id: 7, title: "$36,000 - $42,000", min: 36000, max: 42000 },
        { id: 8, title: "$42,000 - $48,000", min: 42000, max: 48000 },
        { id: 9, title: "$48,000 < ", min: 48000 }
      ]
    };
  }

  previousStep(): void {
    this.step--;
    this.stepChanged.emit(this.step);
  }

  nextStep(): void {
    this.step++;
    this.stepChanged.emit(this.step);
  }

  setStep(step) {
    this.step = step;
    this.stepChanged.emit(this.step);
  }

  buildJobObject(): Job {
    const title = this.jobForm.controls['title'].value;
    // const location = this.jobForm.controls['location'].value;
    const description = this.jobForm.controls['description'].value;
    const role = this.jobForm.controls['role'].value;
    const timeCommitment = this.jobForm.controls['timeCommitment'].value;
    const salaryPeriod = this.jobForm.controls['salaryPeriod'].value;
    // const salaryMin = this.jobForm.controls['salaryMin'].value;
    // const salaryMax = this.jobForm.controls['salaryMax'].value;
    const salaryRange = this.jobForm.controls['salaryRange'].value;
    // const salaryCurrency = this.jobForm.controls['salaryCurrency'].value;

    const default_currency = 152;//US Dollar

    let job: Job = {
      title: title,
      // location: location,
      description: description,
      role_id: role.id,
      employment_type_id: timeCommitment.id,
      salary_period: salaryPeriod.value,
      min_salary: salaryRange.min,
      max_salary: salaryRange.max,
      salary_currency_id: default_currency,//salaryCurrency.id,
      // posted_at: ''
    };

    if (this.jobId > 0)
      job.id = this.jobId;

    return job;
  }

  /**
   * Creates job without posting it.
   */
  saveAndExit(): void {
    this.saveJob(true, "Draft created!");
  }

  /**
   * Creates job and marks it as posted.
   */
  postJob(): void {
    this.saveJob(false, "Job Posted!");
  }

  /**
   * Creates a new job.
   *
   * @param draft:boolean | Specifies whether it is a draft or should be posted immediately.
   * @param successMessage:string | Message to show to user after request is successful.
   * @returns void
   */
  saveJob(draft: boolean, successMessage: string): void {
    this.errorMessage = "";

    if (!this.jobForm.valid) {

      this.errorMessage = "Please check your input and try again. All fields are required.";
      return;
    }

    this.loading = true;

    let job = this.buildJobObject();

    this.employerJobService.create(job, { draft: draft })
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.success) {
            this.toastr.success("", successMessage);
            this.router.navigate(['employer/jobs', response.job.id]);
          } else {
            // this.errorMessage = response.error;
            this.errorMessage = "Error";
          }
        },
        (error) => {
          this.loading = false;
          if (error.status === 422) {
            this.errorMessage = "Invalid data. Please correct your input and try again.";
          } else {
            this.errorMessage = "Something went wrong. Please try again.";
          }
        },
      )
  }

  /**
   * Updates the existing job.
   *
   * @returns void
   */
  updateExistingJob(): void {
    this.errorMessage = "";

    if (!this.jobForm.valid) {
      this.errorMessage = "Please check your input and try again. All fields are required.";
      return;
    }

    this.loading = true;

    let job = this.buildJobObject();

    this.employerJobService.update(job)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.success) {
            this.toastr.success("", "Job Updated");
            this.router.navigate(['employer/jobs', response.job.id]);
          } else {
            this.errorMessage = "Error";
          }
        },
        (error) => {
          this.loading = false;
          if (error.status === 422) {
            this.errorMessage = "Invalid data. Please correct your input and try again.";
          } else {
            this.errorMessage = "Something went wrong. Please try again.";
          }
        },
      )
  }

  /**
  * Load the job resource.
  */
  async loadJob(): Promise<void> {
    this.employerJobService.getOne(this.jobId).subscribe(
      data => {
        this.setDefaults(data.job);
      },
      (error) => {
      }
    );
  }

  setDefaults(job: Job): void {
    this.jobForm.controls['title'].setValue(job.title);
    this.jobForm.controls['description'].setValue(job.description);
    this.jobForm.controls['role'].setValue(this.roles.find(role => role.id === job.role_id));
    this.jobForm.controls['timeCommitment'].setValue(this.timeCommitments.find(timeCommitment => timeCommitment.id === job.employment_type_id));
    const salaryPeriod = this.salaryPeriods.find(period => period.value === job.salary_period);
    this.jobForm.controls['salaryPeriod'].setValue(salaryPeriod);
    this.jobForm.controls['salaryRange'].setValue(this.salaryRanges[salaryPeriod.value].find(range => range.min === job.min_salary))
    // this.jobForm.controls['salaryMin'].setValue(job.min_salary);
    // this.jobForm.controls['salaryMax'].setValue(job.max_salary);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
