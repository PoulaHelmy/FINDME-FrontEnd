import {Component, OnInit} from '@angular/core';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Request} from '@@shared/models/request';
import {RequestsService} from '@@core/services/requests.service';

@Component({
  selector: 'app-inc-requests',
  templateUrl: './inc-requests.component.html',
  styleUrls: ['./inc-requests.component.scss'],
})
export class IncRequestsComponent implements OnInit {
  requests: Request[] = [];
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
  ) {
  }

  ngOnInit() {
    this.reqServ.getAllRequests().subscribe((res) => {
      this.requests = res['data'];
    });
  }//end of OnInit

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
              location.reload();
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
          location.reload();
        })
        .catch((err) => {
          this.snackbarService.show(err['statusText'], 'danger');
        });
    }
  }//end of approveRequest
} //end of class
