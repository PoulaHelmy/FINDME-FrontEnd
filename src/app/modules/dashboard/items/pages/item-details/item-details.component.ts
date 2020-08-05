import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ItemsService} from '@@core/services/items.service';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {OwlOptions, SlidesOutputData} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  isRequested: boolean = false;
  itemDetails;
  options = {
    title: 'Are Sure To Delete This Item',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialogService: ConfirmDialogService
  ) {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [' PREV ', ' NEXT '],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  activeSlides: SlidesOutputData;

  slidesStore: any[];

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.itemDetails = res['item'];
    });
    this.isRequested = this.router.url.includes('show');
  }


  deleteItem(id: number) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.itemsService.deleteItem(id, 'items').subscribe(
          (res) => {
            this.snackbarService.show('Item Deleted Successfully', 'success');
            this.router.navigate(['items']);
          },
          (err) => {
            this.snackbarService.show(err['statusText'], 'danger');
          }
        );
      }
    });
    // this.apiserv.deleteCheck(id, value);
  }

  ngOnDestroy() {
  }
} //end of class
