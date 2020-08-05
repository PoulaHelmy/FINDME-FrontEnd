import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/@auth/services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigateByUrl('/auth/login');
      })
    );
  }
} //end of class
// canActivate(
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<boolean> | boolean {
//   // this.authService..pipe(
//   //   take(1),
//   //   map((isLoggedIn: boolean) => {
//   //     if (isLoggedIn) {
//   //       // {3}
//   //       isLoggedIn = true;
//   //       console.log('IN GUARD : true');
//   //       return true;
//   //     }
//   //     localStorage.removeItem('access_token');
//   //     localStorage.setItem('isAuth', 'false');
//   //     localStorage.setItem('Poula', 'true');
//   //     console.log('IN GUARD : false');
//   //     this.router.navigateByUrl('/auth');
//   //     return false;
//   //   })
//   // );
//   // console.log('IN GUARD finsh: false');
//   // return false;
//   if (
//     localStorage.getItem('access_token') != '' &&
//     localStorage.getItem('access_token') != null &&
//     localStorage.getItem('isAuth') == 'true'
//   ) {
//     console.log('IN GUARD : true');
//     return true;
//   }
//   localStorage.removeItem('access_token');
//   localStorage.setItem('isAuth', 'false');
//   this.router.navigateByUrl('/auth/login');
//   console.log('IN GUARD finsh: false');
//   return false;
// } //end of can activate
