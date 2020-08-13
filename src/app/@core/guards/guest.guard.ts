import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GuestGuardService implements CanActivateChild {
  constructor(private router: Router) {
  }

  canActivateChild(): Observable<boolean> | boolean {
    if (!localStorage.getItem('access_token')) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  } //end of can activate
} //end of class
