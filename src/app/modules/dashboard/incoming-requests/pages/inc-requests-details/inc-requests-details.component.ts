import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {RequestsService} from '@@core/services/requests.service';

@Component({
  selector: 'app-inc-requests-details',
  templateUrl: './inc-requests-details.component.html',
  styleUrls: ['./inc-requests-details.component.scss'],
})
export class IncRequestsDetailsComponent implements OnInit, OnDestroy {
  requestDetails;
  options = {
    title: 'Are Sure To Reject This Request',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };

  constructor(
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private reqServ: RequestsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.requestDetails = res['item'];
    });
  }

  approveRequest(id, status) {
    if (status === -1) {
      this.dialogService.open(this.options);
      this.dialogService.confirmed().subscribe((confirmed) => {
        if (confirmed) {
          this.reqServ
            .approveRequest({req_id: id, status: status})
            .toPromise()
            .then((res) => {
              this.snackbarService.show(
                'Request Rejected Successfully',
                'success'
              );
              this.router.navigate(['/dashboard/increquests']);
            })
            .catch((err) => {
              this.snackbarService.show(err['statusText'], 'danger');
            });
        }
      });
    } else {
      this.reqServ
        .approveRequest({req_id: id, status: 1})
        .toPromise()
        .then((res) => {
          this.snackbarService.show('Request Approved Successfully', 'success');
          this.router.navigate(['/dashboard/increquests']);
        })
        .catch((err) => {
          this.snackbarService.show(err['statusText'], 'danger');
        });
    }
  }

  ngOnDestroy() {
  }
} //end of class
