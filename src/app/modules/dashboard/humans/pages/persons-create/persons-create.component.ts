import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Router} from '@angular/router';
import {ItemsService} from '@@core/services/items.service';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FaceApiService} from 'app/modules/dashboard/humans/services/face-api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'X-Algolia-Application-Id': 'plBIPOQ7X7HA',
    'X-Algolia-API-Key': 'ce287ed40c8a6f4d8579799492461dd7',
  }),
};

@Component({
  selector: 'app-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss'],
})
export class PersonsCreateComponent implements OnInit, OnDestroy {
  @ViewChild('locationSpanlat') locationSpanlat: ElementRef;
  @ViewChild('locationSpanlan') locationSpanlan: ElementRef;
  personsForm: FormGroup;
  data: {};
  isLoadingResults = true;
  date = new Date(2020, 1, 1);
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  filteredOptions;
  options = {
    title: 'Are Sure To Submit This Part  ',
    message:
      'Because in case to Continue you will not be able to update them in this time',
    cancelText: 'Cancel And Review this Data',
    confirmText: 'Confirm And Continue',
  };

  /****************** constructor Function************************/
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private dialogService: ConfirmDialogService,
    public datepipe: DatePipe,
    private router: Router,
    private itemService: ItemsService,
    private http: HttpClient,
    private faceApi: FaceApiService
  ) {
  }

  /****************** ngOnInit Function************************/
  ngOnInit(): void {
    this.personsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      is_found: ['', [Validators.required]],
      itemsubCategory: ['', [Validators.required]],
      des: ['', [Validators.required, Validators.minLength(30)]],
      date: ['', [Validators.required]],
    });
    this.isLoadingResults = false;

    this.personsForm.controls.location.valueChanges.subscribe((res) => {
      if (res !== '' && res !== null && res !== ' ') {
        let data = {query: res, type: 'address'};
        this.http
          .post(
            'https://places-dsn.algolia.net/1/places/query',
            data,
            httpOptions
          )
          .subscribe((locations) => {
            this.filteredOptions = locations['hits'];
          });
      }
    });
  } //end of ngOnInit

  /****************** Submit Function************************/
  onSubmit() {
    let newDate = this.personsForm.get('date').value;
    newDate = this.datepipe.transform(newDate, 'yyyy-MM-dd');
    this.data = {
      name: this.personsForm.get('name').value,
      category_id: 11,
      subcat_id: this.personsForm.get('itemsubCategory').value,
      location: this.personsForm.get('location').value,
      lat: parseFloat(this.locationSpanlat.nativeElement.innerHTML),
      lan: parseFloat(this.locationSpanlan.nativeElement.innerHTML),
      is_found: this.personsForm.get('is_found').value,
      des: this.personsForm.get('des').value,
      date: newDate,
    };
    // let newPersonData = {
    //   name: this.personsForm.get('name').value,
    //   userData: this.personsForm.get('des').value,
    // };
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoadingResults = true;
        this.itemService
          .addItem(this.data, 'items')
          .toPromise()
          .then((next) => {
            const newPersonData = {
              name: next['data']['name'],
              userData: next['data']['id'],
            };
            this.faceApi.createPerson('maingroup', newPersonData).subscribe((result) => {
              this.isLoadingResults = false;
              this.snackbarService.show(
                'Person Created successfully',
                'success'
              );
              this.router.navigateByUrl('/dashboard/humans/persons/options', {
                state: {
                  id: next['data']['subcat_id'],
                  item_id: next['data']['id'],
                  personId: result['personId'],
                },
              });
            });
          })
          .catch((err) => {
            console.log('err :', err);
            this.isLoadingResults = false;
            this.snackbarService.show(err['error']['errors']['name'], 'danger');
          });
      }
    });
  } //end of submit

  /****************** DEstroy Function************************/
  ngOnDestroy(): void {
  } //end of destroy
} //end of Class
