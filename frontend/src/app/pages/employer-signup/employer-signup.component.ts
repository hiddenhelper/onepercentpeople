import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-employer-signup',
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.scss']
})
export class EmployerSignupComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public signupForm: FormGroup;
  public showForgotPasswordForm = false;
  public forgotEmail = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    // const email = this.signupForm.controls['email'].value;
    // const password = this.signupForm.controls['password'].value;
    // this.authService.employerSignUp(email, password).subscribe((response) => {
    //   if (response.code == 'auth/success') {
    //     this.toastr.success('Login', 'Successfully Logged in!');
    //   } else {
    //     this.toastr.error(response.error, 'Log In Error');
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
