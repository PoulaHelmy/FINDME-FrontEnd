import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { ConfirmedValidator } from '@@shared/validatores/confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  passwordToken: string;
  email: string;
  data: {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (res) => {
        this.passwordToken = res['item']['data']['token'];
        this.email = res['item']['data']['email'];
      },
      (err) => {
        console.log('error in reset passpord.td', err);
        this.snackbarService.show(
          'There is something Wrong Please try Again Later',
          'danger'
        );
      }
    );

    this.resetForm = this.fb.group(
      {
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  } //end of ngOnInit

  get getConfPass() {
    return this.resetForm.get('confirmPassword');
  }
  get getPassword() {
    return this.resetForm.get('password');
  }

  onSubmit() {
    this.loading = true;
    this.data = {
      token: this.passwordToken,
      email: this.email,
      password: this.resetForm.get('password').value,
      password_confirmation: this.resetForm.get('confirmPassword').value,
    };
    this.authService
      .resetPassword(this.data)
      .toPromise()
      .then((res) => {
        this.snackbarService.show('Password Reset Successfully');
        this.loading = false;
        this.router.navigate(['/auth/login']);
      })
      .catch((err) => {
        this.snackbarService.show(
          'There is something Wrong Please try Again Later',
          'danger'
        );
        this.loading = false;
      });
  }
} //end of class
