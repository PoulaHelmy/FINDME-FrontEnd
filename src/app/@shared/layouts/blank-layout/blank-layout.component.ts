import {Component, AfterViewInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from 'app/@auth/services/auth.service';
import {shareReplay} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent implements AfterViewInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
  }

  isAuthenticated$ = this.authService.isAuthenticated$.pipe(shareReplay(1));
  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky = false;
  elementPosition: any;

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    if (window.pageYOffset > this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
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
        .finally(() => {
        });
    }
  }
}

// import { DOCUMENT } from '@angular/common';

// constructor(@Inject(DOCUMENT) private document: Document) { }
//
// @HostListener('window:scroll', [])
// onWindowScroll() {
//   if (document.body.scrollTop > 20 ||
//     document.documentElement.scrollTop > 20) {
//     document.getElementById('subTitle').classList.add('red');
//     document.getElementById('paragraph').classList.add('green');
//   }
// }
///////////////////////////////////////////////////////////////////
// @HostListener('window:scroll', [])
// onWindowScroll(event: Event) {
//   //set up the div "id=nav"
//   if (document.body.scrollTop > 3300 ||
//     document.documentElement.scrollTop > 3300) {
//     document.getElementById('nav').classList.add('scrolled');
//   }
//   else {
//     document.getElementById('nav').classList.remove('scrolled');
//     this.innerWidth = 'auto';
//   }
// }
