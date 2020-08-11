import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '@@core/http/api.service';
import {Category} from '@@shared/models/category';
import {ItemsService} from '@@core/services/items.service';
import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {DatePipe} from '@angular/common';
import {Subscription, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'X-Algolia-Application-Id': 'plBIPOQ7X7HA',
    'X-Algolia-API-Key': 'ce287ed40c8a6f4d8579799492461dd7',
  }),
};

@Component({
  selector: 'app-items-create',
  templateUrl: './items-create.component.html',
  styleUrls: ['./items-create.component.scss'],
})
export class ItemsCreateComponent implements OnInit, OnDestroy {
  images = [];
  itemsForm: FormGroup;
  categories: Category[] = [];
  subCategories: [] = [];
  data: {};
  isLoadingResults = true;
  isLoadingImages = false;
  options = {
    title: 'Are Sure To Submit This Part  ',
    message:
      'Because in case to Continue you will not be able to update them in this time',
    cancelText: 'Cancel And Review this Data',
    confirmText: 'Confirm And Continue',
  };
  date = new Date(2020, 1, 1);
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  filteredOptions;
  @ViewChild('locationSpanlat') locationSpanlat: ElementRef;
  @ViewChild('locationSpanlan') locationSpanlan: ElementRef;

  /****************** constructor Function************************/
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private dialogService: ConfirmDialogService,
    public datepipe: DatePipe,
    private router: Router,
    private apiserv: ApiService,
    private actRoute: ActivatedRoute,
    private itemService: ItemsService,
    private http: HttpClient
  ) {
  }

  /****************** ngOnInit Function************************/
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.categories = res['item']['data'];
    });
    this.itemsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      itemCategory: ['', [Validators.required]],
      itemsubCategory: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      is_found: ['', [Validators.required]],
      des: ['', [Validators.required, Validators.minLength(30)]],
      date: ['', [Validators.required]],
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });
    this.isLoadingResults = false;
    this.itemsForm.controls.itemCategory.valueChanges.subscribe((res) => {
      this.apiserv.getAllCatSubcats(res).subscribe((data) => {
        this.subCategories = data['data'];
      });
    });
    this.itemsForm.controls.location.valueChanges.subscribe((res) => {
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

  /****************** File uploading Function************************/
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        this.isLoadingImages = true;
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.itemsForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }

    this.isLoadingImages = false;
  }

  /****************** Submit Function************************/
  onSubmit() {
    // console.log('loaction : ', this.itemsForm.controls.location.value);
    let newDate = this.itemsForm.get('date').value;
    newDate = this.datepipe.transform(newDate, 'yyyy-MM-dd');

    this.data = {
      name: this.itemsForm.get('name').value,
      category_id: this.itemsForm.get('itemCategory').value,
      subcat_id: this.itemsForm.get('itemsubCategory').value,
      location: this.itemsForm.get('location').value,
      lat: parseFloat(this.locationSpanlat.nativeElement.innerHTML),
      lan: parseFloat(this.locationSpanlan.nativeElement.innerHTML),
      is_found: this.itemsForm.get('is_found').value,
      des: this.itemsForm.get('des').value,
      date: newDate,
      images: this.itemsForm.get('fileSource').value,
    };
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoadingResults = true;
        this.itemService
          .addItem(this.data, 'items')
          .toPromise()
          .then((next) => {
            this.isLoadingResults = false;
            this.snackbarService.show('Item Created successfully', 'success');
            this.router.navigateByUrl('/dashboard/items/options', {
              state: {
                id: next['data']['subcat_id'],
                item_id: next['data']['id'],
              },
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
