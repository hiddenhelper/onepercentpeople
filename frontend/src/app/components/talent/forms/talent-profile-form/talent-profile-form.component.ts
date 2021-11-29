import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { TalentProfileService } from '@services/talent-profile/talent-profile.service';
import { User } from '@app/interfaces/user';
import { CountryService } from '@services/country/country.service';
import { Country } from '@app/interfaces/country';

@Component({
  selector: 'talent-profile-form',
  templateUrl: './talent-profile-form.component.html',
  styleUrls: ['./talent-profile-form.component.scss']
})
export class TalentProfileFormComponent implements OnInit {

  public userForm: FormGroup;

  /**
   * Error message to show the user on form submission fail.
   */
  errorMessage: string = ""

  /**
   * Store the loading state of the form request.
   */
  loading: boolean = false

  private _user: User | null;
  @Input()
  get user(): User | null { return this._user; }
  set user(user: User | null) {
    this._user = user;
    this.setDefaults();
  }

  /**
   * List of country objects to use in country selector.
  */
  countries: Country[] = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private countryService: CountryService,
  ) {
    this.userForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      email: [null],
      phone: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  setDefaults() {
    if (this.user) {
      this.userForm.controls['first_name'].setValue(this.user?.first_name ?? '');
      this.userForm.controls['last_name'].setValue(this.user?.last_name ?? '');
      this.userForm.controls['email'].setValue(this.user?.email);
      this.userForm.controls['phone'].setValue(this.user?.phone ?? '');
      this.userForm.controls['city'].setValue(this.user?.city ?? '');
      this.userForm.controls['country'].setValue(this.user?.country_id ?? '');
    }
  }

  onSubmit(): void {
    this.errorMessage = "";

    if (!this.userForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    const user = this.buildUserObject();
    this.loading = true;
    console.log(user);
    this.userService.update(user).subscribe(
      (response) => {
        this.toastr.success('', 'Saved!');
        this.loading = false;
      }, error => {
        this.loading = false;
      }
    );
  }

  buildUserObject(): User {
    const first_name = this.userForm.controls['first_name'].value;
    const last_name = this.userForm.controls['last_name'].value;
    const city = this.userForm.controls['city'].value;
    const country = this.userForm.controls['country'].value;
    const phone = this.userForm.controls['phone'].value;

    // Create a clone.
    let u: User = this.user ? JSON.parse(JSON.stringify(this.user)) : {};

    u.first_name = first_name;
    u.last_name = last_name;
    u.city = city;
    u.country_id = country;
    // u.email = email;
    u.phone = phone;

    return u;
  }

  loadCountries(): void {
    this.countryService.getAll({}).subscribe(
      (response) => {
        this.countries = response.countries;
      },
      (error) => { },
    );
  }
}

