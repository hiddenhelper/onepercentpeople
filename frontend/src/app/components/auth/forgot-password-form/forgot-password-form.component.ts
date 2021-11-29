import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  public forgotPasswordForm: FormGroup;
  public loading: boolean = false;
  public showEmailSentMessage: boolean = false;
  public errorMessage: string = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = "";

    if (!this.forgotPasswordForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.loading = true;

    const email = this.forgotPasswordForm.controls['email'].value;

    this.authService.forgotPassword(email)
      .subscribe(
        (response) => {
          this.loading = false;
          this.showEmailSentMessage = true;
        },
        (error) => {
          this.loading = false;

          if (error.status === 422) {
            this.errorMessage = "Invalid data. Please enter your correct email and try again.";
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
