import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from 'app/@auth/services/auth.service';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {ConfirmedValidator} from '@@shared/validatores/confirmed.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  email: string;
  data: {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.resetForm = this.fb.group(
      {
        old_password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
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

  get getOLdPassword() {
    return this.resetForm.get('old_password');
  }

  onSubmit() {
    this.loading = true;
    this.data = {
      old_password: this.resetForm.get('old_password').value,
      new_password: this.resetForm.get('password').value,
      new_password_Confim: this.resetForm.get('confirmPassword').value,
    };
    this.authService
      .changePassword(this.data)
      .toPromise()
      .then((res) => {
        this.snackbarService.show('Password Changed Successfully');
        this.authService.logout().subscribe((result) => {
          localStorage.removeItem('access_token');
          this.authService.setIsAuthenticated(false);
          localStorage.setItem('isAuth', 'false');
        });
        this.loading = false;
        this.router.navigateByUrl('/auth/login');
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['data'], 'danger');
        console.log('err', err);
        this.loading = false;
      });
  }
} //end of class
