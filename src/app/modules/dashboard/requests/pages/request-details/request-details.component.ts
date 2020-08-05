import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from '@@core/services/items.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  requestDetails;
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
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.requestDetails = res['item'];
    });
  }

  deleteItem(id: number) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.itemsService.deleteItem(id, 'requests').subscribe(
          (res) => {
            this.snackbarService.show(
              'Request Deleted Successfully',
              'success'
            );
            this.router.navigate(['/dashboard/requests']);
          },
          (err) => {
            this.snackbarService.show(err['statusText'], 'danger');
          }
        );
      }
    });
    // this.apiserv.deleteCheck(id, value);
  }

  ngOnDestroy() {}
} //end of class
