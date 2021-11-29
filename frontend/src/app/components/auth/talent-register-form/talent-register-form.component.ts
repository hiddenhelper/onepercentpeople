import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { CountryService } from '@services/country/country.service';
import { Country } from '@app/interfaces/country';

@Component({
  selector: 'app-talent-register-form',
  templateUrl: './talent-register-form.component.html',
  styleUrls: ['./talent-register-form.component.scss']
})
export class TalentRegisterFormComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public registerForm: FormGroup;

  /**
   * List of country objects to use in country selector.
   */
  countries: Country[] = [];


  /**
   * Error message to show user on form errors.
   */
  errorMessage: string = "";

  /**
   * State of the form.
   */
  loading: boolean = false;


  constructor(
    public fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private countryService: CountryService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      country: [null, Validators.required],
      city: [null, Validators.required],
      terms: [false, Validators.required],
    });
  }

  ngOnInit() {
    this.loadCountries();
  }

  onSubmit() {
    this.errorMessage = "";

    const fullName = this.registerForm.controls['fullName'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const country_id = this.registerForm.controls['country'].value;
    const city = this.registerForm.controls['city'].value;
    const terms = this.registerForm.controls['terms'].value;

    if (!this.registerForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    if (!terms) {
      this.errorMessage = "Please read and agree to the terms before proceeding.";
      return;
    }

    this.loading = true;

    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];

    this.authService.talentRegister(firstName, lastName, email, password, country_id, city).subscribe(
      (response) => {
        if (response.code == 'auth/success') {
          this.toastr.success('Account created', 'Thanks for joining!');
        } else {
          this.toastr.error(response.error, 'Registration Error');
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      }
    );
  }

  loadCountries(): void {
    this.countryService.getAll({}).subscribe(
      (response) => {
        this.countries = response.countries;
      },
      (error) => { },
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
