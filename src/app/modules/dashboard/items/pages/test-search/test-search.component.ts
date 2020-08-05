import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/@auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { ItemsService } from '@@core/services/items.service';
import { NotificationsService } from '@@core/services/notifications.service';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item } from '@@shared/models/item';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.scss'],
})
export class TestSearchComponent implements OnInit {
  //-----------------------------------------------------------
  myControl = new FormControl();
  filteredOptions: Observable<any>;
  items: Item[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],

    nav: true,
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
    private itemServ: ItemsService,
    private actRoute: ActivatedRoute,
    private notificationServ: NotificationsService
  ) {}

  ngOnInit(): void {
    /*---------------- For Searching-------------------*/
    this.myControl.valueChanges.subscribe((res) => {
      if (res !== '' && res !== null && res !== ' ') {
        this.filteredOptions = this.itemServ.getFilters(
          res !== '' ? res : 'nosearch'
        );
      } else {
        this.filteredOptions = null;
      }
    });
  }
}
