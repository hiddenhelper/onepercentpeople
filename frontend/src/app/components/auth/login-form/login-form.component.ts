import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public loginForm: FormGroup;
  public loading: boolean = false;
  public errorMessage: string = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = "";

    if (!this.loginForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.loading = true;

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(email, password)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.code == 'auth/success') {
          } else {
            // this.errorMessage = response.error;
            this.errorMessage = "Invalid credentials.";
          }
        },
        (error) => {
          this.loading = false;
          if (error.status === 422) {
            this.errorMessage = "Invalid data. Please enter your correct login info and try again.";
          } else {
            this.errorMessage = "Something went wrong. Please try again.";
          }
        },

      )

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
