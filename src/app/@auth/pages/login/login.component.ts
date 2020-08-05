import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;
  subscription: Subscription;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.loginform = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
        ),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  get getEmail() {
    return this.loginform.get('email');
  }
  get getPassword() {
    return this.loginform.get('password');
  }
  onSubmit() {
    this.loading = true;
    this.subscription = this.authService
      .login(
        this.loginform.get('email').value,
        this.loginform.get('password').value
      )
      .subscribe(
        (res: any) => {
          this.authService.setIsAuthenticated(true);
          localStorage.setItem('access_token', res['data']['token']);
          localStorage.setItem('isAuth', 'true');
          this.snackbarService.show(res['message'], 'success');
          this.loading = false;
          this.router.navigate(['']);
        },
        (err) => {
          this.loading = false;
          this.snackbarService.show(err['error']['message'], 'danger');
        }
      );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
} //end of class
