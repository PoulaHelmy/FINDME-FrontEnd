import {Component, OnInit, OnDestroy} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {Router, ActivatedRoute} from '@angular/router';

import {HttpHeaders} from '@angular/common/http';
import {AuthService} from 'app/@auth/services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'X-Algolia-Application-Id': 'plBIPOQ7X7HA',
    'X-Algolia-API-Key': 'ce287ed40c8a6f4d8579799492461dd7',
  }),
};

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss'],
})
export class AccountUpdateComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  data: {};
  images;
  isLoadingResults = false;
  options = {
    title: 'Are Sure To Submit & Update This Part  ',
    message:
      'Because in case to Continue you will not be able to update them in this time',
    cancelText: 'Cancel And Review this Data',
    confirmText: 'Confirm And Continue',
  };

  filteredOptions;

  /****************** constructor Function************************/
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private authServ: AuthService,
    private dialogService: ConfirmDialogService
  ) {
  }

  /****************** ngOnInit Function************************/
  ngOnInit(): void {

    /*-------------------------------------------------------*/
    this.actRoute.data.subscribe((res) => {
      this.data = res['item'];
      console.log(res);
    });
    this.userForm = this.fb.group({
      name: [this.data['name'], [Validators.required, Validators.minLength(3)]],
      email: [
        this.data['email'],
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?'
          ),
        ],
      ],
      phone: [
        this.data['phone'],
        [Validators.required, Validators.pattern('[0-9 ]{11}')],
      ],
      file: new FormControl(''),
      fileSource: new FormControl(''),
    });
  }

  /****************** onFileChange Function************************/
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.data['photo'] = event.target.result;
        this.images = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /****************** Submit Function************************/
  onSubmit() {
    let newData = {};
    newData['photo'] = this.images ? this.images : this.data['photo'];
    if (this.data['email'] !== this.userForm.get('email').value) {
      newData['email'] = this.userForm.get('email').value;
    }

    if (this.data['phone'] !== this.userForm.get('phone').value) {
      newData['phone'] = this.userForm.get('phone').value;
    }
    newData['name'] = this.userForm.get('name').value;

    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoadingResults = true;
        this.authServ.updateProfileData(newData).subscribe(
          (next) => {
            this.isLoadingResults = false;
            this.snackbarService.show(
              'Profile Data Updated successfully',
              'success'
            );
            this.router.navigateByUrl('/dashboard/account/details');
          },
          (err) => {
            console.log('err :', err);
            this.isLoadingResults = false;
            this.snackbarService.show(err['error']['errors']['name'], 'danger');
          }
        );
      }
    });
  } //end of submit

  /****************** ngOnDestroy Function************************/
  ngOnDestroy() {
  } //end of ngOnDestroy
} //end of Class
