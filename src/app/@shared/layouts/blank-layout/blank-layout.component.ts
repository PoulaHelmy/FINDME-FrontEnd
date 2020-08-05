import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'app/@auth/services/auth.service';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}
  isAuthenticated$ = this.authService.isAuthenticated$.pipe(shareReplay(1));

  ngOnInit(): void {
    $("a").click(function(){
      $(window).scrollTop(0);
    })

    $(window).scroll(function(){
      let windowScroll = $(window).scrollTop(); //el user nzl add a;
      if(windowScroll > 1)
          {
              $("nav").css("backgroundColor","white");
              $("nav").css("box-shadow","5px 10px 18px #888888");
          }
      else
          {
              $("nav").css("backgroundColor","transparent");
              $("nav").css("box-shadow","0px 0px 0px #888888");


          }
  })
  }
  logout() {
    if (localStorage.getItem('isAuth') == 'false') {
      this.snackbar.show(
        '   Unauthorized Request You Not Logged in yet   ',
        'danger'
      );
    } else {
      this.authService
        .logout()
        .toPromise()
        .then((res) => {
          localStorage.removeItem('access_token');
          this.authService.setIsAuthenticated(false);
          localStorage.setItem('isAuth', 'false');
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          this.snackbar.show(err['error']['message'], 'danger');
        })
        .finally(() => {});
    }
  }
}
