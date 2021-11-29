import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-employer-register-form',
  templateUrl: './employer-register-form.component.html',
  styleUrls: ['./employer-register-form.component.scss']
})
export class EmployerRegisterFormComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public registerForm: FormGroup;

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
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      phone: [null, [Validators.required, Validators.minLength(8)]],
      terms: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = "";

    const fullName = this.registerForm.controls['fullName'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const phone = this.registerForm.controls['phone'].value;
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


    this.authService.employerRegister(firstName, lastName, email, password, phone).subscribe(
      (response) => {
        if (response.code == 'auth/success') {
          this.toastr.success('Account created', 'Thanks for joining!');
        } else {
          this.toastr.error(response.error, 'Registration Error');
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
