import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Request } from '@@shared/models/request';
import { ItemsService } from '@@core/services/items.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  options = {
    title: 'Are Sure To Delete This Request',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private itemService: ItemsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.itemService.getAllItems('requests').subscribe((res) => {
      this.requests = res['data'];
    });
  }
  deleteItem(id) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.itemService.deleteItem(id, 'requests').subscribe(
          (res) => {
            this.snackbarService.show(
              'Request Deleted Successfully',
              'success'
            );
            // this.router.navigate(['/dashboard/requests']);
            location.reload();
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
