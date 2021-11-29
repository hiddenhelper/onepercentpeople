import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from '@services/employer/company/company.service';
import { Company } from '@app/interfaces/company';

@Component({
  selector: 'employer-company-details-form',
  templateUrl: './company-details-form.component.html',
  styleUrls: ['./company-details-form.component.scss']
})
export class CompanyDetailsFormComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() formEvent = new EventEmitter();

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showButtons: boolean = true;

  /**
   * Whether or not to show heading text
   */
  @Input() showHeadings: boolean = true;

  logoFile: File;

  private _company: Company | null;
  /**
   * A Company object.
   */
  @Input()
  get company(): Company | null { return this._company; }
  set company(company: Company | null) {
    this._company = company;
    this.setDefaults();
  }

  private ngUnsubscribe = new Subject();
  public companyForm: FormGroup;

  loading: boolean = false;

  /**
   * Error message to show the user on form submission fail.
   */
  errorMessage: string = ""

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.companyForm = this.fb.group({
      name: [null, Validators.required],
      url: [null, Validators.required],
      industry: [null, Validators.required],
      phone: [null, Validators.required],
      logo: [null], //Validators.required],
      description: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  }

  setDefaults(): void {
    if (this.company) {
      this.companyForm.controls['name'].setValue(this.company.name);
      this.companyForm.controls['url'].setValue(this.company.url);
      this.companyForm.controls['industry'].setValue(this.company.industry);
      this.companyForm.controls['phone'].setValue(this.company?.phone);
      this.companyForm.controls['description'].setValue(this.company?.description);
    }
  }
  /**
   * Called when the user selects a new file for their logo.
   * Catch the file from the event and save it as this.logoFile to be
   * used in onSubmit later.
   *
   * @param event
   */
  onFileChanged(event): void {
    this.logoFile = event.target.files[0];
  }

  /**
   * Called when user click button to save the form input.
   * Creates or updates a company instance in the database.
   *
   * @returns void
   */
  onSubmit(): void {
    this.errorMessage = "";

    if (!this.companyForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.setLoading(true);

    const comp = this.buildCompanyObject();
    console.log(comp);

    (comp.id && comp.id > 0) ? this.updateCompany(comp) : this.createCompany(comp);
  }

  buildCompanyObject() {
    const name = this.companyForm.controls['name'].value;
    const url = this.companyForm.controls['url'].value;
    const industry = this.companyForm.controls['industry'].value;
    const phone = this.companyForm.controls['phone'].value;
    const description = this.companyForm.controls['description'].value;

    let comp: Company = this.company ? JSON.parse(JSON.stringify(this.company)) : {};

    comp.name = name;
    comp.url = url;
    comp.industry = industry;
    comp.phone = phone;
    comp.description = description;

    return comp;
  }

  updateCompany(comp: Company): void {
    this.companyService.update(comp).subscribe(response => {
      this.company = response.company;
      this.formEvent.emit({ name: 'finished', company: this.company, source: 'company-details-form' });
      this.saveLogo();
    }, error => {
      this.setLoading(false);
    });
  }

  createCompany(comp: Company): void {
    this.companyService.create(comp).subscribe(response => {
      this.company = response.company;
      this.formEvent.emit({ name: 'finished', company: this.company, source: 'company-details-form' });
      this.saveLogo();
    }, error => {
      this.setLoading(false);
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'company-details-form' });
  }

  /**
   * Perform a request to upload and save the logo file.
   *
   * @returns
   */
  saveLogo() {
    // If logoFile is not set, we do not need to do perform the request.
    // If there is no company id, we can't perform the request.
    if (!this.logoFile || !this.company?.id) {
      this.setLoading(false);
      return;
    }

    return this.companyService.saveLogo(this.company.id ?? 0, this.logoFile).subscribe((response) => {
      this.setLoading(false);
      this.toastr.success('', 'Success');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
