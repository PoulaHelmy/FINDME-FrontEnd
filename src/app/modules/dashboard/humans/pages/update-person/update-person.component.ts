import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '@@core/services/items.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FaceApiService } from 'app/modules/dashboard/humans/services/face-api.service';
const httpOptions = {
  headers: new HttpHeaders({
    'X-Algolia-Application-Id': 'plBIPOQ7X7HA',
    'X-Algolia-API-Key': 'ce287ed40c8a6f4d8579799492461dd7',
  }),
};
@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
})
export class UpdatePersonComponent implements OnInit {
  @ViewChild('locationSpanlat') locationSpanlat: ElementRef;
  @ViewChild('locationSpanlan') locationSpanlan: ElementRef;
  personsForm: FormGroup;
  data: {};
  item_id;
  isLoadingResults = true;
  date = new Date(2020, 1, 1);
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  filteredOptions;
  options = {
    title: 'Are Sure To Update This Part  ',
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
    private faceApi: FaceApiService,
    private actRoute: ActivatedRoute
  ) {}

  /****************** ngOnInit Function************************/
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.data = res['item'];
      this.item_id = res['item']['id'];
    });
    this.personsForm = this.fb.group({
      name: [this.data['name'], [Validators.required, Validators.minLength(3)]],
      location: [
        this.data['location'],
        [Validators.required, Validators.minLength(5)],
      ],
      is_found: [this.data['is_found'], [Validators.required]],
      itemsubCategory: [this.data['subcat_id'], [Validators.required]],
      des: [
        this.data['description'],
        [Validators.required, Validators.minLength(30)],
      ],
      date: [this.data['date'], [Validators.required]],
    });
    this.isLoadingResults = false;

    this.personsForm.controls.location.valueChanges.subscribe((res) => {
      if (res !== '' && res !== null && res !== ' ') {
        let data = { query: res, type: 'address' };
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
    let nweData = {
      name: this.personsForm.get('name').value,
      category_id: 11,
      subcat_id: this.personsForm.get('itemsubCategory').value,
      location: this.personsForm.get('location').value,
      is_found: this.personsForm.get('is_found').value,
      des: this.personsForm.get('des').value,
      date: newDate,
    };
    if (this.personsForm.get('location').value === this.data['location']) {
      nweData['lat'] = this.data['lat'];
      nweData['lan'] = this.data['lan'];
    } else {
      nweData['lat'] = parseFloat(this.locationSpanlat.nativeElement.innerHTML);
      nweData['lan'] = parseFloat(this.locationSpanlan.nativeElement.innerHTML);
    }

    let newPersonData = {
      name: this.personsForm.get('name').value,
      userData: this.personsForm.get('des').value,
    };
    let personId;
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoadingResults = true;
        this.faceApi.getPersonsByGroup(3).subscribe((res) => {
          res.forEach((person) => {
            if (person['name'] === this.data['name']) {
              personId = person['personId'];
            }
          });
        });
        this.itemService
          .updateItem(this.item_id, this.data, 'items')
          .toPromise()
          .then((next) => {
            this.faceApi
              .updatePerson(3, personId, newPersonData)
              .subscribe((result) => {
                this.isLoadingResults = false;
                this.snackbarService.show(
                  'Person Updated successfully',
                  'success'
                );
                this.router.navigateByUrl(
                  '/dashboard/humans/persons/upoptions',
                  {
                    state: {
                      subCatId: this.personsForm.get('itemsubCategory').value,
                      item_id: this.item_id,
                      personId: personId,
                    },
                  }
                );
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
  ngOnDestroy(): void {} //end of destroy
} //end of Class
