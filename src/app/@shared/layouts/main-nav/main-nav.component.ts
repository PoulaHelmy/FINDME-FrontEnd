import {Component, OnInit, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay, startWith} from 'rxjs/operators';
import {AuthService} from 'app/@auth/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemeService} from '@@core/services/theme-service.service';
import {FormControl} from '@angular/forms';
import {Item} from '@@shared/models/item';
import {HttpClient} from '@angular/common/http';
import {ItemsService} from '@@core/services/items.service';
import {NotificationsService} from '@@core/services/notifications.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  @Input() themeColor = '';
  // use this to set correct theme class on app holder
  // eg: <div [class]="themeClass">...</div>
  // 'my-dark-theme',
  //     'my-light-theme',
  //     'purple-green',
  /*-------------------User Details------------------------*/
  userDetails = {};
  defImg = '../../../../assets/imgs/undraw_profile_pic_ic5t.svg';
  /*-------------------AllNotifications------------------------*/
  notificationsNumber: number;
  AllNotifications = [];
  /*---------------------BreakPoints Ratio---------------------------*/
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  //-----------------------------------------------------------
  isDarkTheme: Observable<boolean>;
  themeClass: string = localStorage.getItem('defaultTheme')
    ? localStorage.getItem('defaultTheme')
    : 'findme-theme';
  logOutLoading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
    private overlayContainer: OverlayContainer,
    private itemServ: ItemsService,
    private actRoute: ActivatedRoute,
    private notificationServ: NotificationsService
  ) {
  }

  ngOnInit(): void {
    /*---------------- For Theming-------------------*/
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(
      overlayContainerClasses
    ).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add('my-theme');

    /*---------------- For UserDetails-------------------*/
    this.authService.getDetails().subscribe((res) => {
      this.userDetails = res['data'];
    });
    /*---------------- For notification-------------------*/
    this.notificationServ.getAllNotifictions().subscribe((res) => {
      console.log(res);
      this.notificationsNumber = res.length;
      res.forEach((element) => {
        let elementData = [];
        elementData['body'] = element['data']['body'];
        elementData['id'] = element['id'];
        if (element['type'].includes('RequestChangeStatus')) {
          elementData['url'] = 'requests/view/' + element['data']['request_id'];
          elementData['icon'] = 'notification_important';
        }
        if (element['type'].includes('CreateRequest')) {
          elementData['url'] =
            'increquests/view/' + element['data']['request_id'];
          elementData['icon'] = 'wifi_protected_setup';
        }
        if (element['type'].includes('MatchingItems')) {
          elementData['url'] = '/dashboard/matching';
          elementData['icon'] = 'group_work';
        }
        if (element['type'].includes('SendMessage')) {

          elementData['url'] = '/dashboard/chat/' + element['data']['request_id'];
          elementData['icon'] = 'message';
        }
        this.AllNotifications.push(elementData);
      });
    });
    /*----------------------------------------------------------*/
  } //end Of NgONInit
  markAsReaded(id: string) {
    this.notificationServ.MakeNotifictionReaded(id);
    for (let i = 0; i < this.AllNotifications.length; i++) {
      if (this.AllNotifications[i]['id'] === id) {
        this.AllNotifications.splice(i, 1);
        this.notificationsNumber = this.AllNotifications.length;
      }
    }
  }

  changeTheme(value: string) {
    this.themeClass = value;
    localStorage.setItem('defaultTheme', value);
  }

  /*------------------LogOut------------------------ */
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
          localStorage.setItem('defaultTheme', '');
          this.snackbar.show('Logged Out Successfully', 'success');
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          this.snackbar.show(err['error']['message'], 'danger');
        })
        .finally(() => {
        });
    }
  }

  /*------------------------------------------------ */
} //end of class
