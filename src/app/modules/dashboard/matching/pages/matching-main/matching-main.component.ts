import {Component, OnInit} from '@angular/core';
import {ApiService} from '@@core/http/api.service';
import {ToastrService, Toast} from 'ngx-toastr';
import {ViewChild, OnDestroy} from '@angular/core';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Item} from '@@shared/models/item';
import {ItemsService} from '@@core/services/items.service';
import {Router, ActivatedRoute} from '@angular/router';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-matching-main',
  templateUrl: './matching-main.component.html',
  styleUrls: ['./matching-main.component.scss'],
})
export class MatchingMainComponent implements OnInit {
  items: Item[] = [];
  isLoadingResults = true;
  options = {
    title: 'Are Sure To Delete This Item',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  options2 = {
    title: 'Are Sure To Archive This Item',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  };

  constructor(
    private apiServ: ApiService,
    private toastr: ToastrService,
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private itemService: ItemsService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.actRoute.data.subscribe(
      (res) => {
        this.items = res['item'];
        this.isLoadingResults = false;
      },
      (err) => {
      }
    );
  }

  ngOnDestroy() {
  }
} //end of Class
